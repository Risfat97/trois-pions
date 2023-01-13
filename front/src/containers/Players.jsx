import Player from "../components/Player";

export default function Players({mode, players, currentPlayer, winner}) {
    return (
        <div className="players-container">
            {players.map(player => <Player mode={mode} key={player.name} color={player.color} name={player.name} score={player.score} disabled={currentPlayer !== player.color} isWinner={player.color === winner} />)}
        </div>
    );
}