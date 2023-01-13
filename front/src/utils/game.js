const checkEmplacement = (pieces, target) => {
    let res = true;
    if (pieces.length !== 0) {
        const indexTarget = pieces.findIndex(piece => piece.emplacement === target);
        if (indexTarget !== -1)
            res = false;
    }
    return res;
};

const checkMove = (source, dest) => {
    const allowDestination = {
        1: [2, 4, 5],
        2: [1, 3, 5],
        3: [2, 5, 6],
        4: [1, 5, 7],
        5: [1, 2, 3, 4, 6, 7, 8, 9],
        6: [3, 5, 9],
        7: [4, 5, 8],
        8: [5, 7, 9],
        9: [5, 6, 8],
    }
    return (allowDestination[source].includes(dest));
};

const alignmentExist = (pieces, player) => {
    const schemes = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    const playerPieces = pieces.filter(piece => piece.color === player);
    if(playerPieces.length === 3) {
        let emplacements = [playerPieces[0].emplacement, playerPieces[1].emplacement, playerPieces[2].emplacement];
        emplacements = emplacements.sort((a, b) => a - b);
        for (let schem of schemes) {
            if (schem[0] === emplacements[0] && schem[1] === emplacements[1] && schem[2] === emplacements[2]) {
                return schem;
            }
        }
    }
    return [];
};

const chooseFirstPlayer = (colors) => {
    const tab = Object.values(colors);
    let alea = Math.floor(Math.random() * 100) % 2;
    return tab[alea];
};

const randomPlay = (pieces, player, size) => {
    const playerPieces = pieces.filter(piece => piece.color === player);
    let tryToPlay = true;
    let newPiece;
    let alea;
    let emplacement;
    let coords;
    while(tryToPlay){
        alea = (Math.floor(Math.random()*100) % 9) + 1;
        emplacement = document.querySelector(`.piece-emplacement[data-id='${alea}']`);
        coords = emplacement.getBoundingClientRect();
        //console.log('Dans la boucle: essai de l\'emplaement', alea);
        if(playerPieces.length !== 3) {
            newPiece = {
                id: pieces.length+1,
                x: coords.x + (coords.width / 2) - (size.piece / 2),
                y: coords.y + (coords.height / 2) - (size.piece / 2),
                color: player,
                emplacement: alea
            };
            if(checkEmplacement(pieces, alea)){
                tryToPlay = false;
            }
        } else {
            newPiece = playerPieces[(Math.floor(Math.random()*10) % 3)];
            // console.log('Move:', newPiece.emplacement, alea);
            if(newPiece.emplacement !== alea && checkEmplacement(pieces, alea) && checkMove(newPiece.emplacement, alea)){
                tryToPlay = false;
                newPiece.emplacement = alea;
                newPiece.x = coords.x + (coords.width / 2) - (size.piece / 2);
                newPiece.y = coords.y + (coords.height / 2) - (size.piece / 2);
            }
        }
    }
    return newPiece;
}

export {checkEmplacement, checkMove, alignmentExist, chooseFirstPlayer, randomPlay};