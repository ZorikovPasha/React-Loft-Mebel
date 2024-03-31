import React from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

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
  placeholder?: string
  customPlaceholder?: string
  className?: string
  inputClassName?: string
  tag: 'input' | 'textarea'
  isTouched?: boolean
  getErrorMessage: (value: string, name?: string) => string
  errorMessage: string
  label?: string
  labelClass?: string
  inputWrapClass?: string
  showErrors: boolean
  validateFn: (str: string) => boolean
}

const ModalContent = () => {
  return (
    <div className='flex items-center flex-col'>
      <h3 className='popup-message__title'>You successfully signed up</h3>
      <div className='popup__picture'>
        <img
          src='/images/success.png'
          alt=''
        />
      </div>
      <Link href={ROUTES.Login}>
        <a className='popup-message__btn btn mt-5'>Log in</a>
      </Link>
    </div>
  )
}

const SignUp = () => {
  const router = useRouter()

  const fields = React.useRef<Record<'userName' | 'email' | 'password', IField>>({
    userName: {
      value: '',
      customPlaceholder: 'Name',
      required: true,
      isValid: false,
      type: 'text',
      className: 'mt-30 relative',
      inputClassName: 'signup__form-input form-input',
      tag: 'input',
      showErrors: false,
      errorMessage: getTextInputErrorMessage('', 'Name'),
      getErrorMessage: getTextInputErrorMessage,
      validateFn: validateTextInput
    },
    email: {
      tag: 'input',
      value: '',
      customPlaceholder: 'Email',
      required: true,
      isValid: false,
      type: 'email',
      className: 'mt-30 relative',
      inputClassName: 'signup__form-input form-input',
      showErrors: false,
      errorMessage: getEmailInputErrorMessage(''),
      getErrorMessage: getEmailInputErrorMessage,
      validateFn: validateEmail
    },
    password: {
      value: '',
      customPlaceholder: 'Password',
      isValid: false,
      required: true,
      type: 'password',
      className: 'mt-30 relative',
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

  const onChange =
    (name: keyof typeof fields.current) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value
      setForm((prev) => {
        const props = prev[name]
        if (!props) {
          return prev
        }
        return {
          ...prev,
          [name]: {
            ...props,
            value,
            isValid: props.validateFn(value),
            showErrors: true,
            errorMessage: props.getErrorMessage(value, name)
          }
        }
      })
    }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    Object.values(form).forEach((props) => {
      props.showErrors = true
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
    try {
      const response = await UserApiClient.register(dto)
      setIsLoading(false)
      if (isSuccessfullResponse(response)) {
        document.body.classList.add('lock')
        setModalSignUp(true)
      } else {
        dispatch(toggleSnackbarOpen())
      }

      // if (response.statusCode === 400) {
      //   if (typeof response.message === 'string') {
      //     // User already exists

      //     form.email.errorMessage = response.message
      //     setForm({ ...form })
      //   } else {
      //     const errorData: Record<string, string> = {}
      //     response.message.forEach((message: string) => {
      //       const fieldName = message.split(' ')[0]
      //       if (!fieldName) {
      //         return
      //       }
      //       errorData[fieldName] = message
      //     })

      //     setForm((prev) => {
      //       const newFormState: Record<string, IField> = {}
      //       Object.entries(prev).forEach(([key, props]) => {
      //         const newErrorMessage = errorData[key]
      //         if ((key === 'userName' || key === 'email' || key === 'password') && newErrorMessage) {
      //           newFormState[key] = {
      //             ...prev[key],
      //             isValid: false,
      //             showErrors: true,
      //             errorMessage: newErrorMessage
      //           }
      //         } else {
      //           newFormState[key] = props
      //         }
      //       })

      //       return newFormState
      //     })
      //   }

      //   return
      // }

      dispatch(toggleSnackbarOpen())
    } catch (error) {
      setIsLoading(false)
      dispatch(toggleSnackbarOpen())
    }
  }

  const onModalClose = () => {
    router.push(ROUTES.Login)
    document.body.classList.remove('lock')
    setModalSignUp(false)
  }

  return (
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
                  customPlaceholder,
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
                    required={false}
                    rootElclass={className}
                    customPlaceholder={customPlaceholder}
                    inputWrapClass={inputWrapClass}
                    inputClassName={inputClassName}
                    showErrors={_showErrors}
                    errorMessage={errorMessage}
                    onChange={onChange(key as 'userName' | 'email' | 'password')}
                  />
                )
              })}
              <Button
                title='Sign up'
                type='submit'
                className='signup__form-btn btn mt-40'
              >
                Sign up
              </Button>
            </form>

            <div className='login__bottom mt-20'>
              <span className='login__new'>Already have an account? </span>
              <Link href={ROUTES.Login}>
                <a className='login__new-link'>Log in</a>
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
