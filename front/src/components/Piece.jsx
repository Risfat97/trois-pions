export default function Piece({id, position, size=10, color, onDragStart, isWinner=false}) {
    return (
        <div className={`piece ${isWinner ? 'winner' : ''}`} data-id={id} data-color={color} style={{
            top: position.y, 
            left: position.x,
            width: size,
            height: size,
            background: color
        }} draggable="true" onDragStart={onDragStart}></div>
    );
}