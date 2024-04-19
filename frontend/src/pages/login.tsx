import React from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

import { UserApiClient } from '../api'
import { IField } from './signup'
import {
  getEmailInputErrorMessage,
  getPasswordFieldErrorMessage,
  sanitizeUserRes,
  validateEmail,
  validatePassword
} from '../utils'
import AppTextField from '../components/common/appTextField'
import { ROUTES } from '../utils/const'
import { isILogin400, isRes500, isSuccessfullLoginResponse } from '../api/types'
import { loginUserActionCreator } from '../redux/actions/userAction'
import { toggleSnackbarOpen } from '../redux/actions/errors'
import { Button } from '../components/common/Button'
import { Loader } from '../components/common/Loader'
import { Yandex } from '../svg/yandex-logo'
import Head from 'next/head'

const Login = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const fields = React.useRef<Record<'email' | 'password', IField>>({
    email: {
      tag: 'input',
      value: '',
      customPlaceholder: 'E-mail',
      isValid: false,
      required: true,
      type: 'email',
      className: 'relative',
      inputClassName: 'form-input',
      showErrors: false,
      errorMessage: getEmailInputErrorMessage(''),
      getErrorMessage: getEmailInputErrorMessage,
      validateFn: validateEmail
    },
    password: {
      customPlaceholder: 'Password',
      value: '',
      isValid: false,
      required: true,
      type: 'password',
      className: 'relative mt-30',
      inputClassName: 'form-input',
      tag: 'input',
      showErrors: false,
      errorMessage: getPasswordFieldErrorMessage(''),
      getErrorMessage: getPasswordFieldErrorMessage,
      validateFn: validatePassword
    }
  })

  const [form, setForm] = React.useState(fields.current)
  const [isLoading, setIsLoading] = React.useState(false)

  const onChange = (name: 'email' | 'password') => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target
    setForm((prev) => {
      const props = prev[name]
      if (!props) {
        return prev
      }
      return {
        ...prev,
        [name]: Object.assign(props, {
          value: target.value,
          isValid: props.validateFn(target.value),
          errorMessage: props.getErrorMessage(target.value),
          showErrors: true
        })
      }
    })
  }

  const yandexAuthLink = `${process.env.NEXT_PUBLIC_BACKEND}/auth/login/yandex`

  const handleSubmit: React.MouseEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const newFormState = {
      email: {
        ...form.email,
        showErrors: true
      },
      password: {
        ...form.password,
        showErrors: true
      }
    }

    setForm(newFormState)

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
        const payload = sanitizeUserRes(response.user)
        UserApiClient.applyNewTokenAndReloadRequestInterceptor(response.token)
        dispatch(loginUserActionCreator(payload))
        router.push(ROUTES.Profile)
        return
      }

      if (isRes500(response)) {
        dispatch(toggleSnackbarOpen())
      }
    } catch (error) {
      setIsLoading(false)
      dispatch(toggleSnackbarOpen())
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <meta
          name='description'
          content='Loft furniture for your slick modern designes'
        />
      </Head>
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
                  customPlaceholder,
                  type,
                  value,
                  isValid,
                  className,
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
                    customPlaceholder={customPlaceholder}
                    name={key as string}
                    type={type}
                    value={value}
                    required={false}
                    rootElclass={className}
                    inputWrapClass={inputWrapClass}
                    inputClassName={inputClassName}
                    showErrors={_showErrors}
                    errorMessage={errorMessage}
                    onChange={onChange(key as 'email' | 'password')}
                  />
                )
              })}
              <Button
                title='Log in'
                className='login__form-btn btn mt-40'
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
            <Link href={ROUTES.Signup}>
              <a className='login__new-link'>Sign up</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
