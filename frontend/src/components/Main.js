import React, { useContext } from "react"
import Card from "./Card"
import { UserContext } from "../contexts/CurrentUserContext"

function Main({ onEditAvatar, onEditProifle, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
    const user = useContext(UserContext)

    return (
        <main>
          <section className="profile">
            <div onClick={onEditAvatar} className="profile__avatar-wrapper">
              <img
                src={user?.avatar}
                alt="Аватар"
                className="profile__avatar"
              />
            </div>
            <div className="profile__info">
              <h1 className="profile__name">{user?.name}</h1>
              <button onClick={onEditProifle} type="button" className="profile__edit" />
              <p className="profile__about">{user?.about}</p>
            </div>
            <button onClick={onAddPlace} type="button" className="profile__add" />
          </section>
          <section className="elements">
            {cards.map(cardData => {
              return (
                <Card onCardDelete={onCardDelete} onCardLike={onCardLike} onCardClick={onCardClick} key={cardData._id} card={cardData}/>
              )
            })}
          </section>
        </main>
    )
}

export default Main
