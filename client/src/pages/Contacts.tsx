import React from 'react'

import { useBreadcrumbs } from '../hooks/useBreadcrumbs'
import { UserApiClient } from '../api'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { IField } from './SignUp'
import { getEmailInputErrorMessage, getTextInputErrorMessage, validateEmail, validateTextInput } from '../utils'
import AppTextField from '../components/common/appTextField'
import { isSuccessfullResponse } from '../api/types'
import { Modal } from '../components/common/Modal'
import { toggleSnackbarOpen } from '../redux/actions/errors'
import { useDispatch } from 'react-redux'

const ModalContent: React.FC = () => {
  return (
    <>
      <h3 className='popup-message__title'>Сообщение отправлено</h3>
      <p className='popup-message__text'>Мы с вами свяжемся</p>
    </>
  )
}

const Contacts: React.FC = () => {
  const fields = React.useRef<Record<string, IField>>({
    name: {
      value: '',
      label: 'Ваше имя',
      labelClass: 'form__label',
      isValid: false,
      required: true,
      type: 'text',
      placeholder: 'Введите ваше имя',
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
      label: 'Ваш e-mail',
      labelClass: 'form__label',
      isValid: false,
      required: true,
      type: 'email',
      placeholder: 'Введите ваш e-mail',
      className: 'mt-30',
      inputClassName: 'form-input',
      showErrors: false,
      errorMessage: getEmailInputErrorMessage(''),
      getErrorMessage: getEmailInputErrorMessage,
      validateFn: validateEmail
    },
    message: {
      value: '',
      label: 'Сообщение',
      labelClass: 'form__label',
      className: 'mt-30',
      isValid: false,
      required: true,
      type: 'text',
      placeholder: 'Напишите ваше сообщение',
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
  const breadcrumbs = useBreadcrumbs()
  const { name, email, message } = form

  const onModalClose = () => {
    document.documentElement.classList.remove('lock')
    setModalOpened(false)
  }

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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (!Object.values(form).every(({ isValid }) => isValid)) {
      return
    }

    const dto = {
      userName: name.value,
      email: email.value,
      message: message.value
    }
    UserApiClient.sendMessage(dto)
      .then((dto) => {
        if (isSuccessfullResponse(dto)) {
          document.documentElement.classList.add('lock')
          setModalOpened(true)
        }

        dispatch(toggleSnackbarOpen())
      })
      .catch(() => {
        dispatch(toggleSnackbarOpen())
      })
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
                required={name.required}
                rootElclass={name.className}
                label={name.label}
                labelClass={name.labelClass}
                inputWrapClass={name.inputWrapClass}
                inputClassName={`${name.inputClassName} ${showNameInputError ? 'input-text--error' : ''}`}
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
                required={email.required}
                rootElclass={email.className}
                label={email.label}
                labelClass={email.labelClass}
                inputWrapClass={email.inputWrapClass}
                inputClassName={`${email.inputClassName} ${showEmailInputError ? 'input-text--error' : ''}`}
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
                required={message.required}
                rootElclass={message.className}
                label={message.label}
                labelClass={message.labelClass}
                inputWrapClass={message.inputWrapClass}
                inputClassName={`${message.inputClassName} ${showMessageInputError ? 'input-text--error' : ''}`}
                showErrors={showMessageInputError}
                errorMessage={message.getErrorMessage(message.value)}
                onChange={onChange('message')}
              />
              <div className='contacts__form-bottom flex items-center mt-30'>
                <label className='contacts__form-file form-file flex'>
                  <input
                    className='form-file__real'
                    type='file'
                  />
                  <span className='btn-hollow'>Add file</span>
                </label>
                <button
                  title='Submit'
                  className='btn'
                  type='submit'
                >
                  Submit
                </button>
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
                  href='mailto:mebel_loft_anapa@mail.ru'
                >
                  mebel_loft_anapa@mail.ru
                </a>
              </div>
              <a
                className='contacts__link mt-20'
                href='https://www.instagram.com/?hl=en'
              >
                INSTAGRAM
              </a>
              <p className='contacts__text mt-20'>Адрес: г. Анапа, Анапское шоссе, 30 Ж/К Черное море</p>
            </div>
          </div>
          <h4 className='contacts__title mt-40'>Адрес нашей компании</h4>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <a
              href='https://yandex.ru/maps/org/loft_mebel/168358311332/?utm_medium=mapframe&utm_source=maps'
              style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}
            >
              Loft Мебель
            </a>
            <a
              href='https://yandex.ru/maps/1107/anapa/category/furniture_store/184107871/?utm_medium=mapframe&utm_source=maps'
              style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '14px' }}
            >
              Магазин мебели в Анапе
            </a>
            <a
              href='https://yandex.ru/maps/1107/anapa/category/cabinet_furniture/184107869/?utm_medium=mapframe&utm_source=maps'
              style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '28px' }}
            >
              Корпусная мебель в Анапе
            </a>
            <iframe
              title='Магазин мебели в Анапе'
              src='https://yandex.ru/map-widget/v1/-/CCUqI-Sv8C'
              width='100%'
              height='400'
              frame-border='1'
              allowFullScreen={true}
              style={{ position: 'relative' }}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Contacts
