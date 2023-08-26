import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { UserApiClient } from '../api'
import { IField } from './SignUp'
import { getEmailInputErrorMessage, getPasswordFieldErrorMessage, validateEmail, validatePassword } from '../utils'
import AppTextField from '../components/common/appTextField'
import { ROUTES } from '../utils/const'
import { isResponseWithErrors, isSuccessfullLoginResponse } from '../api/types'
import { loginUserActionCreator } from '../redux/actions/userAction'
import { getUserData } from '../redux/getters'

const Login: React.FC = () => {
  const dispatch = useDispatch()

  const { isLoggedIn } = useSelector(getUserData)
  const history = useHistory()

  const fields = React.useRef<Record<string, IField>>({
    email: {
      tag: 'input',
      value: '',
      label: 'Электронная почта',
      labelClass: 'form__label',
      isValid: false,
      required: true,
      type: 'email',
      placeholder: 'Введите электронную почту',
      className: 'form-block',
      inputClassName: 'form-input',
      showErrors: false,
      errorMessage: getEmailInputErrorMessage(''),
      getErrorMessage: getEmailInputErrorMessage,
      validateFn: validateEmail
    },
    password: {
      value: '',
      label: 'Пароль',
      labelClass: 'form__label',
      isValid: false,
      required: true,
      type: 'password',
      placeholder: 'Введите пароль',
      className: 'form-block',
      inputClassName: 'form-input',
      tag: 'input',
      showErrors: false,
      errorMessage: getPasswordFieldErrorMessage(''),
      getErrorMessage: getPasswordFieldErrorMessage,
      validateFn: validatePassword
    }
  } as const)

  const [form, setForm] = React.useState(fields.current)

  const onChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target
    setForm((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: target.value,
        isValid: prev[name].validateFn(target.value),
        errorMessage: prev[name].getErrorMessage(target.value),
        showErrors: true
      }
    }))
  }

  const handleSubmit: React.MouseEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (!Object.values(form).every(({ isValid }) => isValid)) {
      return
    }

    const dto = {
      email: form.email.value,
      password: form.password.value
    }

    UserApiClient.login(dto).then((data) => {
      if (isResponseWithErrors(data)) {
        data.errors?.forEach((error) => {
          if (error.field === 'email') {
            setForm((prev) => ({
              ...prev,
              email: {
                ...prev.email,
                isValid: false,
                errorMessage: error.message ?? ''
              }
            }))
          }
          if (error.field === 'password') {
            setForm((prev) => ({
              ...prev,
              password: {
                ...prev.password,
                isValid: false,
                errorMessage: error.message ?? ''
              }
            }))
          }
        })
      }

      if (isSuccessfullLoginResponse(data)) {
        setForm(fields.current)
        localStorage.setItem('loft_furniture_token', data.token)
        const {
          id,
          name,
          email,
          surname,
          phone,
          city,
          street,
          house,
          apartment,
          orders,
          image,
          emailConfirmed,
          favorites,
          wantsToReceiveEmailUpdates,
          cart,
          updatedAt,
          createdAt
        } = data.user

        const processedOrders =
          orders?.map((o) => ({
            id: o.id,
            userId: o.userId,
            name: o.name,
            status: o.status,
            createdAt: o.createdAt,
            updatedAt: o.updatedAt,
            items: o.items ?? []
          })) ?? []
        const payload = {
          id: id,
          isLoggedIn: true,
          name: name,
          email: email,
          surname: surname,
          phone: phone,
          city: city,
          street: street,
          house: house,
          apartment: apartment,
          image: image
            ? {
                name: image.name,
                url: import.meta.env.VITE_BACKEND + image.url
              }
            : null,
          emailConfirmed: emailConfirmed,
          wantsToReceiveEmailUpdates: wantsToReceiveEmailUpdates,
          createdAt: createdAt,
          updatedAt: updatedAt,
          favorites: favorites ?? [],
          orders: processedOrders,
          cart: cart ?? []
        }
        dispatch(loginUserActionCreator(payload))
        history.push({ pathname: ROUTES.Profile })
      }
    })
  }

  return isLoggedIn ? (
    <Redirect to={ROUTES.Profile} />
  ) : (
    <div className='login'>
      <div className='container'>
        <div className='login__inner'>
          <h1 className='login__title'>Login</h1>
          <form
            className='login__form form'
            onSubmit={handleSubmit}
          >
            {Object.entries(form).map(([key, props]) => {
              const {
                tag,
                required,
                placeholder,
                type,
                value,
                isValid,
                className,
                label,
                labelClass,
                errorMessage,
                inputWrapClass,
                inputClassName,
                showErrors
              } = props

              const _showErrors = showErrors && !isValid && (required || Boolean(value))
              return (
                <AppTextField
                  elementType={tag}
                  key={key}
                  placeholder={placeholder}
                  name={key as string}
                  type={type}
                  value={value}
                  required={required}
                  rootElclass={className}
                  label={label}
                  labelClass={labelClass}
                  inputWrapClass={inputWrapClass}
                  inputClassName={`${inputClassName} ${_showErrors ? 'form-input--error' : ''}`}
                  showErrors={_showErrors}
                  errorMessage={errorMessage}
                  onChange={onChange(key)}
                />
              )
            })}
            <button
              className='login__form-btn btn'
              type='submit'
            >
              Войти
            </button>
          </form>
        </div>
        <div className='login__bottom'>
          <span className='login__new'>Новый пользователь? </span>
          <Link
            className='login__new-link'
            to='/signup'
          >
            Создать учетную запись
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
