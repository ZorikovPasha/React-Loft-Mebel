import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'

import { UserApiClient } from '../api'
import { getUserData } from '../redux/getters'
import { loginUserActionCreator, logoutUserActionCreator } from '../redux/actions/userAction'
import { resetFavoritesActionCreator } from '../redux/actions/favorites'
import { resetCartActionCreator } from '../redux/actions/cartItems'
import { getEmailInputErrorMessage, getTextInputErrorMessage, validateEmail, validateTextInput } from '../utils'
import AppTextField from '../components/common/appTextField'
import { IField } from './SignUp'

interface IFile {
  file: File | null
  url: string | null
}

const Profile: React.FC = () => {
  const fileProps = {
    file: null,
    url: null
  }
  const tabs = ['personal', 'orders'] as const

  const nameProps: IField = {
    value: '',
    label: 'Name',
    labelClass: 'newproduct__subtitle',
    isValid: false,
    required: true,
    type: 'text',
    placeholder: 'Type your name',
    className: 'profile__form-block',
    inputClassName: 'form-input',
    tag: 'input',
    showErrors: false,
    errorMessage: '',
    getErrorMessage: getTextInputErrorMessage,
    validateFn: validateTextInput
  }

  const surnameProps: IField = {
    value: '',
    label: 'Surname',
    labelClass: 'newproduct__subtitle',
    isValid: false,
    required: true,
    type: 'text',
    placeholder: 'Type your surname',
    className: 'profile__form-block',
    inputClassName: 'form-input',
    tag: 'input',
    showErrors: false,
    errorMessage: '',
    getErrorMessage: getTextInputErrorMessage,
    validateFn: validateTextInput
  }

  const emailProps: IField = {
    tag: 'input',
    value: '',
    label: 'E-mail',
    labelClass: 'newproduct__subtitle',
    isValid: false,
    required: true,
    type: 'email',
    placeholder: 'Type your e-mail',
    className: 'profile__form-block',
    inputClassName: 'form-input',
    showErrors: false,
    errorMessage: '',
    getErrorMessage: getEmailInputErrorMessage,
    validateFn: validateEmail
  }

  const phoneProps: IField = {
    tag: 'input',
    value: '',
    isValid: false,
    required: true,
    placeholder: 'Type your phone number',
    labelClass: 'newproduct__subtitle',
    label: 'Phone',
    className: 'profile__form-block',
    inputClassName: 'form-input',
    type: 'tel',
    showErrors: false,
    errorMessage: '',
    getErrorMessage: getTextInputErrorMessage,
    validateFn: validateTextInput
  }

  const cityProps: IField = {
    tag: 'input',
    value: '',
    isValid: false,
    required: true,
    placeholder: 'Type city you live in',
    labelClass: 'newproduct__subtitle',
    label: 'City',
    type: 'text',
    showErrors: false,
    className: 'profile__form-block',
    inputClassName: 'form-input',
    errorMessage: '',
    getErrorMessage: getTextInputErrorMessage,
    validateFn: validateTextInput
  }

  const streetProps: IField = {
    tag: 'input',
    value: '',
    type: 'text',
    isValid: false,
    required: true,
    label: 'Street',
    placeholder: 'Type street you live in',
    showErrors: false,
    labelClass: 'newproduct__subtitle',
    className: 'profile__form-block',
    inputClassName: 'form-input',
    errorMessage: '',
    getErrorMessage: getTextInputErrorMessage,
    validateFn: validateTextInput
  }

  const houseProps: IField = {
    tag: 'input',
    value: '',
    type: 'text',
    isValid: false,
    placeholder: 'Type your house',
    required: true,
    labelClass: 'newproduct__subtitle',
    label: 'House',
    showErrors: false,
    className: 'profile__form-block',
    inputClassName: 'form-input',
    errorMessage: '',
    getErrorMessage: getTextInputErrorMessage,
    validateFn: validateTextInput
  }

  const apartmentProps: IField = {
    tag: 'input',
    value: '',
    type: 'text',
    isValid: true,
    placeholder: 'Type your apartment',
    required: false,
    labelClass: 'newproduct__subtitle',
    label: 'Apartment',
    showErrors: false,
    className: 'profile__form-block',
    inputClassName: 'form-input',
    errorMessage: '',
    getErrorMessage: getTextInputErrorMessage,
    validateFn: validateTextInput
  }

  const dispatch = useDispatch()
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const reader = new FileReader()
    reader.readAsDataURL(acceptedFiles[0])
    reader.onload = (e: ProgressEvent<FileReader>) => {
      setProfilePicture({
        file: acceptedFiles[0],
        url: e.target ? (typeof e.target.result === 'string' ? e.target.result : null) : null
      })
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const history = useHistory()

  const user = useSelector(getUserData)
  console.log('user', user)

  const [name, setName] = React.useState(nameProps)
  const [surname, setSurname] = React.useState(surnameProps)
  const [email, setEmail] = React.useState(emailProps)
  const [phone, setPhone] = React.useState(phoneProps)
  const [city, setCity] = React.useState(cityProps)
  const [street, setStreet] = React.useState(streetProps)
  const [house, setHouse] = React.useState(houseProps)
  const [apartment, setApartment] = React.useState(apartmentProps)

  const [activeTab, setActiveTab] = React.useState<'personal' | 'orders'>('personal')
  const [profilePicture, setProfilePicture] = React.useState<IFile>(fileProps)

  React.useEffect(() => {
    setProfilePicture({
      file: null,
      url: user.image?.url ?? null
    })
  }, [user.image])

  console.log('profilePicture', profilePicture)

  const onChange =
    (setState: React.Dispatch<React.SetStateAction<IField>>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const target = e.target
      setState((prev) => ({
        ...prev,
        value: target.value,
        isValid: prev.validateFn(target.value),
        showErrors: true
      }))
    }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (![name, surname, email, phone, house, street, house, apartment].every(({ isValid }) => isValid)) {
      return
    }

    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('surname', surname.value)
    formData.append('email', email.value)
    formData.append('phone', phone.value)
    formData.append('city', city.value)
    formData.append('street', street.value)
    formData.append('house', house.value)
    formData.append('apartment', apartment.value)

    if (profilePicture.file) {
      formData.append('image', profilePicture.file)
    }
    // formData.append("emailConfirmed", emailConfirmed)
    // formData.append("wantsToReceiveEmailUpdates", wantsToReceiveEmailUpdates)

    const payload = {
      name: name.value,
      surname: surname.value,
      email: email.value,
      phone: phone.value,
      city: city.value,
      street: street.value,
      house: house.value,
      apartment: apartment.value,
      ...(profilePicture.url
        ? {
            name: '',
            url: profilePicture.url
          }
        : {})
    }

    dispatch(loginUserActionCreator(payload))
    UserApiClient.updateUserData(formData)
      .then(() => {})
      .catch(() => {})
  }

  const onLogout = () => {
    localStorage.removeItem('loft_furniture_token')
    dispatch(logoutUserActionCreator())
    dispatch(resetFavoritesActionCreator())
    dispatch(resetCartActionCreator())
    history.push({ pathname: '/' })
  }

  const onTab = (tab: 'personal' | 'orders') => () => {
    setActiveTab(tab)
  }

  return (
    <>
      <section className='profile'>
        <div className='container'>
          <div className='profile__controls flex'>
            <div className='profile__tabs flex'>
              {tabs.map((t) => (
                <button
                  className={`profile__tab ${t === activeTab ? 'profile__tab--active' : ''} btn`}
                  key={t}
                  type='button'
                  onClick={onTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              className='profile__logout btn btn--danger'
              type='button'
              onClick={onLogout}
            >
              Выйти
            </button>
          </div>
          <div className='profile__box'>
            {activeTab === 'personal' && (
              <>
                <h3 className='profile__title'>Личные данные</h3>
                <form
                  className='profile__form'
                  onSubmit={handleSubmit}
                >
                  <div className='profile__form-block'>
                    <p className='newproduct__subtitle'>Profile Picture</p>
                    <div
                      {...getRootProps()}
                      className={`profile__drop ${isDragActive ? 'profile__drop--drag' : ''}`}
                    >
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p className='profile__drop-placeholder'>Drop the files here ...</p>
                      ) : profilePicture.url ? (
                        <div className='profile__picture'>
                          <img
                            src={profilePicture.url}
                            className='profile__picture-img'
                          />
                        </div>
                      ) : (
                        <p className='profile__drop-placeholder'>
                          Drag 'n' drop some files here, or click to select files
                        </p>
                      )}
                    </div>
                  </div>

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
                    inputClassName={`${name.inputClassName} ${name.isValid ? 'input-text--error' : ''}`}
                    showErrors={name.isValid && name.showErrors}
                    errorMessage={name.getErrorMessage(name.value)}
                    onChange={onChange(setName)}
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
                    inputClassName={`${email.inputClassName} ${email.isValid ? 'input-text--error' : ''}`}
                    showErrors={email.isValid && email.showErrors}
                    errorMessage={email.getErrorMessage(name.value)}
                    onChange={onChange(setEmail)}
                  />
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
                    inputClassName={`${surname.inputClassName} ${surname.isValid ? 'input-text--error' : ''}`}
                    showErrors={surname.isValid && surname.showErrors}
                    errorMessage={surname.getErrorMessage(surname.value)}
                    onChange={onChange(setSurname)}
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
                    inputClassName={`${phone.inputClassName} ${phone.isValid ? 'input-text--error' : ''}`}
                    showErrors={phone.isValid && phone.showErrors}
                    errorMessage={phone.getErrorMessage(phone.value)}
                    onChange={onChange(setPhone)}
                  />
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
                    inputClassName={`${city.inputClassName} ${city.isValid ? 'input-text--error' : ''}`}
                    showErrors={city.isValid && city.showErrors}
                    errorMessage={city.getErrorMessage(city.value)}
                    onChange={onChange(setCity)}
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
                    inputClassName={`${street.inputClassName} ${street.isValid ? 'input-text--error' : ''}`}
                    showErrors={street.isValid && street.showErrors}
                    errorMessage={street.getErrorMessage(street.value)}
                    onChange={onChange(setStreet)}
                  />

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
                    inputClassName={`${house.inputClassName} ${house.isValid ? 'input-text--error' : ''}`}
                    showErrors={house.isValid && house.showErrors}
                    errorMessage={house.getErrorMessage(house.value)}
                    onChange={onChange(setHouse)}
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
                    inputClassName={`${apartment.inputClassName} ${apartment.isValid ? 'input-text--error' : ''}`}
                    showErrors={apartment.isValid && apartment.showErrors}
                    errorMessage={apartment.getErrorMessage(apartment.value)}
                    onChange={onChange(setApartment)}
                  />
                  <button
                    className='btn'
                    type='submit'
                  >
                    Изменить
                  </button>
                </form>
              </>
            )}

            {activeTab === 'orders' && (
              <div className='profile__orders orders'>
                <h3 className='profile__title'>Мои заказы</h3>
                <div className='orders__items'>
                  <div className='orders__name heading'>Товар</div>
                  <div className='orders__cost heading'>Цена</div>
                  <div className='orders__date heading'>Дата</div>
                  <div className='orders__status heading'>Статус</div>
                  {/* {orders?.map(({ id, name, status }, idx) => (
                          <React.Fragment key={idx}>
                            <div className='orders__name'>
                              <img
                                className='orders__preview'
                                src={imageUrl}
                                alt='Furniture preview'
                              />
                              <Link to={`/products/${id}`}>{name}</Link>
                            </div>
                            <div className='orders__cost'>{price}</div>
                            <div className='orders__date'>{date.toString().substring(0, 10)}</div>
                            <div className='orders__status'>{status}</div>
                          </React.Fragment>
                        ))} */}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile
