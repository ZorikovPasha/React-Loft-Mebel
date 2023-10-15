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
import { isRegisterUser200, isRes500 } from '../api/types'
import { getUserData } from '../redux/getters'
import { ROUTES } from '../utils/const'
import { Modal } from '../components/common/Modal'
import { toggleSnackbarOpen } from '../redux/actions/errors'
import { Button } from '../components/common/Button'
import { Loader } from '../components/common/Loader'

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
    <div className='flex items-center flex-col'>
      <h3 className='popup-message__title'>You successfully signed up</h3>
      <div className='popup__picture'>
        <img
          src='/images/success.png'
          alt=''
        />
      </div>
      <Link
        to={ROUTES.Login}
        className='popup-message__btn btn mt-5'
      >
        Log in
      </Link>
    </div>
  )
}

const SignUp = () => {
  const history = useHistory()

  const { isLoggedIn } = useSelector(getUserData)

  const fields = React.useRef<Record<string, IField>>({
    userName: {
      value: '',
      label: 'Name',
      labelClass: 'signup__form-label form-label',
      required: true,
      isValid: false,
      type: 'text',
      placeholder: 'Enter your name',
      className: 'mt-20',
      inputClassName: 'signup__form-input form-input',
      tag: 'input',
      showErrors: false,
      errorMessage: getTextInputErrorMessage(''),
      getErrorMessage: getTextInputErrorMessage,
      validateFn: validateTextInput
    },
    email: {
      tag: 'input',
      value: '',
      label: 'Email',
      labelClass: 'signup__form-label form-label',
      required: true,
      isValid: false,
      type: 'email',
      placeholder: 'Enter email',
      className: 'mt-20',
      inputClassName: 'signup__form-input form-input',
      showErrors: false,
      errorMessage: getEmailInputErrorMessage(''),
      getErrorMessage: getEmailInputErrorMessage,
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
  const [isLoading, setIsLoading] = React.useState(false)

  const onChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    setForm((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        isValid: prev[name].validateFn(value),
        showErrors: true,
        errorMessage: prev[name].getErrorMessage(value)
      }
    }))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    Object.keys(form).forEach((key) => {
      form[key].showErrors = true
    })
    setForm({ ...form })

    if (!Object.values(form).every(({ isValid }) => isValid)) {
      return
    }

    const dto = {
      userName: form.userName.value,
      email: form.email.value,
      password: form.password.value
    }

    setIsLoading(true)
    UserApiClient.register(dto)
      .then((data) => {
        setIsLoading(false)
        if (isRes500(data)) {
          dispatch(toggleSnackbarOpen())
          return
        }

        if (isRegisterUser200(data)) {
          document.documentElement.classList.add('lock')
          setModalSignUp(true)
          return
        }

        if (data.statusCode === 400) {
          if (typeof data.message === 'string') {
            // User already exists

            form.email.errorMessage = data.message
            setForm({ ...form })
          } else {
            const errorData: Record<string, string> = {}
            data.message.forEach((message: string) => {
              const fieldName = message.split(' ')[0]
              errorData[fieldName] = message
            })

            setForm((prev) => {
              const newFormState: Record<string, IField> = {}
              Object.entries(prev).forEach(([key]) => {
                if (errorData[key]) {
                  newFormState[key] = {
                    ...prev[key],
                    isValid: false,
                    showErrors: true,
                    errorMessage: errorData[key]
                  }
                } else {
                  newFormState[key] = prev[key]
                }
              })

              return newFormState
            })
          }

          return
        }

        dispatch(toggleSnackbarOpen())
      })
      .catch(() => {
        setIsLoading(false)
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
      {isLoading && <Loader rootElClass='loader--fixed' />}

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
                  errorMessage,
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
                    inputClassName={inputClassName}
                    showErrors={_showErrors}
                    errorMessage={errorMessage}
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

            <div className='login__bottom mt-30'>
              <span className='login__new'>Already have an account? </span>
              <Link
                className='login__new-link'
                to={ROUTES.Login}
              >
                Log in
              </Link>
            </div>
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
