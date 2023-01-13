const getEmplacements = (size, sizePieceEmpl) => {
    return [
        {
            id: 1,
            x: -size.border, 
            y: -size.border
        },
        {
            id: 2,
            x: (size.board/2)-(size.border/2)-((sizePieceEmpl)/2),
            y: -size.border
        },
        {
            id: 3,
            x: size.board-(sizePieceEmpl)-size.border,
            y: -size.border
        },
        {
            id: 4,
            x: -size.border,
            y: (size.board/2)-(size.border/2)-((sizePieceEmpl)/2)
        },
        {
            id: 5,
            x: (size.board/2)-(size.border/2)-((sizePieceEmpl)/2),
            y: (size.board/2)-(size.border/2)-((sizePieceEmpl)/2)
        },
        {
            id: 6,
            x: size.board-(sizePieceEmpl)-size.border,
            y: (size.board/2)-(size.border/2)-((sizePieceEmpl)/2)
        },
        {
            id: 7,
            x: -size.border,
            y: size.board-(sizePieceEmpl)-size.border
        },
        {
            id: 8,
            x: (size.board/2)-(size.border/2)-((sizePieceEmpl)/2),
            y: size.board-(sizePieceEmpl)-size.border
        },
        {
            id: 9,
            x: size.board-(sizePieceEmpl)-size.border,
            y: size.board-(sizePieceEmpl)-size.border
        }
    ];
}

export { getEmplacements };