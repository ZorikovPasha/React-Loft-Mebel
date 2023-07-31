import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { authActionCreator } from '../redux/actions/authAction'
import { UserApiClient } from '../api'
import { ModalInfo } from '../components/common/ModalInfo'
import { IField } from './SignUp'
import { getPasswordFieldErrorMessage, validateEmail, validatePassword } from '../utils'
import AppTextField from '../components/common/appTextField'

const Login: React.FC = () => {
  const dispatch = useDispatch()

  const history = useHistory()

  const loginErrorMessage = React.useRef('')

  const _fields = React.useRef<Record<string, IField>>({
    email: {
      tag: 'input',
      value: '',
      label: 'Электронная почта',
      labelClass: 'login__form-label form-label',
      isValid: false,
      required: true,
      type: 'email',
      placeholder: 'Введите электронную почту',
      className: 'form-block',
      inputClassName: 'login__form-input form-input',
      showErrors: false,
      getErrorMessage: (str: string) => (str.trim().length === 0 ? 'Пожалуйста, заполните email' : validateEmail(str) ? 'Введите корректный email' : ''),
      validateFn: validateEmail
    },
    password: {
      value: '',
      label: 'Пароль',
      labelClass: 'login__form-label form-label',
      isValid: false,
      required: true,
      type: 'text',
      placeholder: 'Введите пароль',
      className: 'form-block',
      inputClassName: 'login__form-input form-input',
      tag: 'input',
      showErrors: false,
      getErrorMessage: getPasswordFieldErrorMessage,
      validateFn: validatePassword
    }
  } as const)

  const [form, setForm] = React.useState(_fields.current)
  const [modalVisible, setModalVisible] = React.useState(false)

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
      const { token, message } = data
      if (message) {
        loginErrorMessage.current = message
        document.documentElement.classList.add('lock')
        setModalVisible(true)
      }

      if (token) {
        UserApiClient.setToken(token)
        dispatch(authActionCreator(true))
        history.push({ pathname: '/' })
      }
    })
  }

  const onModalClose: React.MouseEventHandler<HTMLButtonElement> = () => {
    setModalVisible(false)
    document.documentElement.classList.remove('lock')
  }

  return (
    <>
      <div className='login'>
        <div className='container'>
          <div className='login__inner'>
            <h1 className='login__title'>Авторизация</h1>
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
      {modalVisible && (
        <ModalInfo
          title='Оошибка при логине'
          text={loginErrorMessage.current}
          onModalClose={onModalClose}
        />
      )}
    </>
  )
}

export default Login
