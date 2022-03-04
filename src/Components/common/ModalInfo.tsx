import React from "react";
import { Link } from "react-router-dom";

interface IModalProps {
  text: string;
  title: string;
  hasButton?: boolean;
  link?: string;
  onModalClose: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalInfo: React.FC<IModalProps> = ({ onModalClose, text, link, title, hasButton }) => {
  return (
    <div className="popup-message shown">
      <div className="popup-message__body">
        <button className="popup-message__close mob-menu__close" onClick={onModalClose}>
        </button>
        <h3 className="popup-message__title">{title}</h3>
        <p className="popup-message__text"> {text}</p>
        { hasButton && 
          <button className="popup-message__btn" onClick={onModalClose}>Войти</button>
        }
        { link && 
          <Link 
            to={link}
            className="popup-message__btn" 
            >Войти</Link>
        }
      </div>
    </div>
  );
};

export default ModalInfo;
