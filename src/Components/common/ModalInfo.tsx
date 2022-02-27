import React from "react";

interface IModalProps {
  text: string;
  title: string;
  hasButton?: boolean;
  onModalClose: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalInfo: React.FC<IModalProps> = ({ onModalClose, text, title, hasButton }) => {
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
      </div>
    </div>
  );
};

export default ModalInfo;
