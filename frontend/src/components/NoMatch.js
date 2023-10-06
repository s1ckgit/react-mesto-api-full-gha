import {NavLink} from 'react-router-dom'
import nomatchPic from '../images/nomatch.jpg'

export default function NoMatch() {
  return (
    <>
      <h1 className="nomatch">Такой страницы не существует</h1>
      <img className='nomatch__pic' src={nomatchPic} alt='Страница не найдена'/>
      <NavLink className='nomatch__link' to='/'>Вернуться на главную</NavLink>
    </>
  )
}
