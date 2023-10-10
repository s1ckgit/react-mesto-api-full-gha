import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import api from '../utils/api'
import InfoTooltip from './InfoToolTip'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export default function AuthorizationElement({title, btnText, register = false}) {
  const navigate = useNavigate()
  const setAuth = useContext(AuthContext)
  const [tooltipOpened, setTooltipOpened] = useState(false)
  const [tooltipType, setTooltipType] = useState('')
  const [authData, setAuthData] = useState({
    email: '',
    password: ''
  })

  function handleSumbit(e) {
    e.preventDefault()
    if(register) {
      api.registerUser(authData)
      .then((data) => {
        console.log(data)
        setTooltipOpened(true)
        setTooltipType('succes');
        setAuthData({
          email: '',
          password: ''
        })
      })
      .catch(() => {
        setTooltipOpened(true)
        setTooltipType('fail')
      })
    } else {
      api.loginUser(authData)
        .then((data) => {
          localStorage.setItem('jwt', data.token)
          console.log(data)
          setAuth(true);
          navigate('/')
        })
        .catch(() => {
          setTooltipOpened(true)
          setTooltipType('fail')
        })
    }
  }
  function handleChange(e) {
    setAuthData({
      ...authData,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className="authorization__container">
      <h1 className="authorization__title">{title}</h1>

      <form onSubmit={handleSumbit} className="authorization__form">
        <input onChange={handleChange} type='email' name='email' value={authData.email} className='authorization__input' placeholder='Email'/>
        <input onChange={handleChange} type='password' name='password' value={authData.password} className='authorization__input' placeholder='Пароль'/>
        <button type='submit' className='authorization__button'>{btnText}</button>
        {register && <NavLink className='authorization__link' to='/signin'>Уже зарегистрированы? Войти</NavLink>}
      </form>

      <InfoTooltip setIsOpened={setTooltipOpened} type={tooltipType} isOpened={tooltipOpened}/>
    </div>
  )
}
