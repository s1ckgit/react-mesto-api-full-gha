import { useForm } from "react-hook-form";
import cn from 'classnames';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import api from '../utils/api';
import InfoTooltip from './InfoToolTip';
import { useNavigate } from 'react-router-dom';

export default function AuthorizationElement({ title, btnText, login = false, authorization }) {
  const navigate = useNavigate();
  const [tooltipOpened, setTooltipOpened] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      about: '',
      avatar: '',
    },
    mode: 'onBlur'
  });

  const onSubmit = (data) => {
    if(login) {
      handleLogin(data);
    } else {
      handleRegister(data);
    }
  };

  function handleLogin(data) {
    const dataCopy = {
      ...data
    };
    checkEmptyStrings(dataCopy);
    api.loginUser(dataCopy)
        .then(() => {
          localStorage.setItem('authorized', true);
          authorization(true);
          navigate('/');
        })
        .catch(() => {
          setTooltipOpened(true);
        });
  }

  function handleRegister(data) {
    const dataCopy = {
      ...data
    };
    checkEmptyStrings(dataCopy);
    api.registerUser(dataCopy)
      .then(() => {
        localStorage.setItem('authorized', true);
        authorization(true);
        navigate('/');
      })
      .catch(() => {
        setTooltipOpened(true);
      });
  }

  function checkEmptyStrings(object) {
    for (let key in object) {
      if(object[key] === '') {
        delete object[key];
      }
    }
  }

  return (
    <div className="authorization__container">
      <h1 className="authorization__title">{title}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="authorization__form">
        <input {...register('email', {
          required: 'Поле необходимо заполнить',
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Укажите корректный Email'
          }
        })}
        className='authorization__input'
        placeholder="Email" />
        <p className={cn('authorization__input-error', {
          'authorization__input-error_shown': errors.email
        })}>
          {errors.email?.message}
        </p>

        <input {...register('password', {
          required: 'Поле необходимо заполнить',
          minLength: {
            value: 8,
            message: 'Минимальная длина пароля 8 символов'
          }
        })}
        className='authorization__input'
        placeholder="Пароль"
        type="password"/>
        <p className={cn('authorization__input-error', {
          'authorization__input-error_shown': errors.password
        })}>
          {errors.password?.message}
        </p>

        {!login && (
          <>
            <input {...register('name', {
              minLength: {
                value: 2,
                message: 'Минимальная длина 2'
              },
              maxLength: {
                value: 30,
                message: 'Максимальная длина 30 символов'
              }
            })}
            className='authorization__input'
            placeholder='Имя'/>
            <p className={cn('authorization__input-error', {
          'authorization__input-error_shown': errors.name
        })}>
          {errors.name?.message}
        </p>
            <input {...register('about', {
              minLength: {
                value: 2,
                message: 'Минимальная длина 2'
              },
              maxLength: {
                value: 30,
                message: 'Максимальная длина 30 символов'
              }
            })}
            className='authorization__input'
            placeholder='Обо мне'/>
            <p className={cn('authorization__input-error', {
          'authorization__input-error_shown': errors.about
        })}>
          {errors.about?.message}
        </p>
            <input {...register('avatar', {
              pattern: {
                value: /https?:\/\/(www\.)?[\w-]+\.\w+(\/.+)?/i,
                message: 'Укажите корректную ссылку'
              }
            })}
            className='authorization__input'
            placeholder='Ссылка на аватар'/>
            <p className={cn('authorization__input-error', {
          'authorization__input-error_shown': errors.avatar
        })}>
          {errors.avatar?.message}
        </p>
          </>
        )}

        <button type='submit' className='authorization__button'>{btnText}</button>
        {register && <NavLink className='authorization__link' to='/signin'>Уже зарегистрированы? Войти</NavLink>}
      </form>

      <InfoTooltip setIsOpened={setTooltipOpened} isOpened={tooltipOpened}/>
    </div>
  );
}
