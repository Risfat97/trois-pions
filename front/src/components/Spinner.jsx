export default function Spinner({size=18}) {

    return (
        <div className={`spinner`}>
            <div className="bounce1" style={{width: size, height: size}}></div>
            <div className="bounce2" style={{width: size, height: size}}></div>
            <div className="bounce3" style={{width: size, height: size}}></div>
        </div>
    );
}