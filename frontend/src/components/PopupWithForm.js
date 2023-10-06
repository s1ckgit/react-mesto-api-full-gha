import cn from 'classnames'

function PopupWithForm( {title, name, buttonText, children, isOpen, onClose, onSubmit} ) {
    return (
        <div className={cn(`popup popup_${name}`, {
            'popup_opened': isOpen === true
        })}>
          <div className={`popup__container popup__container_${name}`}>
            <button type="button" className={`popup__close popup__close_${name}`} onClick={onClose}/>
            <h2 className={`popup__title popup__title_${name}`}>
              {title}
            </h2>
            <form
              name={`popupForm${name[0].toUpperCase() + name.slice(1)}`}
              className={`popup__form popup__form_${name}`}
              id={`popupForm${name[0].toUpperCase() + name.slice(1)}`}
              noValidate=""
              onSubmit={onSubmit}
            >
              {children}
              <button type="submit" className={`popup__button popup__button_${name}`}>
                {buttonText}
              </button>
            </form>
          </div>
        </div>
    )
}

export default PopupWithForm
