import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

import { Breadcrumbs, ModalInfo } from '../Components'
import { useBreadcrumbs } from '../hooks/useBreadcrumbs'
import { formDataType, UserApiClient } from '../services/api'

const Contacts: React.FC = () => {
  const [isModalOpened, setModalOpened] = React.useState(false)
  const breadcrumbs = useBreadcrumbs()

  const formSchema = yup.object().shape({
    userName: yup.string().required('Пожалуйста, заполните имя'),
    email: yup.string().email('Введите, корректный email').required('Пожалуйста, заполните email'),
    message: yup.string().required('Пожалуйста, напишите сообщение')
  })

  const onModalClose: React.MouseEventHandler<HTMLButtonElement> = () => {
    document.documentElement.classList.remove('lock')
    setModalOpened(false)
  }

  const handleSubmitMessage = (formData: formDataType) => {
    UserApiClient.sendMessage(formData)
    document.documentElement.classList.add('lock')
    setModalOpened(true)
  }

  return (
    <>
      {isModalOpened && (
        <ModalInfo
          title='Сообщение отправлено'
          text='Мы с вами свяжемся'
          onModalClose={onModalClose}
        />
      )}
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section className='contacts'>
        <div className='container'>
          <h4 className='contacts__title'>Свяжитесь с нами</h4>
          <div className='contacts__inner'>
            <Formik
              initialValues={{ userName: '', email: '', message: '' }}
              validationSchema={formSchema}
              onSubmit={handleSubmitMessage}
            >
              {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
                <form
                  className='contacts__form'
                  onSubmit={handleSubmit}
                >
                  <div className='contacts__form-line'>
                    <div className='contacts__form-block'>
                      {errors.userName && touched.userName && <p className='contacts__form-error form-error'>{errors.userName}</p>}
                      <label className='contacts__form-label'>
                        Ваше имя
                        <input
                          value={values.userName}
                          className={`contacts__form-input ${errors.userName && touched.userName ? 'form-input--error' : ''}`}
                          name='userName'
                          type='text'
                          placeholder='Введите ваше имя'
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </label>
                    </div>

                    <div className='contacts__form-block'>
                      {errors.email && touched.email && <p className='contacts__form-error form-error'>{errors.email}</p>}
                      <label className='contacts__form-label'>
                        Ваш e-mail
                        <input
                          value={values.email}
                          className={`contacts__form-input ${errors.email && touched.email ? 'form-input--error' : ''}`}
                          name='email'
                          type='text'
                          placeholder='Введите ваш e-mail'
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </label>
                    </div>
                  </div>
                  <label className='contacts__form-label'>
                    {errors.message && touched.message && <p className='form-error'>{errors.message}</p>}
                    Сообщение
                    <textarea
                      value={values.message}
                      name='message'
                      className={`contacts__form-area ${errors.message && touched.message ? 'form-input--error' : ''}`}
                      placeholder='Напишите ваше сообщение'
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </label>
                  <div className='contacts__form-bottom'>
                    <label className='contacts__form-file form-file'>
                      <input
                        className='form-file__real'
                        type='file'
                      />
                      <span className='form-file__fake'>Прикрепить файл</span>
                    </label>
                    <button
                      className='contacts__form-btn'
                      type='submit'
                    >
                      Отправить
                    </button>
                  </div>
                </form>
              )}
            </Formik>
            <div className='contacts__items'>
              <div className='contacts__line'>
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
                className='contacts__link'
                href='https://www.instagram.com/?hl=en'
              >
                INSTAGRAM
              </a>
              <p className='contacts__text'>Адрес: г. Анапа, Анапское шоссе, 30 Ж/К Черное море</p>
            </div>
          </div>
          <h4 className='contacts__title'>Адрес нашей компании</h4>
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
