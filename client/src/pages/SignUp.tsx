import React from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ModalInfo } from '../components/common/ModalInfo'
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

const SignUp: React.FC = () => {
  const history = useHistory()

  const { isLoggedIn } = useSelector(getUserData)

  const fields = React.useRef<Record<string, IField>>({
    name: {
      value: '',
      label: 'Имя пользователя',
      labelClass: 'signup__form-label form-label',
      isValid: false,
      required: true,
      type: 'text',
      placeholder: 'Введите Имя пользователя',
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
      label: 'Электронная почта',
      labelClass: 'signup__form-label form-label',
      isValid: false,
      required: true,
      type: 'email',
      placeholder: 'Введите электронную почту',
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
      label: 'Пароль',
      labelClass: 'signup__form-label form-label',
      isValid: false,
      required: true,
      type: 'text',
      placeholder: 'Введите пароль',
      className: 'mt-20',
      inputClassName: 'signup__form-input form-input',
      tag: 'input',
      showErrors: false,
      errorMessage: getPasswordFieldErrorMessage(''),
      getErrorMessage: getPasswordFieldErrorMessage,
      validateFn: validatePassword
    }
  } as const)

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

    if (!Object.values(form).every(({ isValid }) => isValid)) {
      return
    }

    const dto = {
      userName: form.name.value,
      email: form.email.value,
      password: form.password.value
    }

    UserApiClient.register(dto).then((data) => {
      if (!isSuccessfullResponse(data)) {
        return
      }
      document.documentElement.classList.add('lock')
      setModalSignUp(true)
    })
  }

  const onModalClose: React.MouseEventHandler<HTMLButtonElement> = () => {
    history.push({ pathname: '/login' })
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
            <h1 className='signup__title'>Регистрация</h1>

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
                    inputClassName={`${inputClassName} ${_showErrors ? 'input-text--error' : ''}`}
                    showErrors={_showErrors}
                    errorMessage={getErrorMessage(value)}
                    onChange={onChange(key)}
                  />
                )
              })}
              <button
                type='submit'
                className='signup__form-btn btn mt-20'
              >
                Зарегистрироваться
              </button>
            </form>
          </div>
        </div>
      </div>
      {modalSignUp && (
        <ModalInfo
          hasButton={true}
          title='Вы успешно зарегистрировались'
          text='Перейти ко входу..'
          onModalClose={onModalClose}
        />
      )}
    </>
  )
}

export default SignUp
