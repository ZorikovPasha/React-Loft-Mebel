import React from 'react'
import { useDispatch } from 'react-redux'

import { useBreadcrumbs } from '../hooks/useBreadcrumbs'
import { UserApiClient } from '../api'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { IField } from './SignUp'
import { getEmailInputErrorMessage, getTextInputErrorMessage, validateEmail, validateTextInput } from '../utils'
import AppTextField from '../components/common/appTextField'
import { isSuccessfullResponse } from '../api/types'
import { Modal } from '../components/common/Modal'
import { toggleSnackbarOpen } from '../redux/actions/errors'
import { Button } from '../components/common/Button'

const ModalContent = () => {
  return (
    <>
      <h3 className='popup-message__title'>Your request has been send!</h3>
      <p className='popup-message__text'>We well reach out to in a close future!</p>
    </>
  )
}

type FieldsNames = 'name' | 'email' | 'message'

const Contacts = () => {
  const fields = React.useRef<Record<FieldsNames, IField>>({
    name: {
      value: '',
      label: 'Your name',
      labelClass: 'form__label',
      isValid: false,
      required: true,
      type: 'text',
      placeholder: 'Type your name',
      inputClassName: 'form-input',
      tag: 'input',
      showErrors: false,
      errorMessage: getTextInputErrorMessage(''),
      getErrorMessage: getTextInputErrorMessage,
      validateFn: validateTextInput
    },
    email: {
      tag: 'input',
      value: '',
      label: 'Your e-mail',
      labelClass: 'form__label',
      isValid: false,
      required: true,
      type: 'email',
      placeholder: 'Your e-mail',
      className: 'mt-30',
      inputClassName: 'form-input',
      showErrors: false,
      errorMessage: getEmailInputErrorMessage(''),
      getErrorMessage: getEmailInputErrorMessage,
      validateFn: validateEmail
    },
    message: {
      value: '',
      label: 'Your message',
      labelClass: 'form__label',
      className: 'mt-30',
      isValid: false,
      required: true,
      type: 'text',
      placeholder: 'Type your message',
      inputClassName: 'form-input',
      tag: 'textarea',
      showErrors: false,
      errorMessage: getTextInputErrorMessage(''),
      getErrorMessage: getTextInputErrorMessage,
      validateFn: validateTextInput
    }
  } as const)

  const dispatch = useDispatch()

  const [isModalOpened, setModalOpened] = React.useState(false)
  const [form, setForm] = React.useState(fields.current)
  const { name, email, message } = form

  const breadcrumbs = useBreadcrumbs()
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const onModalClose = () => {
    document.body.classList.remove('lock')
    setModalOpened(false)
  }

  const onChange = (name: FieldsNames) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => {
      const props = prev[name]
      if (!props) {
        return prev
      }

      return {
        ...prev,
        [name]: Object.assign(props, {
          value: e.target.value,
          isValid: props.validateFn(e.target.value),
          showErrors: true
        })
      }
    })
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    Object.values(form).forEach((props) => {
      props.showErrors = true
    })

    if (!Object.values(form).every(({ isValid }) => isValid)) {
      return
    }

    const dto = {
      userName: name.value,
      email: email.value,
      message: message.value
    }
    try {
      const response = await UserApiClient.sendMessage(dto)
      if (isSuccessfullResponse(response)) {
        document.body.classList.add('lock')
        setModalOpened(true)
      }

      dispatch(toggleSnackbarOpen())
    } catch (error) {
      dispatch(toggleSnackbarOpen())
    }
  }

  const showNameInputError = name.showErrors && !name.isValid && (name.required || Boolean(name.value))
  const showEmailInputError = email.showErrors && !email.isValid && (email.required || Boolean(email.value))
  const showMessageInputError = message.showErrors && !message.isValid && (message.required || Boolean(message.value))

  return (
    <>
      {isModalOpened && (
        <Modal
          content={<ModalContent />}
          onModalClose={onModalClose}
        />
      )}
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section className='contacts'>
        <div className='container'>
          <h4 className='contacts__title'>Leave your request here and we will reach out to you as soon as possible!</h4>
          <div className='contacts__inner grid mt-40'>
            <form
              className='contacts__form'
              onSubmit={handleSubmit}
            >
              <AppTextField
                elementType={name.tag}
                placeholder={name.placeholder}
                name='name'
                type={name.type}
                value={name.value}
                required={false}
                rootElclass={name.className}
                label={name.label}
                labelClass={name.labelClass}
                inputWrapClass={name.inputWrapClass}
                inputClassName={name.inputClassName}
                showErrors={showNameInputError}
                errorMessage={name.getErrorMessage(name.value)}
                onChange={onChange('name')}
              />
              <AppTextField
                elementType={email.tag}
                placeholder={email.placeholder}
                name='email'
                type={email.type}
                value={email.value}
                required={false}
                rootElclass={email.className}
                label={email.label}
                labelClass={email.labelClass}
                inputWrapClass={email.inputWrapClass}
                inputClassName={email.inputClassName}
                showErrors={showEmailInputError}
                errorMessage={email.getErrorMessage(name.value)}
                onChange={onChange('email')}
              />
              <AppTextField
                elementType={message.tag}
                placeholder={message.placeholder}
                name='message'
                type={message.type}
                value={message.value}
                required={false}
                rootElclass={message.className}
                label={message.label}
                labelClass={message.labelClass}
                inputWrapClass={message.inputWrapClass}
                inputClassName={message.inputClassName}
                showErrors={showMessageInputError}
                errorMessage={message.getErrorMessage(message.value)}
                onChange={onChange('message')}
              />
              <div className='contacts__form-bottom flex items-center mt-30'>
                <Button
                  title='Submit'
                  className='btn'
                  type='submit'
                >
                  Submit
                </Button>
              </div>
            </form>
            <div>
              <div className='contacts__line flex items-center'>
                <a
                  className='contacts__tel'
                  href='tel:89648999119'
                >
                  8 (964) 89 99 119
                </a>
                <a
                  className='contacts__mail'
                  href='mailto:mebel_loft_la@gmail.com'
                >
                  mebel_loft_la@gmail.com
                </a>
              </div>
              <a
                className='contacts__link mt-20'
                href='https://www.instagram.com/?hl=en'
              >
                INSTAGRAM
              </a>
              <p className='contacts__text mt-20'>4550 W Pico Blvd unit d-101, Los Angeles, CA 90019, United States</p>
            </div>
          </div>
          <h4 className='contacts__title mt-40'>We are at: </h4>
          <div
            className='mt-40'
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11924.956793041905!2d-118.34089996714462!3d34.04931641174938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b8f9d3d4c22b%3A0xccfafde3d3e0445e!2sLowe&#39;s%20Home%20Improvement!5e0!3m2!1sen!2sru!4v1693492192505!5m2!1sen!2sru'
              width='100%'
              height='450'
              allowFullScreen={false}
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contacts
