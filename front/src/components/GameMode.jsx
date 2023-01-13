import Button from './Button';

export default function GameMode({mode, handleInputChange, handleSubmit}) {
    return (
        <form action="" className="game-mode-container">
            <div className="form-group-radio">
                <input type="radio" id="ordi" name="mode" value="ordi" checked={mode === 'ordi'} onChange={handleInputChange} />&nbsp;
                <label htmlFor="ordi">Jouer avec l'ordinateur</label>
            </div>
            <div className="form-group-radio">
                <input type="radio" id="friend" name="mode" value="friend" checked={mode === 'friend'} onChange={handleInputChange} />&nbsp;
                <label htmlFor="friend">Jouer avec un(e) ami(e)</label>
            </div>
            <Button type='submit' label='Confirmer' onClick={handleSubmit} />
        </form>
    );
}