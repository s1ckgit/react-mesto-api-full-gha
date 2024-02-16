import { useForm } from 'react-hook-form';
import cn from 'classnames';
import PopupWithForm from './PopupWithForm';
import { useEffect } from 'react';

function EditAvatarPopup( { isOpen, onClose, onUpdateAvatar } ) {

  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
    defaultValues: {
      avatar: ''
    },
    mode: 'onChange'
  });

  const onSubmit = (data) => {
    onUpdateAvatar(data);
  };

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  return (
      <PopupWithForm isValid={isValid} name='avatar' title='Обновить аватар' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={cn('popup__fieldset', {
          'popup__fieldset_error': errors.avatar
        })}>
          <input
            {...register('avatar', {
              required: 'Поле необходимо заполнить',
              pattern: {
                value: /https?:\/\/(www\.)?[\w-]+\.\w+(\/.+)?/i,
                message: 'Укажите корректную ссылку'
              }
            })}
            placeholder="Ссылка на аватар"
            className="popup__input popup__input_avatar"
          />
          <p className={cn('input-error', {
            'input-error_active': errors.avatar
          })}>
            {errors.avatar?.message}
          </p>
        </fieldset>
      </PopupWithForm>
  );
}

export default EditAvatarPopup;
