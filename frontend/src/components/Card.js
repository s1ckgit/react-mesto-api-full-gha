import { useContext } from "react"
import { UserContext } from "../contexts/CurrentUserContext"

function Card( {card, onCardClick, onCardLike, onCardDelete} ) {
  function handleClick() {
    onCardClick(card)
  }
  function handleDeleteClick() {
    onCardDelete(card)
  }
  function handleLikeClick() {
    onCardLike(card)
  }

  const user = useContext(UserContext),
        // isOwn = card.owner._id.toString() === user._id,
        isLiked = card.likes.some(i => i._id.toString() === user._id)
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  );;

  return (
      <div className="element">
          { <button onClick={handleDeleteClick} type="button" className="element__delete"></button>}
          <img src={card.link} alt={card.name} className="element__img" onClick={handleClick}/>
          <div className="element__block">
              <h3 className="element__name">{card.name}</h3>
              <div className="element__likes">
              <button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName}></button>
              <p className="element__likes-counter">{card.likes.length}</p>
              </div>
          </div>
      </div>
  )
}

export default Card
