import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { UserApiClient } from '..//api'
import { getOrders, getUserData } from '../redux/getters'
import { authActionCreator } from '../redux/actions/authAction'
import { addUserDataActionCreator } from '../redux/actions/userAction'
import { initFormValues } from '../redux/reducers/userReducer'
import { resetFavoritesActionCreator } from '../redux/actions/favorites'
import { resetCartActionCreator } from '../redux/actions/cartItems'
import { validateEmail, validateTextInput } from '../utils'
import AppTextField from '../components/common/appTextField'
import { IField } from './SignUp'

const Profile: React.FC = () => {
  const dispatch = useDispatch()
  const terms = [
    { text: 'Возвращаем до 7% на бонусный счет', img: '/images/terms/1.svg' },
    { text: '1 бонус = 1 рубль', img: '/images/terms/2.svg' },
    { text: 'Оплачивайте бонусами до 20% от покупки', img: '/images/terms/3.svg' }
  ]

  const history = useHistory()

  const fetchedOrders = useSelector(getOrders)
  const userFormValues = useSelector(getUserData)

  const fields = React.useRef<Record<string, IField>>({
    name: {
      value: '',
      label: 'Имя',
      labelClass: 'profile__form-label',
      isValid: false,
      required: true,
      type: 'text',
      placeholder: 'Введите ваше имя',
      className: 'profile__form-block',
      inputClassName: 'profile__form-input',
      tag: 'input',
      showErrors: false,
      getErrorMessage: (str: string) => (validateTextInput(str) ? '' : 'Пожалуйста, заполните имя'),
      validateFn: validateTextInput
    },
    email: {
      tag: 'input',
      value: '',
      label: 'E-mail',
      labelClass: 'profile__form-label',
      isValid: false,
      required: true,
      type: 'email',
      placeholder: 'Введите ваш e-mail',
      className: 'profile__form-block',
      inputClassName: 'profile__form-input',
      showErrors: false,
      getErrorMessage: (str: string) => (str.trim().length === 0 ? 'Пожалуйста, заполните email' : validateEmail(str) ? 'Введите корректный email' : ''),
      validateFn: validateEmail
    },
    surname: {
      value: '',
      label: 'Фамилия',
      labelClass: 'profile__form-label profile__form-label--gap-right',
      isValid: false,
      required: true,
      type: 'text',
      placeholder: 'Напишите ваше сообщение',
      className: 'profile__form-block',
      inputClassName: 'profile__form-input',
      tag: 'textarea',
      showErrors: false,
      getErrorMessage: (str: string) => (validateTextInput(str) ? '' : 'Пожалуйста, заполните имя'),
      validateFn: validateTextInput
    },
    phone: {
      tag: 'input',
      value: '',
      isValid: false,
      required: true,
      placeholder: 'Введите ваш e-mail',
      labelClass: 'profile__form-label',
      label: 'Номер телефона',
      className: 'profile__form-block',
      inputClassName: 'profile__form-input',
      type: 'tel',
      showErrors: false,
      getErrorMessage: (str: string) => (validateTextInput(str) ? '' : 'Пожалуйста, заполните поле'),
      validateFn: validateTextInput
    },
    city: {
      tag: 'input',
      value: '',
      isValid: false,
      required: true,
      placeholder: 'Введите ваш e-mail',
      labelClass: 'profile__form-label city',
      label: 'Город',
      type: 'text',
      showErrors: false,
      className: 'profile__form-block',
      inputClassName: 'profile__form-input',
      getErrorMessage: (str: string) => (validateTextInput(str) ? '' : 'Пожалуйста, заполните поле'),
      validateFn: validateTextInput
    },
    street: {
      tag: 'input',
      value: '',
      type: 'text',
      isValid: false,
      required: true,
      label: 'Улица',
      placeholder: 'Введите ваш e-mail',
      showErrors: false,
      labelClass: 'profile__form-label wide',
      className: 'profile__form-block',
      inputClassName: 'profile__form-input',
      getErrorMessage: (str: string) => (validateTextInput(str) ? '' : 'Пожалуйста, заполните поле'),
      validateFn: validateTextInput
    },
    house: {
      tag: 'input',
      value: '',
      type: 'text',
      isValid: false,
      placeholder: 'Введите ваш e-mail',
      required: true,
      labelClass: 'profile__form-label profile__form-label--gap-right house',
      label: 'Дом/Корпус',
      showErrors: false,
      className: 'profile__form-block',
      inputClassName: 'profile__form-input',
      getErrorMessage: (str: string) => (validateTextInput(str) ? '' : 'Пожалуйста, заполните поле'),
      validateFn: validateTextInput
    },
    apartment: {
      tag: 'input',
      value: '',
      type: 'text',
      isValid: false,
      placeholder: 'Введите ваш e-mail',
      required: true,
      labelClass: 'profile__form-label apartment',
      label: 'Квартира',
      showErrors: false,
      className: 'profile__form-block',
      inputClassName: 'profile__form-input',
      getErrorMessage: (str: string) => (validateTextInput(str) ? '' : 'Пожалуйста, заполните поле'),
      validateFn: validateTextInput
    }
  } as const)
  const [form, setForm] = React.useState(fields.current)

  const { name, email, phone, surname, city, street, house, apartment } = form

  const onChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          value: e.target.value,
          isValid: prev[name].validateFn(e.target.value),
          showErrors: true
        }
      }
    })
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!Object.values(form).every(({ isValid }) => isValid)) {
      return
    }

    const dto = {
      name: name.value,
      email: email.value,
      surname: surname.value,
      street: street.value,
      city: city.value,
      phone: phone.value,
      house: house.value,
      apartment: apartment.value
    }

    UserApiClient.sendUserData(dto).then(() => {
      setForm(fields.current)
    })
  }

  const onLogout = () => {
    localStorage.setItem('token', '')
    dispatch(authActionCreator(false))
    dispatch(addUserDataActionCreator(initFormValues))
    dispatch(resetFavoritesActionCreator())
    dispatch(resetCartActionCreator())
    history.push({ pathname: '/' })
  }

  return (
    <>
      <section className='profile'>
        <div className='container'>
          <div className='profile__top'>
            <div className='profile__names'>
              <h3 className='profile__heading'>Бонусная программа</h3>
              <div className='profile__names-right'>
                <p className='profile__total'>
                  У вас
                  <span> 0 </span>
                  бонусных баллов
                </p>
                <button className='profile__rules'>Правила бонусной программы</button>
              </div>
            </div>
            <div className='profile__terms'>
              {terms.map(({ text, img }) => (
                <div
                  className='profile__term'
                  key={text}
                >
                  <img
                    src={img}
                    alt='condition'
                  />
                  <p className='profile__term-text'>{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='profile__body'>
            <div className='profile__box'>
              <h3 className='profile__title'>Личные данные</h3>
              <form
                className='profile__form'
                onSubmit={handleSubmit}
              >
                <AppTextField
                  elementType={name.tag}
                  placeholder={name.placeholder}
                  name='name'
                  type={name.type}
                  value={name.value}
                  required={name.required}
                  rootElclass={name.className}
                  label={name.label}
                  labelClass={name.labelClass}
                  inputWrapClass={name.inputWrapClass}
                  inputClassName={`${name.inputClassName} ${showNameInputError ? 'input-text--error' : ''}`}
                  showErrors={showNameInputError}
                  errorMessage={name.getErrorMessage(name.value)}
                  onChange={onChange('name')}
                />
                <AppTextField
                  elementType={email.tag}
                  placeholder={email.placeholder}
                  name='email'
                  type={email.type}
                  value={email.value}
                  required={email.required}
                  rootElclass={email.className}
                  label={email.label}
                  labelClass={email.labelClass}
                  inputWrapClass={email.inputWrapClass}
                  inputClassName={`${email.inputClassName} ${showEmailInputError ? 'input-text--error' : ''}`}
                  showErrors={showEmailInputError}
                  errorMessage={email.getErrorMessage(name.value)}
                  onChange={onChange('email')}
                />
                <div className='profile__form-line'>
                  <AppTextField
                    elementType={surname.tag}
                    placeholder={surname.placeholder}
                    name='surname'
                    type={surname.type}
                    value={surname.value}
                    required={surname.required}
                    rootElclass={surname.className}
                    label={surname.label}
                    labelClass={surname.labelClass}
                    inputWrapClass={surname.inputWrapClass}
                    inputClassName={`${surname.inputClassName} ${showNameInputError ? 'input-text--error' : ''}`}
                    showErrors={showNameInputError}
                    errorMessage={surname.getErrorMessage(surname.value)}
                    onChange={onChange('surname')}
                  />
                  <AppTextField
                    elementType={phone.tag}
                    placeholder={phone.placeholder}
                    name='phone'
                    type={phone.type}
                    value={phone.value}
                    required={phone.required}
                    rootElclass={phone.className}
                    label={phone.label}
                    labelClass={phone.labelClass}
                    inputWrapClass={phone.inputWrapClass}
                    inputClassName={`${phone.inputClassName} ${showNameInputError ? 'input-text--error' : ''}`}
                    showErrors={showNameInputError}
                    errorMessage={phone.getErrorMessage(phone.value)}
                    onChange={onChange('phone')}
                  />
                </div>
                <AppTextField
                  elementType={city.tag}
                  placeholder={city.placeholder}
                  name='city'
                  type={city.type}
                  value={city.value}
                  required={city.required}
                  rootElclass={city.className}
                  label={city.label}
                  labelClass={city.labelClass}
                  inputWrapClass={city.inputWrapClass}
                  inputClassName={`${city.inputClassName} ${showNameInputError ? 'input-text--error' : ''}`}
                  showErrors={showNameInputError}
                  errorMessage={city.getErrorMessage(city.value)}
                  onChange={onChange('city')}
                />
                <AppTextField
                  elementType={street.tag}
                  placeholder={street.placeholder}
                  name='street'
                  type={street.type}
                  value={street.value}
                  required={street.required}
                  rootElclass={street.className}
                  label={street.label}
                  labelClass={street.labelClass}
                  inputWrapClass={street.inputWrapClass}
                  inputClassName={`${street.inputClassName} ${showNameInputError ? 'input-text--error' : ''}`}
                  showErrors={showNameInputError}
                  errorMessage={street.getErrorMessage(street.value)}
                  onChange={onChange('street')}
                />

                <div className='profile__form-line'>
                  <AppTextField
                    elementType={house.tag}
                    placeholder={house.placeholder}
                    name='house'
                    type={house.type}
                    value={house.value}
                    required={house.required}
                    rootElclass={house.className}
                    label={house.label}
                    labelClass={house.labelClass}
                    inputWrapClass={house.inputWrapClass}
                    inputClassName={`${house.inputClassName} ${showNameInputError ? 'input-text--error' : ''}`}
                    showErrors={showNameInputError}
                    errorMessage={house.getErrorMessage(house.value)}
                    onChange={onChange('house')}
                  />
                  <AppTextField
                    elementType={apartment.tag}
                    placeholder={apartment.placeholder}
                    name='apartment'
                    type={apartment.type}
                    value={apartment.value}
                    required={apartment.required}
                    rootElclass={apartment.className}
                    label={apartment.label}
                    labelClass={apartment.labelClass}
                    inputWrapClass={apartment.inputWrapClass}
                    inputClassName={`${apartment.inputClassName} ${showNameInputError ? 'input-text--error' : ''}`}
                    showErrors={showNameInputError}
                    errorMessage={apartment.getErrorMessage(apartment.value)}
                    onChange={onChange('apartment')}
                  />
                </div>
                <div className='profile__form-btns'>
                  <button
                    className='profile__form-btn profile__form-btn--red'
                    type='button'
                    onClick={onLogout}
                  >
                    Выйти
                  </button>
                  <button
                    className='profile__form-btn'
                    type='submit'
                  >
                    Изменить
                  </button>
                </div>
              </form>
            </div>
            <div className='profile__orders orders'>
              <h3 className='profile__title'>Мои заказы</h3>
              <div className='orders__items'>
                <div className='orders__name heading'>Товар</div>
                <div className='orders__cost heading'>Цена</div>
                <div className='orders__date heading'>Дата</div>
                <div className='orders__status heading'>Статус</div>
                {fetchedOrders &&
                  fetchedOrders?.map(({ id, name, price, date, status, imageUrl }, idx) => (
                    <React.Fragment key={idx}>
                      <div className='orders__name'>
                        <img
                          className='orders__preview'
                          src={imageUrl}
                          alt='Превю мебели'
                        />
                        <Link to={`/products/${id}`}>{name}</Link>
                      </div>
                      <div className='orders__cost'>{price}</div>
                      <div className='orders__date'>{date.toString().substring(0, 10)}</div>
                      <div className='orders__status'>{status}</div>
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile
