import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { UserApiClient } from '../api'
import { IField } from './SignUp'
import {
  getEmailInputErrorMessage,
  getPasswordFieldErrorMessage,
  sanitizeUserRes,
  validateEmail,
  validatePassword
} from '../utils'
import AppTextField from '../components/common/appTextField'
import { ROUTES } from '../utils/const'
import { isILogin400, isSuccessfullLoginResponse } from '../api/types'
import { loginUserActionCreator } from '../redux/actions/userAction'
import { getUserData } from '../redux/getters'
import { toggleSnackbarOpen } from '../redux/actions/errors'
import { Button } from '../components/common/Button'
import { Loader } from '../components/common/Loader'
import { Yandex } from '../svg/yandex-logo'

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
      [name]: Object.assign(prev[name], {
        value: target.value,
        isValid: prev[name].validateFn(target.value),
        errorMessage: prev[name].getErrorMessage(target.value),
        showErrors: true
      })
    }))
  }

  const yandexAuthLink = `${import.meta.env.VITE_BACKEND}/auth/login/yandex`

  const handleSubmit: React.MouseEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    setForm((prev) => {
      return Object.entries(prev).reduce(
        (accum, [key, props]) => ({
          ...accum,
          [key]: Object.assign(props, {
            showErrors: true
          })
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
    try {
      const response = await UserApiClient.login(dto)

      setIsLoading(false)
      if (isILogin400(response)) {
        setForm((prev) => ({
          email: Object.assign(prev.email, {
            isValid: false,
            errorMessage: response.message
          }),
          password: Object.assign(prev.password, {
            isValid: false,
            errorMessage: response.message
          })
        }))
        return
      }

      if (isSuccessfullLoginResponse(response)) {
        setForm(fields.current)
        localStorage.setItem('loft_furniture_token', response.token)
        const payload = sanitizeUserRes(response.user)
        dispatch(loginUserActionCreator(payload))
        history.push({ pathname: ROUTES.Profile })
        return
      }

      if (response.statusCode === 500) {
        dispatch(toggleSnackbarOpen())
      }
    } catch (error) {
      setIsLoading(false)
      dispatch(toggleSnackbarOpen())
    }
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
            className='login__form mt-40'
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

          <a
            href={yandexAuthLink}
            className='login__form-btn--yandex flex items-center justify-center btn mt-20 w100'
          >
            <Yandex className='login__form-logo' />
            <span className='block'>Log in via Yandex</span>
          </a>
        </div>
        <div className='login__bottom mt-30'>
          <span className='login__new'>Dont have an account? </span>
          <Link
            className='login__new-link'
            to={ROUTES.Signup}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
