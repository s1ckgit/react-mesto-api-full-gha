import classNames from "classnames";

function ImagePopup({ card, onClose }) {
    return (
        <div className={classNames("popup popup_image", {
            'popup_opened': card !== null
        })}>
          <div className="popup__container popup__container_image">
            <button type="button" className="popup__close popup__close_image" onClick={onClose}/>
            <img
              src={card ? card.link : ''}
              alt={card ? card.name : ''}
              className="popup__img"
            />
            <p className="popup__title popup__title_image">{card ? card.name : ''}</p>
          </div>
        </div>
    );
}

export default ImagePopup;
