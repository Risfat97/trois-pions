import Button from "../components/Button";
import GameMode from "../components/GameMode";
import LinkDisplayer from "../components/LinkDisplayer";
import PlayerInput from "../components/PlayerInput";
import Spinner from "../components/Spinner";

const initialModal = {
    hide: false,
    hideSpinner: true,
    child: <Spinner />
};

const modalReducer = (modal, action) => {  
    switch (action.type) {
      case 'link': {
        return {
          ...modal,
          hide: false,
          hideSpinner: true,
          child: <LinkDisplayer link={action.link} handleCancel={action.callbacks.handleCancel} />
        };
      }
      case 'mode': {
        return {
          ...modal,
          hide: false,
          hideSpinner: true,
          child: <GameMode mode={action.mode} handleInputChange={action.callbacks.handleChange} handleSubmit={action.callbacks.handleSubmit} />
        };
      }
      case 'player': {
        return {
          ...modal,
          hide: false,
          hideSpinner: true,
          child: <PlayerInput status={action.status} playername={action.playername} handleInputChange={action.callbacks.handleChange} handleSubmit={action.callbacks.handleSubmit} />
        };
      }
      case 'loader': {
        return {
          ...modal,
          hide: false,
          hideSpinner: true,
          child: <Spinner />
        };
      }
      case 'message': {
        return {
          ...modal,
          hide: false,
          hideSpinner: true,
          child: (<>
            <p>{action.message}</p>
            <Button label="Retour à l'accueil" onClick={action.callbacks.handleClick} />
          </>)
        };
      }
      case 'reset': {
        return {
          ...modal,
          hide: true,
          hideSpinner: true,
          child: null
        };
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }

  export { initialModal, modalReducer };