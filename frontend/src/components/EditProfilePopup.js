import { useContext, useEffect } from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { UserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup( { isOpen, onClose, onUpdateUser } ) {
  const user = useContext(UserContext);
  console.log(user);

  const { register, handleSubmit, formState: { errors, isValid }, setValue, trigger } = useForm({
    defaultValues: {
      name: '',
      about: '',
    },
    mode: 'onChange'
  });

  const onSubmit = (data) => {
    onUpdateUser(data);
  };

  useEffect(() => {
    setValue('about', user.about);
    setValue('name', user.name);
    trigger();
  }, [user, setValue, trigger]);

  return (
      <PopupWithForm isValid={isValid} name='profile' title='Редактировать профиль' buttonText='Сохранить' onSubmit={handleSubmit(onSubmit)} onClose={onClose} isOpen={isOpen}>
        <fieldset className={cn('popup__fieldset', {
          'popup__fieldset_error': errors.name
        })}>
          <input
            {...register('name', {
              required: 'Поле необходимо заполнить',
              minLength: {
                value: 2,
                message: 'Минимум 2 символа'
              },
              maxLength: {
                value: 30,
                message: 'Максимум 30 символов'
              }
            })}
            placeholder="Имя"
            className="popup__input popup__input_profile"
          />
          <p className={cn('input-error', {
            'input-error_active': errors.name
          })}>
            {errors.name?.message}
          </p>
        </fieldset>
        <fieldset className={cn('popup__fieldset', {
          'popup__fieldset_error': errors.about
        })}>
          <input
            {...register('about', {
              required: 'Поле необходимо заполнить',
              minLength: {
                value: 2,
                message: 'Минимум 2 символа'
              },
              maxLength: {
                value: 30,
                message: 'Максимум 30 символов'
              }
            })}
            placeholder="О себе"
            className="popup__input popup__input_profile"
          />
          <p className={cn('input-error', {
            'input-error_active': errors.about
          })}>
            {errors.about?.message}
          </p>
        </fieldset>
      </PopupWithForm>
  );
}

export default EditProfilePopup;
