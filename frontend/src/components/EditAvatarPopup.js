import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup( { isOpen, onClose, onUpdateAvatar } ) {
  const avatarInput = useRef();

  useEffect(() => {
    avatarInput.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInput.current.value
    });
  }

  return (
      <PopupWithForm name='avatar' title='Обновить аватар' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
        <fieldset className="popup__fieldset">
          <input
            required=""
            name="avatar"
            id="avatar_link"
            type="url"
            placeholder="Ссылка на аватар"
            className="popup__input popup__input_avatar"
            ref={avatarInput}
          />
          <span className="input-error input-error_avatar_link" />
        </fieldset>
      </PopupWithForm>
  );
}

export default EditAvatarPopup;
