import React from 'react'
import { useHistory, Redirect, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { UserApiClient } from '../api'
import {
  getEmailInputErrorMessage,
  getPasswordFieldErrorMessage,
  getTextInputErrorMessage,
  validateEmail,
  validatePassword,
  validateTextInput
} from '../utils'
import AppTextField from '../components/common/appTextField'
import { isSuccessfullResponse } from '../api/types'
import { getUserData } from '../redux/getters'
import { ROUTES } from '../utils/const'
import { Modal } from '../components/common/Modal'
import { toggleSnackbarOpen } from '../redux/actions/errors'
import { Button } from '../components/common/Button'

export interface IField {
  value: string
  isValid: boolean
  required: boolean
  type: 'text' | 'email' | 'tel' | 'password'
  placeholder: string
  customPlaceholder?: string
  className?: string
  inputClassName?: string
  tag: 'input' | 'textarea'
  isTouched?: boolean
  getErrorMessage: (st: string) => string
  errorMessage: string
  label?: string
  labelClass?: string
  inputWrapClass?: string
  showErrors: boolean
  validateFn: (str: string) => boolean
}

const ModalContent: React.FC = () => {
  return (
    <>
      <h3 className='popup-message__title'>You successfully signed up</h3>
      <p className='popup-message__text'>Go to log in</p>
      <Link
        to={ROUTES.Login}
        className='popup-message__btn'
      >
        Log in
      </Link>
    </>
  )
}

const SignUp: React.FC = () => {
  const history = useHistory()

  const { isLoggedIn } = useSelector(getUserData)

  const fields = React.useRef<Record<string, IField>>({
    name: {
      value: '',
      label: 'Name',
      labelClass: 'signup__form-label form-label',
      isValid: false,
      required: true,
      type: 'text',
      placeholder: 'Enter your name',
      className: 'mt-20',
      inputClassName: 'signup__form-input form-input',
      tag: 'input',
      showErrors: false,
      errorMessage: getTextInputErrorMessage(''),
      getErrorMessage: (str: string) => (validateTextInput(str) ? '' : 'Пожалуйста, заполните имя'),
      validateFn: validateTextInput
    },
    email: {
      tag: 'input',
      value: '',
      label: 'Email',
      labelClass: 'signup__form-label form-label',
      isValid: false,
      required: true,
      type: 'email',
      placeholder: 'Enter email',
      className: 'mt-20',
      inputClassName: 'signup__form-input form-input',
      showErrors: false,
      errorMessage: getEmailInputErrorMessage(''),
      getErrorMessage: (str: string) =>
        str.trim().length === 0 ? 'Пожалуйста, заполните email' : validateEmail(str) ? 'Введите корректный email' : '',
      validateFn: validateEmail
    },
    password: {
      value: '',
      label: 'Password',
      labelClass: 'signup__form-label form-label',
      isValid: false,
      required: true,
      type: 'password',
      placeholder: 'Enter password',
      className: 'mt-20',
      inputClassName: 'signup__form-input form-input',
      tag: 'input',
      showErrors: false,
      errorMessage: getPasswordFieldErrorMessage(''),
      getErrorMessage: getPasswordFieldErrorMessage,
      validateFn: validatePassword
    }
  } as const)

  const dispatch = useDispatch()

  const [modalSignUp, setModalSignUp] = React.useState(false)
  const [form, setForm] = React.useState(fields.current)

  const onChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    setForm((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        isValid: prev[name].validateFn(value),
        showErrors: true
      }
    }))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
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

    if (!Object.values(form).every(({ isValid }) => isValid)) {
      return
    }

    const dto = {
      userName: form.name.value,
      email: form.email.value,
      password: form.password.value
    }

    UserApiClient.register(dto)
      .then((data) => {
        if (!isSuccessfullResponse(data)) {
          return dispatch(toggleSnackbarOpen())
        }
        document.documentElement.classList.add('lock')
        setModalSignUp(true)
      })
      .catch(() => {
        dispatch(toggleSnackbarOpen())
      })
  }

  const onModalClose = () => {
    history.push({ pathname: ROUTES.Login })
    document.documentElement.classList.remove('lock')
    setModalSignUp(false)
  }

  return isLoggedIn ? (
    <Redirect to={ROUTES.Profile} />
  ) : (
    <>
      <div className='signup'>
        <div className='container'>
          <div className='signup__inner'>
            <h1 className='signup__title'>Sign up</h1>

            <form
              className='signup__form from'
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
                  inputWrapClass,
                  inputClassName,
                  getErrorMessage,
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
                    errorMessage={getErrorMessage(value)}
                    onChange={onChange(key)}
                  />
                )
              })}
              <Button
                title='Sign up'
                type='submit'
                className='signup__form-btn btn mt-20'
              >
                Sign up
              </Button>
            </form>
          </div>
        </div>
      </div>
      {modalSignUp && (
        <Modal
          content={<ModalContent />}
          onModalClose={onModalClose}
        />
      )}
    </>
  )
}

export default SignUp
