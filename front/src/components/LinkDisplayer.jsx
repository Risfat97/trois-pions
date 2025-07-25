import Button from "./Button";
import Spinner from "./Spinner";
import {useState} from "react";

export default function LinkDisplayer({link, handleCancel}) {
    const [isVisible, setIsVisible] = useState(false);

    function handleClickCopy(e) {
        window.navigator.clipboard.writeText(link)
            .then((value) => {
                setIsVisible(true);
                window.setTimeout(() => setIsVisible(false), 2000);
            })
            .catch(console.error)
    }

    return (
        <div className="link-container">
            <h4>Copiez le lien ci-dessous et envoyez le à votre ami.</h4>
            <textarea className="link mb-3" readOnly={true} value={link} rows={3}></textarea>
            <div className="d-flex align-items-center gp-8 mt-3">
                <Button className="btn btn-outline"
                        label="Copier le lien"
                        onClick={handleClickCopy} />
                {isVisible && (<strong className="text-success">Copié</strong>)}
            </div>
            <div className="d-flex align-items-center m-0">
                <h4 className="waiting">En attente de la connexion de votre ami(e)</h4>
                <Spinner size={12} />
            </div>
            <Button className='btn-danger' type='button' label='Annuler' onClick={handleCancel} />
        </div>
    );
}