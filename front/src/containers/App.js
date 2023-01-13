import { useCallback, useEffect, useReducer, useState } from 'react';
import '../assets/css/app.css';
import Players from "./Players";
import sound from '../assets/audio/sound-trois-pions.mp3';
import muteIcon from '../assets/svg/mute.svg';
import unmuteIcon from '../assets/svg/unmute.svg';
import Board from './Board';
import Modal from './Modal';
import { initialModal, modalReducer } from '../reducers/modalReducer';
import { initialPlayers, playersReducer } from '../reducers/playersReducer'
import { getLink, join, sendLog } from '../utils/server-handler';
import { alignmentExist, checkEmplacement, checkMove, chooseFirstPlayer, randomPlay } from '../utils/game';
import { getSize } from "../utils/size-screen";
import { colors } from "../utils/style";

const music = new Audio(sound);

const messages = {
  dragnotstart: "Vous ne pouvez pas déplacer un pion sans avoir déposer vos 3 pions.",
  dragnotallowed: "Les règles du jeu ne vous permettent pas de faire un tel déplacement.",
  notyourround: "Ce n'est pas votre tour.",
  outoflimitplayers: "Vous avez déja déposé vos 3 pions, vous ne pouvez que faire des déplacements.",
  busy: 'Cet emplacement est déja occupé.',
  noerror: '',
  overgame: 'OVER GAME!'
};

function App() {
  const [players, dispatchPlayers] = useReducer(playersReducer, initialPlayers);
  const [modal, dispatchModal] = useReducer(modalReducer, initialModal);
  const [mode, setMode] = useState('friend');
  const [mute, setMute] = useState(true);
  const [logged, setLogged] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(chooseFirstPlayer(colors));
  const [pieces, setPieces] = useState([]);
  const [status, setStatus] = useState('noerror');
  const [winner, setWinner] = useState('');
  const [socket, setSocket] = useState(null);
  const size = getSize();
  const url = new URL(window.location.href);

  const handleChangeInput = useCallback((e) => {
    if (e.target.value.length < 8) {
      dispatchPlayers({
        type: 'rename',
        playername1: e.target.value.toLowerCase(),
        playername2: 'ordinateur',
      });
      dispatchModal({
        type: 'player',
        playername: e.target.value.toLowerCase(),
        status: 'typing',
        callbacks: {
          handleChange: handleChangeInput,
          handleSubmit: handleFormSubmit,
        }
      });
    } else {
      dispatchModal({
        type: 'player',
        playername: players[colors.player1].name,
        status: 'outoflength',
        callbacks: {
          handleChange: handleChangeInput,
          handleSubmit: handleFormSubmit,
        }
      });
    }
  }, [players]);

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    if (players[colors.player1].name.length > 1) {
      dispatchModal({ type: 'reset' });
    } else {
      dispatchModal({
        type: 'player',
        playername: players[colors.player1].name,
        status: 'error',
        callbacks: {
          handleChange: handleChangeInput,
          handleSubmit: handleFormSubmit,
        }
      });
    }
  }, []);

  const handleCancelLink = useCallback(() => {
    dispatchModal({
      type: 'mode',
      mode: mode,
      callbacks: {
        handleChange: handleChangeMode,
        handleSubmit: handleFormSubmitMode,
      }
    });
  }, [mode]);

  const handleChangeMode = useCallback((e) => {
    setMode(e.target.value);
    dispatchModal({
      type: 'mode',
      mode: e.target.value,
      callbacks: {
        handleChange: handleChangeMode,
        handleSubmit: handleFormSubmitMode,
      }
    });
  }, [mode]);

  const handleFormSubmitMode = useCallback((e) => {
    e.preventDefault();
    if (mode === 'friend') {
      setPieces([]);
      getLink().then(link => {
        dispatchModal({
          type: 'link',
          link: link,
          callbacks: {
            handleCancel: handleCancelLink
          }
        });
        setCurrentPlayer(colors.player1);
      });
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
      dispatchPlayers({
        type: 'rename',
        playername1: players[colors.player1].name,
        playername2: 'ordinateur',
      });
      dispatchModal({
        type: 'player',
        playername: players[colors.player1].name,
        status: 'empty',
        callbacks: {
          handleChange: handleChangeInput,
          handleSubmit: handleFormSubmit,
        }
      });
    }
  }, [mode]);

  useEffect(() => {
    if (!logged) {
      sendLog().then(response => setLogged(true)).catch(error => {
        dispatchModal({
          type: 'message',
          message: "Le serveur ne répond pas, veuillez réessayer ultérieurement.",
          callbacks: {
            handleClick: () => window.location.href = url.origin
          }
        });
      });
    }
    if (url.searchParams.get('game') && logged) {
      dispatchModal({ type: 'loader' });
      setMode('friend');
      join(url.searchParams.get('game')).then(result => {
        if (result.code === 200) {
          dispatchModal({ type: 'reset' });
          setCurrentPlayer(colors.player2);
        } else {
          dispatchModal({
            type: 'message',
            message: result.msg,
            callbacks: {
              handleClick: () => window.location.href = url.origin
            }
          });
        }
      });
    } else if(logged){
      dispatchModal({
        type: 'mode',
        mode: mode,
        callbacks: {
          handleChange: handleChangeMode,
          handleSubmit: handleFormSubmitMode,
        }
      });
    }
  }, [logged, mode]);

  useEffect(() => {
    if(logged) {
      if (mode === 'ordi' && currentPlayer === colors.player2) {
        setTimeout(() => {
          const newPiece = randomPlay(pieces, currentPlayer, size);
          let newPieces;
          if (newPiece.id > pieces.length) {
            newPieces = [...pieces, newPiece];
          } else {
            newPieces = pieces.map(piece => piece.id === newPiece.id ? newPiece : piece);
          }
          const alignment = alignmentExist(newPieces, currentPlayer);
          if (alignment.length !== 0) {
            dispatchPlayers({
              type: 'update',
              player: currentPlayer
            });
            setStatus('overgame');
            setWinner(currentPlayer);
          } else {
            setStatus('noerror');
            setCurrentPlayer(colors.player1);
          }
          setPieces(newPieces);
        }, 1000)
      } else if (mode === 'friend') {
          const conn = new WebSocket('ws://localhost:8080');
          setSocket(conn);
          conn.onopen = (e) => {
            conn.send(JSON.stringify({ action: 'hello', pieces: [] }));
          };
          conn.onmessage = (e) => {
            const data = JSON.parse(e.data);
            switch (data.action) {
              case 'hello':
                dispatchModal({ type: 'reset' });
                break;
              case 'game':
                let newPieces = data.pieces;
                newPieces = newPieces.map(piece => {
                  const empl = document.querySelector(`.piece-emplacement[data-id='${piece.emplacement}']`);
                  const coords = empl.getBoundingClientRect();
                  return {
                    ...piece,
                    x: coords.x + (coords.width / 2) - (size.piece / 2),
                    y: coords.y + (coords.height / 2) - (size.piece / 2),
                  };
                });
                setPieces(newPieces);
                const alignment = alignmentExist(newPieces, currentPlayer);
                if (alignment.length !== 0) {
                  dispatchPlayers({
                    type: 'update',
                    player: currentPlayer
                  });
                  setStatus('overgame');
                  setWinner(currentPlayer);
                } else {
                  setStatus('noerror');
                  if (data.currentPlayer !== '')
                    setCurrentPlayer(data.currentPlayer === colors.player1 ? colors.player2 : colors.player1);
                }
                break;
              case 'reset':
                setPieces(data.pieces);
                if (url.searchParams.get('game')) {
                  setCurrentPlayer(data.currentPlayer === colors.player1 ? colors.player2 : colors.player1);
                } else {
                  setCurrentPlayer(data.currentPlayer);
                }
                setStatus('noerror');
                break;
              case 'clear':
                dispatchPlayers({
                  type: 'reset'
                });
                setPieces(data.pieces);
                if (url.searchParams.get('game')) {
                  setCurrentPlayer(data.currentPlayer === colors.player1 ? colors.player2 : colors.player1);
                } else {
                  setCurrentPlayer(data.currentPlayer);
                }
                setStatus('noerror');
                break;
              default: break;
            }
          };
          return () => {
            conn.close();
            setSocket(null);
          }
      }
    }
  }, [mode, currentPlayer, logged]);

  music.loop = true;

  function handleClickSound() {
    if (mute) {
      music.play();
    } else {
      music.pause();
    }
    setMute(!mute);
  }

  function handleClickEmplacementWrapper(e) {
    if (url.searchParams.get('game')) {
      if (currentPlayer === colors.player2) {
        handleClickEmplacement(e);
      } else {
        setStatus('notyourround');
      }
    } else {
      if (currentPlayer === colors.player1) {
        handleClickEmplacement(e);
      } else {
        setStatus('notyourround');
      }
    }
  }

  function handleClickEmplacement(e) {
    if (status !== 'overgame') {
      const coords = e.target.getBoundingClientRect();
      if (!checkEmplacement(pieces, +e.target.dataset.id)) {
        setStatus('busy');
      } else if (pieces.length !== 6) {
        const newPieces = [...pieces, {
          id: pieces.length + 1,
          x: coords.x + (coords.width / 2) - (size.piece / 2),
          y: coords.y + (coords.height / 2) - (size.piece / 2),
          color: currentPlayer,
          emplacement: +e.target.dataset.id
        }];
        setPieces(newPieces);
        const alignment = alignmentExist(newPieces, currentPlayer);
        if (alignment.length !== 0) {
          dispatchPlayers({
            type: 'update',
            player: currentPlayer
          });
          setStatus('overgame');
          setWinner(currentPlayer);
          socket?.send(JSON.stringify({ action: 'game', pieces: newPieces, currentPlayer: '' }));
        } else {
          setStatus('noerror');
          const newCurrentPlayer = (currentPlayer === colors.player1) ? colors.player2 : colors.player1;
          setCurrentPlayer(newCurrentPlayer);
          socket?.send(JSON.stringify({ action: 'game', pieces: newPieces, currentPlayer: currentPlayer }));
        }
      } else {
        setStatus('outoflimitplayers');
      }
    }
  }

  function handleDragStartWrapper(e) {
    if (url.searchParams.get('game')) {
      if (currentPlayer === colors.player2) {
        handleDragStart(e);
      } else {
        setStatus('notyourround');
      }
    } else {
      if (currentPlayer === colors.player1) {
        handleDragStart(e);
      } else {
        setStatus('notyourround');
      }
    }
  }

  function handleDragStart(e) {
    if (status !== 'overgame') {
      if (e.target.dataset.color !== currentPlayer) {
        setStatus('notyourround');
      } else {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", e.target.dataset.id);
        setStatus('noerror');
      }
    }
  }

  function handleDragEnterWrapper(e) {
    if (url.searchParams.get('game')) {
      if (currentPlayer === colors.player2) {
        handleDragEnter(e);
      } else {
        setStatus('notyourround');
      }
    } else {
      if (currentPlayer === colors.player1) {
        handleDragEnter(e);
      } else {
        setStatus('notyourround');
      }
    }
  }

  function handleDragEnter(e) {
    e.preventDefault();
  }

  function handleDragOverWrapper(e) {
    if (url.searchParams.get('game')) {
      if (currentPlayer === colors.player2) {
        handleDragOver(e);
      } else {
        setStatus('notyourround');
      }
    } else {
      if (currentPlayer === colors.player1) {
        handleDragOver(e);
      } else {
        setStatus('notyourround');
      }
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDropWrapper(e) {
    if (url.searchParams.get('game')) {
      if (currentPlayer === colors.player2) {
        handleDrop(e);
      } else {
        setStatus('notyourround');
      }
    } else {
      if (currentPlayer === colors.player1) {
        handleDrop(e);
      } else {
        setStatus('notyourround');
      }
    }
  }

  function handleDrop(e) {
    if (status !== 'overgame') {
      const idPiece = e.dataTransfer.getData("text/plain");
      if (pieces.length === 6 && status !== 'notyourround') {
        const piece = pieces.find(piece => piece.id === +idPiece);
        if (!checkEmplacement(pieces, +e.target.dataset.id)) {
          setStatus('busy');
        } else if (!checkMove(piece.emplacement, +e.target.dataset.id)) {
          setStatus('dragnotallowed');
        } else {
          const coords = e.target.getBoundingClientRect();
          const newPieces = pieces.map(piece => {
            if (piece.id === +idPiece) {
              return {
                ...piece,
                x: coords.x + (coords.width / 2) - (size.piece / 2),
                y: coords.y + (coords.height / 2) - (size.piece / 2),
                emplacement: +e.target.dataset.id
              };
            } else {
              return piece;
            }
          });
          setPieces(newPieces);
          const alignment = alignmentExist(newPieces, currentPlayer);
          if (alignment.length !== 0) {
            dispatchPlayers({
              type: 'update',
              player: currentPlayer
            });
            setStatus('overgame');
            setWinner(currentPlayer);
            socket?.send(JSON.stringify({ action: 'game', pieces: newPieces, currentPlayer: '' }));
          } else {
            setStatus('noerror');
            const newCurrentPlayer = (currentPlayer === colors.player1) ? colors.player2 : colors.player1;
            setCurrentPlayer(newCurrentPlayer);
            socket?.send(JSON.stringify({ action: 'game', pieces: newPieces, currentPlayer: currentPlayer }));
          }
        }
      } else if (pieces.length !== 6) {
        setStatus('dragnotstart');
      }
      e.preventDefault();
    }
  }

  function newGame(reset = false, make_random = false) {
    let firstPlayer = (winner === colors.player1) ? colors.player2 : colors.player1;
    if (reset) {
      dispatchPlayers({
        type: 'reset',
        player: currentPlayer
      });
    }
    if (make_random) {
      firstPlayer = chooseFirstPlayer(colors);
    }
    setCurrentPlayer(firstPlayer);
    setStatus('noerror');
    setPieces([]);
    if (reset && make_random) {
      socket?.send(JSON.stringify({ action: 'clear', pieces: [], currentPlayer: firstPlayer }));
    } else {
      socket?.send(JSON.stringify({ action: 'reset', pieces: [], currentPlayer: firstPlayer }));
    }
    setWinner('');
  }

  return (
    <>
      <Modal hidden={modal.hide} >
        {modal.child}
      </Modal>
      <button className="btn-icon-sound" onClick={handleClickSound}>{getIconSound(mute)}</button>
      <Players mode={mode} players={Object.values(players)} currentPlayer={currentPlayer} winner={winner} />
      <Board players={players}
        size={size}
        colors={colors}
        pieces={pieces}
        currentPlayer={currentPlayer}
        status={status}
        winner={winner}
        newGame={newGame}
        handleClickEmplacement={handleClickEmplacementWrapper}
        onDragEnter={handleDragEnterWrapper}
        onDragOver={handleDragOverWrapper}
        onDragStart={handleDragStartWrapper}
        onDrop={handleDropWrapper} />
      <p className={`message ${status === 'overgame' ? 'success' : ''}`}>{messages[status]} {status !== 'overgame' ? '' : `Le vainqueur est ${players[winner].name.toUpperCase()}.`}</p>
      <div className="action-container">
        <button className={`btn ${status !== 'overgame' ? 'd-none' : ''}`} onClick={() => newGame()}>Rejouer</button>
        <button className={`btn ${status !== 'overgame' ? 'd-none' : ''}`} onClick={() => newGame(true, true)}>Nouvelle Partie</button>
      </div>
    </>
  );
}

const getIconSound = (mute) => {
  let icon = unmuteIcon;
  if (mute) {
    icon = muteIcon;
  }
  return <img className='icon' src={icon} alt="Icone sound" />;
}

export default App;
