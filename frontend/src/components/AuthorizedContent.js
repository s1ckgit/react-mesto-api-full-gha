import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/api';
import { useEffect, useState } from 'react';
import { UserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

export default function AuthorizedContent() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false),
  [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false),
  [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false),
  [selectedCard, setSelectedCard] = useState(null),
  [currentUser, setCurrentUser] = useState({}),
  [userEmail, setUserEmail] = useState(''),
  [error, setError] = useState();

  const [cards, setCards] = useState([]);

  useEffect(() => {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    setCurrentUser(userData);
    setCards(cardsData);
    setUserEmail(userData.email);
  })
  .catch(e => {
    console.log(`Ошибка получения данных с сервера...
    ${e}`);
    setError(e);
  });
  }, []);

  function handleEditAvatarClick() {
  setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
  setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
  setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
  setSelectedCard(card);
  }

  function closeAllPopups() {
  setIsEditProfilePopupOpen(false);
  setIsAddPlacePopupOpen(false);
  setIsEditAvatarPopupOpen(false);
  setSelectedCard(null);
  }

  function handleCardLike(card) {
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  api.likeCard(card._id, !isLiked)
  .then((newCard) => {
    console.log(newCard);
    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  })
  .catch(e => {
    console.log(`Произошла ошибка:
    ${e}`);
  });
  }

  function handleCardDelete(card) {
  api.deleteCard(card._id)
  .then(() => setCards(state => state.filter(c => c._id !== card._id)))
  .catch(e => {
    console.log(`Произошла ошибка:
    ${e}`);
  });
  }

  function handleUpdateUser({ name, about }) {
  api.changeUserInfo({ name, about })
  .then(userData => {
    setCurrentUser(userData);
    closeAllPopups();
  })
  .catch(e => {
    console.log(`Произошла ошибка:
    ${e}`);
  });
  }

  function handleUpdateAvatar({ avatar }) {
  api.changeAvatar({ avatar })
  .then(res => {
    setCurrentUser({ ...currentUser, avatar: res.avatar });
    closeAllPopups();
  })
  .catch(e => console.log(`Что-то пошло не так...
  ${e}`));
  }

  function handleAddPlaceSubmit({ name, link }) {
  api.addCard({ name, link })
  .then(newCard => {
    setCards([newCard, ...cards]);
    closeAllPopups();
  })
  .catch(e => console.log(`Что-то пошло не так...
  ${e}`));
  }

  return (
    <UserContext.Provider value={currentUser}>
      <Header email={userEmail} authorized/>
      {error ? <p className='error'>Что-то пошло не так... {error}</p> : (
        <>
          <Main onCardDelete={handleCardDelete} onCardLike={handleCardLike} cards={cards} onCardClick={handleCardClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onEditProifle={handleEditProfileClick}/>
          <Footer />
          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          </EditProfilePopup>
          <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          </AddPlacePopup>
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          </EditAvatarPopup>
          <PopupWithForm title='Вы уверены?' name='delete' buttonText='Да'>
          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </>
      )}
    </UserContext.Provider>
  );
}
