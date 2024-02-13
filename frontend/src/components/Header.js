import logo from '../images/logo.svg';
import { NavLink } from 'react-router-dom';
import api from '../utils/api';

function Header(props) {
  function handleExit() {
    localStorage.removeItem('authorized');
    api.logout();
  }
    return (
        <header className="header">
          <img
            src={logo}
            alt="Логотип Место"
            className="header__logo"
          />
          {props.login && <NavLink className='header__link' to='/signup'>Регистрация</NavLink>}
          {props.register && <NavLink className='header__link' to='/signin'>Войти</NavLink>}
          {props.authorized && <div className='header__links'><p className='header__email'>{props.email}</p><NavLink className='header__link header__link_exit' to='/signin' onClick={handleExit}>Выйти</NavLink></div>}
        </header>
    );
}

export default Header;
