import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup( { isOpen, onClose, onAddPlace } ) {
  const linkInput = useRef();
  const nameInput = useRef();

  useEffect(() => {
    linkInput.current.value = '';
    nameInput.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: nameInput.current.value,
      link: linkInput.current.value
    });
  }

  return (
      <PopupWithForm name='card' title='Новое место' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
        <fieldset className="popup__fieldset">
          <input
            required=""
            minLength={2}
            maxLength={30}
            name="name"
            id="title"
            type="text"
            placeholder="Название"
            className="popup__input popup__input_card"
            ref={nameInput}
          />
          <span className="input-error input-error_title" />
        </fieldset>
        <fieldset className="popup__fieldset">
          <input
            required=""
            name="link"
            id="link"
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_card"
            ref={linkInput}
          />
          <span className="input-error input-error_link" />
        </fieldset>
      </PopupWithForm>
  );
}

export default AddPlacePopup;
