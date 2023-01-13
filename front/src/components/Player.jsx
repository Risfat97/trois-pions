import { colors } from "../utils/style";

export default function Player({mode, color, name, score=0, disabled=false, isWinner=false}) {
  const url = new URL(window.location.href);
  let indicateWhoAmI = false;
  if(mode === 'friend') {
    if((url.searchParams.get('game') && color === colors.player2) || (!url.searchParams.get('game') && color === colors.player1)){
      indicateWhoAmI = true;
    }
  }
  return (
    <div className={`player ${disabled ? 'disabled' : ''} ${isWinner ? 'winner' : ''}`}>
      <div>
        <h3 style={{color: color}}>{name.toUpperCase()}</h3>&nbsp;
        {indicateWhoAmI && <span>(VOUS)</span>}
      </div>
      <div>
          <h2 className="score">{score}</h2>
      </div>
    </div>  
  );
}