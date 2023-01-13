import Piece from "../components/Piece";
import PieceEmplacement from "../components/PieceEmplacement";
import { getStyle } from "../utils/style";
import { getEmplacements } from "../utils/emplacements"

export default function Board({currentPlayer, pieces, status, size, handleClickEmplacement, onDragStart, onDragEnter, onDragOver, onDrop}) {
    const sizePieceEmpl = size.piece + 8;
    const emplacements = getEmplacements(size, sizePieceEmpl);
    const style = getStyle(size);

    return (
        <>
            <div className="board" style={style.board}>
                <div className="separator" style={style.hsep}></div>
                <div className="separator" style={style.vsep}></div>
                <div className="diag" style={style.diag1}></div>
                <div className="diag" style={style.diag2}></div>
                {emplacements.map(empl => {
                    return (
                        <PieceEmplacement key={empl.id}
                            size={sizePieceEmpl}
                            position={{
                                x: empl.x,
                                y: empl.y
                            }}
                            onClick={handleClickEmplacement}
                            onDrop={onDrop}
                            onDragEnter={onDragEnter}
                            onDragOver={onDragOver}
                            order={empl.id} />
                    );
                })}
            </div>
            {pieces.map(piece => <Piece key={piece.id} id={piece.id} position={piece} size={size.piece} color={piece.color} onDragStart={onDragStart} isWinner={status === 'overgame' && piece.color === currentPlayer}/>)}
        </>
    );
}