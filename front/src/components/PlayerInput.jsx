import Button from "./Button";

const messages = {
    empty: '',
    outoflength: "Le nombre de caractère limite est de 8.",
    error: "Le pseudo est obligatoire.",
    typing: '',
    nice: ''
};

export default function PlayerInput({handleInputChange, handleSubmit, playername, status, title='Joueur'}) {
    return (
        <form action="">
            <h5>{title}</h5>
            <div className="form-group">
                <label htmlFor="name">Entrez votre pseudo:</label>
                <input type="text" onChange={handleInputChange} value={playername} />
                <small style={{color: 'var(--col-danger)'}}>{messages[status]}</small>
            </div>
            <Button type='submit' label='Valider' disabled={status === 'nice'} onClick={handleSubmit} />
        </form>
    );
}