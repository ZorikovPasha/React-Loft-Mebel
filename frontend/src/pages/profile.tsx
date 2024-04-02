import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import slugify from 'slugify'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { PublicApiClient, UserApiClient } from '../api'
import { getUserData } from '../redux/getters'
import { editOrderActionCreator, editUserActionCreator, logoutUserActionCreator } from '../redux/actions/userAction'
import {
  IProcessedFurniture,
  getEmailInputErrorMessage,
  getQueryParams,
  getTextInputErrorMessage,
  sanitizeFurnitureItem,
  validateEmail,
  validateTextInput
} from '../utils'
import AppTextField from '../components/common/appTextField'
import { IField } from './signup'
import { isDataOfFurniture, isSuccessfullResponse } from '../api/types'
import { toggleSnackbarOpen } from '../redux/actions/errors'
import { Button } from '../components/common/Button'
import { Loader } from '../components/common/Loader'
import { ROUTES, SCREEN_SIZES } from '../utils/const'
import { useScreenSize } from '../hooks/useScreenSize'
import { EmailsUpdatesModal } from '../components/profile/emailUpdatesModal'
import { Check } from '../svg/check'
import { Cross } from '../svg/cross'
import { Empty } from '../components/common/Empty'
import { IImage } from '../../../server/src/furniture/types'
import { GetStaticProps, NextPage } from 'next'
import { revalidate } from '../utils/const'
import Login from './login'

interface IFile {
  file: File | null
  url: string | null
  isTouched: boolean
}

interface IProductInOrder {
  id: number | null
  name: string
  image: IImage | null
  quintity: number
  color: string
  price: number | null
}

interface IOrderToRender {
  products: IProductInOrder[]
  id: number
  name: string
  status: string | null
  createdAt: Date
}

interface IProps {
  pageData: {
    furniture: IProcessedFurniture[]
  }
}

const Profile: NextPage<IProps> = ({ pageData }) => {
  const { furniture } = pageData

  const fileProps: IFile = {
    file: null,
    url: null,
    isTouched: false
  }

  const tabs = ['personal', 'orders'] as const

  const nameProps: IField = {
    value: '',
    customPlaceholder: 'Name',
    labelClass: 'newproduct__subtitle',
    isValid: false,
    required: true,
    type: 'text',
    className: 'profile__form-block relative',
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
    customPlaceholder: 'Surname',
    labelClass: 'newproduct__subtitle',
    isValid: false,
    required: true,
    type: 'text',
    className: 'profile__form-block relative',
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
    customPlaceholder: 'E-mail',
    labelClass: 'newproduct__subtitle',
    isValid: false,
    required: true,
    type: 'email',
    className: 'profile__form-block relative',
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
    required: false,
    labelClass: 'newproduct__subtitle',
    customPlaceholder: 'Phone',
    className: 'profile__form-block relative',
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
    required: false,
    labelClass: 'newproduct__subtitle',
    customPlaceholder: 'City',
    type: 'text',
    showErrors: false,
    className: 'profile__form-block relative',
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
    required: false,
    customPlaceholder: 'Street',
    showErrors: false,
    labelClass: 'newproduct__subtitle',
    className: 'profile__form-block relative',
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
    required: false,
    labelClass: 'newproduct__subtitle',
    customPlaceholder: 'House',
    showErrors: false,
    className: 'profile__form-block relative',
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
    required: false,
    labelClass: 'newproduct__subtitle',
    customPlaceholder: 'Apartment',
    showErrors: false,
    className: 'profile__form-block relative',
    inputClassName: 'form-input',
    errorMessage: '',
    isTouched: false,
    getErrorMessage: getTextInputErrorMessage,
    validateFn: validateTextInput
  }

  const dispatch = useDispatch()
  const isNotMobile = useScreenSize(SCREEN_SIZES.tablet)
  const router = useRouter()

  const user = useSelector(getUserData)

  const collectedOrders: IOrderToRender[] = []

  user.orders.forEach((order) => {
    const furnituresInOrder: IProductInOrder[] = []

    order.items.forEach((item) => {
      const product = furniture.find((p) => p.id === item.furnitureId)
      if (!product) {
        return
      }

      const currentPrice =
        typeof product.priceNew === 'string' && product.priceNew
          ? parseFloat(product.priceNew)
          : typeof product.priceOld === 'string' && product.priceOld
          ? parseFloat(product.priceOld)
          : null

      furnituresInOrder.push({
        id: product.id,
        name: product.name ?? '',
        image: product.image,
        quintity: item.quintity,
        color: item.color,
        price: currentPrice
      })
    })

    collectedOrders.push({
      ...order,
      products: furnituresInOrder
    })
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
    (props) => props.isTouched
  )

  React.useEffect(() => {
    if (!user.isLoggedIn) {
      router.push(ROUTES.Login)
    }
  }, [user.isLoggedIn])

  React.useEffect(() => {
    if (!user.isLoggedIn) {
      return
    }
    if (user.decidedOnWantsToReceiveEmailUpdates === true) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      document.body.classList.add('lock')
      setModalLoginOpened(true)
    }, 3000)

    return () => window.clearTimeout(timeoutId)
  }, [user])

  React.useEffect(() => {
    const tabParam = getQueryParams('tab')
    if (tabParam === 'orders' || tabParam === 'personal') {
      setActiveTab(tabParam)
    }
  }, [])

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
    (setState: React.Dispatch<React.SetStateAction<IField>>, originalvalue: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.target
      setState((prev) => ({
        ...prev,
        value: value,
        isValid: prev.validateFn(value),
        showErrors: true,
        isTouched: value !== originalvalue
      }))
    }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (!isAnyFieldTouched) {
      return
    }

    if (name.required && !name.isValid) {
      setName({ ...name, showErrors: true })
      return
    }

    if (surname.required && !surname.isValid) {
      setSurname({ ...surname, showErrors: true })
      return
    }

    if (
      ![email, phone, city, street, house].every((props) => {
        return props.required ? props.isValid : true
      })
    ) {
      return
    }

    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('surname', surname.value)
    if (validateTextInput(email.value)) {
      formData.append('email', email.value)
    }
    if (validateTextInput(phone.value)) {
      formData.append('phone', phone.value)
    }
    formData.append('city', city.value)
    formData.append('street', street.value)
    formData.append('house', house.value)
    formData.append('apartment', apartment.value)

    if (profilePicture.file) {
      const copiedFile = new File([profilePicture.file], slugify(profilePicture.file.name, { replacement: '_' }), {
        type: profilePicture.file.type,
        lastModified: profilePicture.file.lastModified
      })

      formData.append('image', copiedFile)
    }

    document.body.classList.add('lock')
    setIsLoading(true)

    try {
      const dto = await UserApiClient.updateUserData(formData)
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
    } catch (error) {
      setIsLoading(false)
      document.body.classList.remove('lock')
      dispatch(toggleSnackbarOpen())
    }
  }

  const onCancelOrder = (orderId: number) => async () => {
    try {
      const dto = await UserApiClient.cancelOrder(orderId)
      if (!isSuccessfullResponse(dto)) {
        return dispatch(toggleSnackbarOpen())
      }

      const candidate = user.orders.find((o) => o.id === orderId)
      if (!candidate) {
        return
      }

      const payload = Object.assign(candidate, {
        status: 'CANCELED'
      })
      dispatch(editOrderActionCreator(payload))
    } catch (error) {
      dispatch(toggleSnackbarOpen())
    }
  }

  const onTab = (tab: 'personal' | 'orders') => () => {
    setActiveTab(tab)
  }

  const onLoginModalClose = () => {
    setModalLoginOpened(false)
    document.body.classList.remove('lock')
  }

  const showErrors = (props: IField) => {
    return props.showErrors && !props.isValid && (props.required || validateTextInput(props.value))
  }

  const resetEdits = () => {
    setProfilePicture({
      isTouched: false,
      file: null,
      url: user.image?.url ?? null
    })
    setName((prev) => ({
      ...prev,
      value: user.name,
      isTouched: false,
      isValid: prev.validateFn(user.name)
    }))

    setSurname((prev) => ({
      ...prev,
      value: user.surname,
      isTouched: false,
      isValid: prev.validateFn(user.surname)
    }))

    setEmail((prev) => ({
      ...prev,
      value: user.email,
      isTouched: false,
      isValid: prev.validateFn(user.email)
    }))

    setPhone((prev) => ({
      ...prev,
      value: user.phone,
      isTouched: false,
      isValid: prev.validateFn(user.phone)
    }))

    setCity((prev) => ({
      ...prev,
      value: user.city,
      isTouched: false,
      isValid: prev.validateFn(user.city)
    }))
    setStreet((prev) => ({
      ...prev,
      value: user.street,
      isTouched: false,
      isValid: prev.validateFn(user.street)
    }))

    setHouse((prev) => ({
      ...prev,
      value: user.house,
      isTouched: false,
      isValid: prev.validateFn(user.house)
    }))
    setApartment((prev) => ({
      ...prev,
      value: user.apartment,
      isTouched: false,
      isValid: prev.validateFn(user.apartment)
    }))
  }

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles[0]) {
      return
    }
    if (acceptedFiles[0].type === 'image/jpeg' || acceptedFiles[0].type === 'image/png') {
      const reader = new FileReader()
      reader.readAsDataURL(acceptedFiles[0])
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setProfilePicture({
          file: acceptedFiles[0] ?? null,
          url: e.target ? (typeof e.target.result === 'string' ? e.target.result : null) : null,
          isTouched: true
        })
      }
    } else {
      return dispatch(toggleSnackbarOpen('You can attach .png or .jpg images only.'))
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const logUserOut = async () => {
    await UserApiClient.logout()
    dispatch(logoutUserActionCreator())
    router.push('/')
  }

  return user.isLoggedIn ? (
    <>
      {isLoading && <Loader rootElClass='loader--fixed' />}

      {modalLoginOpened && <EmailsUpdatesModal onModalClose={onLoginModalClose} />}

      <section className='profile'>
        <div className='container'>
          <div className='profile__inner'>
            <div className='profile__controls flex'>
              <div className='flex gap-20'>
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
                  onClick={logUserOut}
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
                  <h3 className='profile__title'>Profile</h3>
                  <form className='profile__form grid mt-30'>
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
                              alt='Profile avatar'
                            />
                          </div>
                        ) : (
                          <div className='flex'>
                            <img
                              className='profile__picture-stub'
                              src='/images/user-stub.jpg'
                              alt=''
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <AppTextField
                        elementType={name.tag}
                        placeholder={name.placeholder}
                        name='name'
                        type={name.type}
                        value={name.value}
                        required={name.required}
                        rootElclass={name.className}
                        customPlaceholder={name.customPlaceholder}
                        labelClass={name.labelClass}
                        inputWrapClass={name.inputWrapClass}
                        inputClassName={name.inputClassName}
                        showErrors={showErrors(name)}
                        errorMessage={name.getErrorMessage(name.value, name.customPlaceholder)}
                        onChange={onChange(setName, user.name)}
                      />
                      <AppTextField
                        elementType={surname.tag}
                        placeholder={surname.placeholder}
                        name='surname'
                        type={surname.type}
                        value={surname.value}
                        required={surname.required}
                        rootElclass={surname.className}
                        customPlaceholder={surname.customPlaceholder}
                        labelClass={surname.labelClass}
                        inputWrapClass={surname.inputWrapClass}
                        inputClassName={surname.inputClassName}
                        showErrors={showErrors(surname)}
                        errorMessage={surname.getErrorMessage(surname.value, surname.customPlaceholder)}
                        onChange={onChange(setSurname, user.surname)}
                      />
                      <AppTextField
                        elementType={email.tag}
                        placeholder={email.placeholder}
                        name='email'
                        type={email.type}
                        value={email.value}
                        required={email.required}
                        rootElclass={email.className}
                        customPlaceholder={email.customPlaceholder}
                        labelClass={email.labelClass}
                        inputWrapClass={email.inputWrapClass}
                        inputClassName={email.inputClassName}
                        showErrors={showErrors(email)}
                        errorMessage={email.getErrorMessage(email.value, email.customPlaceholder)}
                        onChange={onChange(setEmail, user.email)}
                      />
                      <AppTextField
                        elementType={phone.tag}
                        placeholder={phone.placeholder}
                        name='phone'
                        type={phone.type}
                        value={phone.value}
                        required={phone.required}
                        rootElclass={phone.className}
                        customPlaceholder={phone.customPlaceholder}
                        labelClass={phone.labelClass}
                        inputWrapClass={phone.inputWrapClass}
                        inputClassName={phone.inputClassName}
                        showErrors={showErrors(phone)}
                        errorMessage={phone.getErrorMessage(phone.value, phone.customPlaceholder)}
                        onChange={onChange(setPhone, user.phone)}
                      />
                      <AppTextField
                        elementType={city.tag}
                        placeholder={city.placeholder}
                        name='city'
                        type={city.type}
                        value={city.value}
                        required={city.required}
                        rootElclass={city.className}
                        customPlaceholder={city.customPlaceholder}
                        labelClass={city.labelClass}
                        inputWrapClass={city.inputWrapClass}
                        inputClassName={city.inputClassName}
                        showErrors={showErrors(city)}
                        errorMessage={city.getErrorMessage(city.value, city.customPlaceholder)}
                        onChange={onChange(setCity, user.city)}
                      />
                      <AppTextField
                        elementType={street.tag}
                        placeholder={street.placeholder}
                        name='street'
                        type={street.type}
                        value={street.value}
                        required={street.required}
                        rootElclass={street.className}
                        customPlaceholder={street.customPlaceholder}
                        labelClass={street.labelClass}
                        inputWrapClass={street.inputWrapClass}
                        inputClassName={street.inputClassName}
                        showErrors={showErrors(street)}
                        errorMessage={street.getErrorMessage(street.value, street.customPlaceholder)}
                        onChange={onChange(setStreet, user.street)}
                      />

                      <AppTextField
                        elementType={house.tag}
                        placeholder={house.placeholder}
                        name='house'
                        type={house.type}
                        value={house.value}
                        required={house.required}
                        rootElclass={house.className}
                        customPlaceholder={house.customPlaceholder}
                        labelClass={house.labelClass}
                        inputWrapClass={house.inputWrapClass}
                        inputClassName={house.inputClassName}
                        showErrors={showErrors(house)}
                        errorMessage={house.getErrorMessage(house.value, house.customPlaceholder)}
                        onChange={onChange(setHouse, user.house)}
                      />
                      <AppTextField
                        elementType={apartment.tag}
                        placeholder={apartment.placeholder}
                        name='apartment'
                        type={apartment.type}
                        value={apartment.value}
                        required={apartment.required}
                        rootElclass={apartment.className}
                        customPlaceholder={apartment.customPlaceholder}
                        labelClass={apartment.labelClass}
                        inputWrapClass={apartment.inputWrapClass}
                        inputClassName={apartment.inputClassName}
                        showErrors={showErrors(apartment)}
                        errorMessage={apartment.getErrorMessage(apartment.value, apartment.customPlaceholder)}
                        onChange={onChange(setApartment, user.apartment)}
                      />

                      <div className='flex items-center gg30 mt-30'>
                        <Button
                          title='Edit'
                          className='profile__check btn-hollow relative'
                          disabled={!isAnyFieldTouched}
                          type='button'
                          onClick={handleSubmit}
                        >
                          <>
                            <Check
                              className='profile__cancel-check'
                              stroke={isAnyFieldTouched ? '#209cee' : 'grey'}
                            />
                            {isNotMobile ? 'Update' : ''}
                          </>
                        </Button>

                        <Button
                          title='Cancel edtis'
                          className='profile__cancel flex items-center justify-center relative'
                          type='button'
                          disabled={!isAnyFieldTouched}
                          onClick={resetEdits}
                        >
                          <>
                            <Cross
                              fill={isAnyFieldTouched ? '#D41367' : 'grey'}
                              className='profile__cancel-cross'
                            />
                            {isNotMobile ? 'Cancel' : ''}
                          </>
                        </Button>
                      </div>
                    </div>
                  </form>
                </>
              )}

              {activeTab === 'orders' ? (
                <>
                  {collectedOrders.length ? (
                    <div className='profile__orders orders'>
                      <h3 className='profile__title'>My orders: {collectedOrders.length}</h3>
                      <div className='mt-30'>
                        {collectedOrders.map(({ id, name, status, createdAt, products }) => (
                          <div
                            className='mt-10'
                            key={id}
                          >
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
                              <p className='profile__order-name profile__order-name--right'>
                                {new Date(createdAt).toLocaleDateString()}
                              </p>
                            </div>

                            {products.length > 0 ? (
                              <div className='profile__table grid items-center mt-10'>
                                <p className='profile__table-cell'>Product</p>
                                <p className='profile__table-cell'>Price</p>
                                <p className='profile__table-cell'>Quintity</p>
                                <p className='profile__table-cell'>Color</p>
                                {products.map(({ id, name, image, color, quintity, price }) => (
                                  <React.Fragment key={id}>
                                    <div className='profile__table-cell'>
                                      <Link href={`/products/${id}`}>
                                        <a className='flex items-center'>
                                          <img
                                            className='profile__table-image'
                                            src={image ? process.env.NEXT_PUBLIC_BACKEND + image.url : ''}
                                            alt=''
                                          />

                                          <p>{name}</p>
                                        </a>
                                      </Link>
                                    </div>
                                    <div className='profile__table-cell flex items-center'>
                                      <p>{typeof price === 'number' ? '$' + price * quintity : 'N/A'}</p>
                                    </div>
                                    <div className='profile__table-cell flex items-center'>
                                      <p>{quintity}</p>
                                    </div>
                                    <div className='profile__table-cell flex items-center'>
                                      <p>
                                        <span
                                          className='profile__table-color colors__checkbox-fake'
                                          style={{ backgroundColor: color ? color : '#fff' }}
                                        />
                                      </p>
                                    </div>
                                  </React.Fragment>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Empty text='You have no orders yet' />
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <Login />
  )
}

export const getStaticProps: GetStaticProps<IProps> = async () => {
  let allProducts: IProcessedFurniture[] = []
  try {
    const furniture = await PublicApiClient.getFurniture('')
    if (isDataOfFurniture(furniture)) {
      allProducts = furniture.all.map(sanitizeFurnitureItem)
    }
  } catch (error) {
    console.log('error')
  }

  return {
    props: {
      pageData: {
        furniture: allProducts
      }
    },
    revalidate
  }
}

export default Profile
