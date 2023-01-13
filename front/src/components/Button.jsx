export default function Button({label, onClick, disabled=false, type='button', className=''}) {
    return (
      <button className={`btn ${className}`} type={type} disabled={disabled} onClick={onClick}>{label}</button>
    );
}