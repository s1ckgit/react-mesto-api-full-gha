import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import cn from 'classnames';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup( { isOpen, onClose, onAddPlace } ) {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
    defaultValues: {
      name: '',
      link: ''
    },
    mode: 'onChange'
  });

  const onSubmit = (data) => {
    onAddPlace(data);
  };

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  return (
      <PopupWithForm isValid={isValid} name='card' title='Новое место' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit(onSubmit)}>
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
            type="text"
            placeholder="Название"
            className="popup__input popup__input_card"
          />
          <p className={cn("input-error", {
            "input-error_active": errors.name
          })}>
            {errors.name?.message}
          </p>
        </fieldset>
        <fieldset className={cn('popup__fieldset', {
          'popup__fieldset_error': errors.link
        })}>
          <input
            {...register('link', {
              required: 'Поле необходимо заполнить',
              pattern: {
                value: /https?:\/\/(www\.)?[\w-]+\.\w+(\/.+)?/i,
                message: 'Укажите корректную ссылку'
              }
            })}
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_card"
          />
          <p className={cn("input-error", {
            "input-error_active": errors.link
          })}>
            {errors.link?.message}
          </p>
        </fieldset>
      </PopupWithForm>
  );
}

export default AddPlacePopup;
