const getStyle = (size) => {
    const styleBoard = {
        width: size.board,
        height: size.board
    };
    const styleHSep = {
        top: (size.board/2) - size.border,
        left: -size.border,
        right: -size.border,
        height: size.border
    };
    const styleVSep = {
        top: -size.border,
        bottom: -size.border,
        left: (size.board/2) - size.border,
        width: size.border
    };
    const styleDiag1 = {
        width: size.diag,
        height: size.border,
        top: (size.board/2) - (size.border/2) - size.border,
        left: (size.board/2) - (size.diag/2) - size.border,
        transform: 'rotateZ(45deg)'
    };
    const styleDiag2 = {
        width: size.diag,
        height: size.border,
        top: (size.board/2) - size.border - 1,
        right: (size.board/2) - (size.diag/2)  - size.border,
        transform: 'rotateZ(135deg)'
    };

    return {
        board: styleBoard,
        hsep: styleHSep,
        vsep: styleVSep,
        diag1: styleDiag1,
        diag2: styleDiag2
    };
};

const colors = {
    player1: '#2980B9',
    player2: '#dc3545'
};

export { getStyle, colors };