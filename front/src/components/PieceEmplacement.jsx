export default function PieceEmplacement({order, position, size, onClick, onDrop, onDragEnter, onDragOver}) {
    return (
        <div className="piece-emplacement" data-id={order} style={{
            width: size,
            height: size,
            top: position.y,
            left: position.x 
        }} onClick={onClick} onDragEnter={onDragEnter} onDragOver={onDragOver} onDrop={onDrop}></div>
    );
}