import { colors } from "../utils/style";

const initialPlayers = {
    [colors.player1]: {
      name: "player1",
      color: colors.player1,
      score: 0
    },
    [colors.player2]: {
      name: "player2",
      color: colors.player2,
      score: 0
    }
};

const playersReducer = (players, action) => {
    switch (action.type) {
      case 'rename': {
        return {
          [colors.player1]: {
            ...players[colors.player1],
            name: action.playername1
          },
          [colors.player2]: {
            ...players[colors.player2],
            name: action.playername2
          }
        };
      }
      case 'update': {
        return { 
          ...players, 
          [action.player]: 
          { 
            ...players[action.player], 
            score: players[action.player].score + 1 
          } 
        };
      }
      case 'reset': {
        let newPlayers = { ...players };
        newPlayers[colors.player1].score = newPlayers[colors.player2].score = 0;
        return newPlayers;
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }

  export { initialPlayers, playersReducer };