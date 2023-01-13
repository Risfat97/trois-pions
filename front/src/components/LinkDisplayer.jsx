import Button from "./Button";
import Spinner from "./Spinner";

export default function LinkDisplayer({link, handleCancel}) {
    return (
        <div className="link-container">
            <h4>Copiez le lien ci-dessous et envoyez le à votre ami.</h4>
            <textarea className="link" readOnly={true} value={link}></textarea>
            <div className="d-flex align-items-center m-0">
                <h4 className="waiting">En attente de la connexion de votre ami(e)</h4>
                <Spinner size={12} />
            </div>
            <Button className='btn-danger' type='button' label='Annuler' onClick={handleCancel} />
        </div>
    );
}