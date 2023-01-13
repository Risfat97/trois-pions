const sizes = {
    xs: {
        board: 200,
        border: 8,
        diag: Math.floor(200/Math.sin(Math.PI/4)) - (2*8),
        piece: 12
    },
    sm: {
        board: 250,
        border: 8,
        diag: Math.floor(250/Math.sin(Math.PI/4)) - (2*8),
        piece: 16
    },
    md: {
        board: 300,
        border: 8,
        diag: Math.floor(300/Math.sin(Math.PI/4)) - (2*8),
        piece: 16
    },
    lg: {
        board: 350,
        border: 10,
        diag: Math.floor(350/Math.sin(Math.PI/4)) - (2*10),
        piece: 24
    }
}

const getSize = () => {
    const sizeScreen = window.innerWidth;
    if(sizeScreen < 301) {
        return sizes.xs;
    } else if(300 < sizeScreen && sizeScreen < 451){
        return sizes.sm;
    } else if(450 < sizeScreen && sizeScreen < 601){
        return sizes.md;
    } else {
        return sizes.lg;
    }
};

export { getSize };
