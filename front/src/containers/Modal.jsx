export default function Modal({children, hidden=true}) {
    return (
        <div className={`modal-container ${hidden ? 'd-none' : ''}`}>
            <div className="modal">
                {children}
            </div>
        </div>
    );
}