import fail from '../images/fail.svg';
import cn from 'classnames';

export default function InfoTooltip({ isOpened, setIsOpened }) {
  function handleClose() {
    setIsOpened(false);
  }
  return (
    <div className={cn('popup popup_tooltip', {
      'popup_opened': isOpened
    })}>
      <div className="popup__container popup__container_tooltip">
        <button onClick={handleClose} type="button" className="popup__close" />
        <img className='popup__icon' alt='Статус' src={fail}/>
        <h2 className="popup__title popup__title_tooltip">Что-то пошло не так! Попробуйте ещё раз.</h2>
      </div>
    </div>
  );
}

