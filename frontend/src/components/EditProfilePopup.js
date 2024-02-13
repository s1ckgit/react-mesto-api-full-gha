import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup( { isOpen, onClose, onUpdateUser } ) {
  const [name, setName] = useState(''),
        [description, setDescription] = useState('');

  const user = useContext(UserContext);

  useEffect(() => {
    setName(user?.name);
    setDescription(user?.about);
  }, [user, isOpen]);

  function changeName(e) {
    setName(e.target.value);
  }

  function changeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSumbit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  return (
      <PopupWithForm name='profile' title='Редактировать профиль' buttonText='Сохранить' onSubmit={handleSumbit} onClose={onClose} isOpen={isOpen}>
        <fieldset className="popup__fieldset">
          <input
            minLength={2}
            maxLength={40}
            required=""
            name="name"
            id="name"
            type="text"
            placeholder="Имя"
            className="popup__input popup__input_profile"
            onChange={changeName}
            value={name || ''}
          />
          <span className="input-error input-error_name" />
        </fieldset>
        <fieldset className="popup__fieldset">
          <input
            minLength={2}
            maxLength={200}
            required=""
            name="about"
            id="about"
            type="text"
            placeholder="О себе"
            className="popup__input popup__input_profile"
            onChange={changeDescription}
            value={description || ''}
          />
          <span className="input-error input-error_about" />
        </fieldset>
      </PopupWithForm>
  );
}

export default EditProfilePopup;
