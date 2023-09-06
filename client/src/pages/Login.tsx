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
import { toggleSnackbarOpen } from '../redux/actions/errors'
import { Button } from '../components/common/Button'
import { Loader } from '../components/common/Loader'

const Login: React.FC = () => {
  const dispatch = useDispatch()

  const { isLoggedIn } = useSelector(getUserData)
  const history = useHistory()

  const fields = React.useRef<Record<string, IField>>({
    email: {
      tag: 'input',
      value: '',
      label: 'Email',
      labelClass: 'form__label',
      isValid: false,
      required: true,
      type: 'email',
      placeholder: 'Enter email',
      className: 'form-block',
      inputClassName: 'form-input',
      showErrors: false,
      errorMessage: getEmailInputErrorMessage(''),
      getErrorMessage: getEmailInputErrorMessage,
      validateFn: validateEmail
    },
    password: {
      value: '',
      label: 'Password',
      labelClass: 'form__label',
      isValid: false,
      required: true,
      type: 'password',
      placeholder: 'Enter password',
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
  const [isLoading, setIsLoading] = React.useState(false)

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

    setForm((prev) => {
      return Object.entries(prev).reduce(
        (accum, [key, props]) => ({
          ...accum,
          [key]: {
            ...props,
            showErrors: true
          }
        }),
        {}
      )
    })

    if (!Object.values(form).every(({ isValid, required }) => required && isValid)) {
      return
    }

    const dto = {
      email: form.email.value,
      password: form.password.value
    }

    setIsLoading(true)
    UserApiClient.login(dto)
      .then((data) => {
        setIsLoading(false)
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
        } else {
          dispatch(toggleSnackbarOpen())
        }
      })
      .catch(() => {
        setIsLoading(false)
        dispatch(toggleSnackbarOpen())
      })
  }

  return isLoggedIn ? (
    <Redirect to={ROUTES.Profile} />
  ) : (
    <div className='login'>
      {isLoading && <Loader rootElClass='loader--fixed' />}
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
                  required={false}
                  rootElclass={className}
                  label={label}
                  labelClass={labelClass}
                  inputWrapClass={inputWrapClass}
                  inputClassName={inputClassName}
                  showErrors={_showErrors}
                  errorMessage={errorMessage}
                  onChange={onChange(key)}
                />
              )
            })}
            <Button
              title='Log in'
              className='login__form-btn btn'
              type='submit'
            >
              Log in
            </Button>
          </form>
        </div>
        <div className='login__bottom'>
          <span className='login__new'>Dont have an account? </span>
          <Link
            className='login__new-link'
            to='/signup'
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
