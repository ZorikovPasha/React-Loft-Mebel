import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'

import { UserApiClient } from '../api'
import { getProducts, getUserData } from '../redux/getters'
import { editOrderActionCreator, editUserActionCreator, logoutUserActionCreator } from '../redux/actions/userAction'
import {
  getEmailInputErrorMessage,
  getQueryParams,
  getTextInputErrorMessage,
  validateEmail,
  validateTextInput
} from '../utils'
import AppTextField from '../components/common/appTextField'
import { IField } from './SignUp'
import { isSuccessfullCancelOrderResponse, isSuccessfullResponse } from '../api/types'
import { toggleSnackbarOpen } from '../redux/actions/errors'
import { Button } from '../components/common/Button'
import { Loader } from '../components/common/Loader'
import { ROUTES, SCREEN_SIZES } from '../utils/const'
import { useScreenSize } from '../hooks/useScreenSize'
import { EmailsUpdatesModal } from '../components/profile/emailUpdatesModal'

interface IFile {
  file: File | null
  url: string | null
  isTouched: boolean
}

interface IProductInOrder {
  id: number
  name: string
  image: {
    alternativeText: string
    caption: string
    createdAt: string
    ext: string
    hash: string
    height: number
    id: number
    mime: string
    name: string
    provider: 'database'
    size: number
    updatedAt: string
    url: string
    width: number
  } | null
  quintity: number
  color: string
  price: number
}

const Profile: React.FC = () => {
  const history = useHistory()

  const { isLoggedIn } = useSelector(getUserData)

  if (!isLoggedIn) {
    history.push(ROUTES.Login)
    return <></>
  }

  const fileProps: IFile = {
    file: null,
    url: null,
    isTouched: false
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
    isTouched: false,
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
    isTouched: false,
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
    isTouched: false,
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
    isTouched: false,
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
    isTouched: false,
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
    isTouched: false,
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
    isTouched: false,
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
    isTouched: false,
    getErrorMessage: getTextInputErrorMessage,
    validateFn: validateTextInput
  }

  const dispatch = useDispatch()
  const isNotMobile = useScreenSize(SCREEN_SIZES.tablet)

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0].type === 'image/jpeg' || acceptedFiles[0].type === 'image/png') {
      const reader = new FileReader()
      reader.readAsDataURL(acceptedFiles[0])
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setProfilePicture({
          file: acceptedFiles[0],
          url: e.target ? (typeof e.target.result === 'string' ? e.target.result : null) : null,
          isTouched: true
        })
      }
    } else {
      return dispatch(toggleSnackbarOpen('You can attach .png or .jpg images only.'))
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const products = useSelector(getProducts)
  const user = useSelector(getUserData)

  const collectedOrders = user.orders.map((o) => {
    const items = o.items
      .map((item) => {
        const product = products.find((p) => p.id === item.furnitureId)
        if (!product) {
          return
        }
        return {
          id: product.id,
          name: product.name,
          image: product.image,
          quintity: item.quintity,
          color: item.color,
          price: parseFloat(product.priceNew ? product.priceNew : product.priceOld)
        }
      })
      .filter((item): item is IProductInOrder => Boolean(item))

    return {
      ...o,
      items
    }
  })

  const [profilePicture, setProfilePicture] = React.useState(fileProps)
  const [name, setName] = React.useState(nameProps)
  const [email, setEmail] = React.useState(emailProps)
  const [surname, setSurname] = React.useState(surnameProps)
  const [phone, setPhone] = React.useState(phoneProps)
  const [city, setCity] = React.useState(cityProps)
  const [street, setStreet] = React.useState(streetProps)
  const [house, setHouse] = React.useState(houseProps)
  const [apartment, setApartment] = React.useState(apartmentProps)
  const [activeTab, setActiveTab] = React.useState<'personal' | 'orders'>('personal')
  const [modalLoginOpened, setModalLoginOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const isAnyFieldTouched = [name, email, surname, phone, city, street, house, apartment, profilePicture].some(
    (props) => {
      return props.isTouched
    }
  )

  React.useEffect(() => {
    const decidedOnRecieveingEmails = localStorage.getItem('decidedOnRecieveingEmails')

    if (decidedOnRecieveingEmails === '1') {
      return
    }

    window.setTimeout(() => {
      document.body.classList.add('lock')
      setModalLoginOpened(true)
    }, 3000)
  }, [])

  React.useEffect(() => {
    const tabParam = getQueryParams('tab')
    if (tabParam === 'orders' || tabParam === 'personal') {
      setActiveTab(tabParam)
    }
  }, [window.location.search])

  React.useEffect(() => {
    setProfilePicture({
      isTouched: profilePicture.isTouched,
      file: null,
      url: user.image?.url ?? null
    })
  }, [user.image])

  React.useEffect(
    () =>
      setName((prev) => ({
        ...prev,
        value: user.name,
        isValid: prev.validateFn(user.name)
      })),
    [user.name]
  )
  React.useEffect(
    () =>
      setSurname((prev) => ({
        ...prev,
        value: user.surname,
        isValid: prev.validateFn(user.surname)
      })),
    [user.surname]
  )
  React.useEffect(
    () =>
      setEmail((prev) => ({
        ...prev,
        value: user.email,
        isValid: prev.validateFn(user.email)
      })),
    [user.email]
  )
  React.useEffect(
    () =>
      setPhone((prev) => ({
        ...prev,
        value: user.phone,
        isValid: prev.validateFn(user.phone)
      })),
    [user.phone]
  )
  React.useEffect(
    () =>
      setCity((prev) => ({
        ...prev,
        value: user.city,
        isValid: prev.validateFn(user.city)
      })),
    [user.city]
  )
  React.useEffect(
    () =>
      setStreet((prev) => ({
        ...prev,
        value: user.street,
        isValid: prev.validateFn(user.street)
      })),
    [user.street]
  )
  React.useEffect(
    () =>
      setHouse((prev) => ({
        ...prev,
        value: user.house,
        isValid: prev.validateFn(user.house)
      })),
    [user.house]
  )
  React.useEffect(
    () =>
      setApartment((prev) => ({
        ...prev,
        value: user.apartment,
        isValid: prev.validateFn(user.apartment)
      })),
    [user.apartment]
  )

  const onChange =
    (setState: React.Dispatch<React.SetStateAction<IField>>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const target = e.target
      setState((prev) => ({
        ...prev,
        value: target.value,
        isValid: prev.validateFn(target.value),
        showErrors: true,
        isTouched: true
      }))
    }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!isAnyFieldTouched) {
      return
    }

    if (
      ![name, surname, email, phone, city, street, house].every(({ isValid, required }) => (required ? isValid : true))
    ) {
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

    document.body.classList.add('lock')
    setIsLoading(true)
    UserApiClient.updateUserData(formData)
      .then((dto) => {
        setIsLoading(false)
        document.body.classList.remove('lock')
        if (!isSuccessfullResponse(dto)) {
          return dispatch(toggleSnackbarOpen())
        }

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
                image: {
                  name: '',
                  url: profilePicture.url
                }
              }
            : {})
        }

        dispatch(editUserActionCreator(payload))
        dispatch(toggleSnackbarOpen('Profile info updated successfully!', 'success'))
        setName((prev) => ({ ...prev, isTouched: false }))
        setEmail((prev) => ({ ...prev, isTouched: false }))
        setSurname((prev) => ({ ...prev, isTouched: false }))
        setPhone((prev) => ({ ...prev, isTouched: false }))
        setCity((prev) => ({ ...prev, isTouched: false }))
        setStreet((prev) => ({ ...prev, isTouched: false }))
        setHouse((prev) => ({ ...prev, isTouched: false }))
        setApartment((prev) => ({ ...prev, isTouched: false }))
        setProfilePicture((prev) => ({ ...prev, isTouched: false }))
      })
      .catch(() => {
        setIsLoading(false)
        document.body.classList.remove('lock')
        dispatch(toggleSnackbarOpen())
      })
  }

  const onCancelOrder = (orderId: number) => () => {
    UserApiClient.cancelOrder(orderId)
      .then((dto) => {
        if (!isSuccessfullCancelOrderResponse(dto)) {
          return dispatch(toggleSnackbarOpen())
        }

        const candidate = user.orders.find((o) => o.id === orderId)
        if (!candidate) {
          return
        }

        const payload = {
          ...candidate,
          status: 'CANCELED'
        } as const
        dispatch(editOrderActionCreator(payload))
      })
      .then(() => {
        dispatch(toggleSnackbarOpen())
      })
  }

  const onLogout = () => {
    localStorage.removeItem('loft_furniture_token')
    localStorage.removeItem('decidedOnRecieveingEmails')
    dispatch(logoutUserActionCreator())
    history.push({ pathname: '/' })
  }

  const onTab = (tab: 'personal' | 'orders') => () => {
    setActiveTab(tab)
  }

  const onLoginModalClose = () => {
    setModalLoginOpened(false)
    document.body.classList.remove('lock')
  }

  const showErrors = (props: IField) => {
    return props.showErrors && !props.isValid && (props.required || props.value.trim().length > 0)
  }

  return (
    <>
      {isLoading && <Loader rootElClass='loader--fixed' />}

      {modalLoginOpened && <EmailsUpdatesModal onModalClose={onLoginModalClose} />}

      <section className='profile'>
        <div className='container'>
          <div className='profile__controls flex'>
            <div className='profile__tabs flex'>
              {tabs.map((t) => (
                <Button
                  className={`profile__tab ${t === activeTab ? 'profile__tab--active' : ''}`}
                  key={t}
                  type='button'
                  title={t}
                  onClick={onTab(t)}
                >
                  {t}
                </Button>
              ))}
            </div>

            {isNotMobile && (
              <Button
                className='profile__logout'
                type='button'
                title='Log out'
                onClick={onLogout}
              >
                <>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9'
                      stroke='#D41367'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M16 17L21 12L16 7'
                      stroke='#D41367'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M21 12H9'
                      stroke='#D41367'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  Log out
                </>
              </Button>
            )}
          </div>
          <div className='profile__box'>
            {activeTab === 'personal' && (
              <>
                <h3 className='profile__title'>Profile info</h3>
                <form
                  className='profile__form mt-30'
                  onSubmit={handleSubmit}
                >
                  <div className='profile__form-block'>
                    <p className='newproduct__subtitle'>Avatar</p>
                    <div
                      {...getRootProps()}
                      className={`profile__drop mt-20 ${isDragActive ? 'profile__drop--drag' : ''}`}
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
                    inputClassName={name.inputClassName}
                    showErrors={showErrors(name)}
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
                    inputClassName={email.inputClassName}
                    showErrors={showErrors(email)}
                    errorMessage={email.getErrorMessage(email.value)}
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
                    inputClassName={surname.inputClassName}
                    showErrors={showErrors(surname)}
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
                    inputClassName={phone.inputClassName}
                    showErrors={showErrors(phone)}
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
                    inputClassName={city.inputClassName}
                    showErrors={showErrors(city)}
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
                    inputClassName={street.inputClassName}
                    showErrors={showErrors(street)}
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
                    inputClassName={house.inputClassName}
                    showErrors={showErrors(house)}
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
                    inputClassName={apartment.inputClassName}
                    showErrors={showErrors(apartment)}
                    errorMessage={apartment.getErrorMessage(apartment.value)}
                    onChange={onChange(setApartment)}
                  />
                  <Button
                    title='Edit'
                    className='btn ${isAnyFieldTouched}'
                    disabled={!isAnyFieldTouched}
                    type='submit'
                  >
                    Update profile
                  </Button>
                </form>
              </>
            )}

            {activeTab === 'orders' && (
              <div className='profile__orders orders'>
                <h3 className='profile__title'>Мои заказы: {collectedOrders.length}</h3>
                <div className='mt-30'>
                  {collectedOrders.map(({ id, name, status, createdAt, items }) => (
                    <div className='mt-10'>
                      <div className='profile__orders-info grid items-center justify-between'>
                        <div className='flex items-center'>
                          <p className='profile__order-name'>
                            Order name: {name} №{id}
                          </p>
                          {status !== 'CANCELED' && (
                            <Button
                              className='profile__order-cancel flex items-center justify-center'
                              type='button'
                              aria-label='Cancel order'
                              title='Cancel order'
                              onClick={onCancelOrder(id)}
                            >
                              <img
                                src='/images/icons/cross.svg'
                                alt=''
                              />
                            </Button>
                          )}
                        </div>

                        <p
                          className={`profile__order-name ${
                            status === 'CANCELED' ? 'profile__order-name--red' : 'profile__order-name--blue'
                          }`}
                        >
                          Status: {status}
                        </p>
                        <p className='profile__order-name'>{new Date(createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className='profile__table grid items-center mt-10'>
                        <p className='profile__table-cell'>Product</p>
                        <p className='profile__table-cell'>Price</p>
                        <p className='profile__table-cell'>Quintity</p>
                        <p className='profile__table-cell'>Color</p>
                        {items.map(({ id, name, image, color, quintity, price }) => (
                          <React.Fragment>
                            <div className='profile__table-cell flex items-center'>
                              <Link
                                to={`/products/${id}`}
                                className=''
                              >
                                <p>{name}</p>
                              </Link>
                              <img
                                className='profile__table-image'
                                src={image ? import.meta.env.VITE_BACKEND + image.url : ''}
                                alt=''
                              />
                            </div>
                            <p className='profile__table-cell'>{price * quintity}</p>
                            <p className='profile__table-cell'>{quintity}</p>
                            <p className='profile__table-cell'>
                              <span
                                className='profile__table-color colors__checkbox-fake'
                                style={{ backgroundColor: color ? color : '#fff' }}
                              ></span>
                            </p>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
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
