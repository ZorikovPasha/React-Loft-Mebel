import React from 'react'
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import * as yup from 'yup'

import { ModalInfo } from '../components/common/ModalInfo'
import { UserApiClient } from '../api'

const SignUp: React.FC = () => {
  const history = useHistory()
  const [modalSignUp, setModalSignUp] = React.useState(false)
  const initFormValues = {
    userName: '',
    email: '',
    password: ''
  }

  const formSchema = yup.object().shape({
    userName: yup.string().required('Пожалуйста, заполните имя'),
    email: yup.string().email('Введите, корректный email').required('Пожалуйста, заполните email'),
    password: yup
      .string()
      .required('Введите пароль')
      .min(8, 'Пароль должен быть длиной не менее 8 символов')
      .max(32, 'Пароль должен быть длиной не более 32 символов')
  })

  const handleSubmit = async ({ userName, email, password }: typeof initFormValues) => {
    const data = await UserApiClient.register<{ message: string; status: number }>({ userName, email, password })

    if (data.status === 200) {
      document.documentElement.classList.add('lock')
      setModalSignUp(true)
    }
  }

  const onModalClose: React.MouseEventHandler<HTMLButtonElement> = () => {
    history.push({
      pathname: '/login'
    })
    document.documentElement.classList.remove('lock')

    setModalSignUp(false)
  }

  return (
    <>
      <div className='signup'>
        <div className='container'>
          <div className='signup__inner'>
            <h1 className='signup__title'>Регистрация</h1>

            <Formik
              initialValues={initFormValues}
              validationSchema={formSchema}
              onSubmit={handleSubmit}
            >
              {({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => (
                <form
                  className='signup__form from'
                  onSubmit={handleSubmit}
                >
                  <div className='form-block'>
                    <p className='signup__form-label form-label'>Имя пользователя</p>
                    <input
                      type='text'
                      className={`signup__form-input form-input ${errors.userName && touched.userName ? 'form-input--error' : ''}`}
                      value={values.userName}
                      name='userName'
                      placeholder='Введите имя'
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.userName && touched.userName && <p className='form-error'>{errors.userName}</p>}
                  </div>

                  <div className='form-block'>
                    <p className='signup__form-label form-label'>Электронная почта</p>
                    <input
                      type='text'
                      className={`signup__form-input form-input ${errors.email && touched.email ? 'form-input--error' : ''}`}
                      value={values.email}
                      name='email'
                      placeholder='Введите электронную почту'
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email && <p className='form-error'>{errors.email}</p>}
                  </div>
                  <div className='form-block'>
                    <p className='signup__form-label form-label'>Пароль</p>
                    <input
                      type='password'
                      className={`signup__form-input form-input ${errors.password && touched.password ? 'form-input--error' : ''}`}
                      value={values.password}
                      name='password'
                      placeholder='Введите пароль'
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password && <p className='form-error'>{errors.password}</p>}
                  </div>
                  <button
                    type='submit'
                    className='signup__form-btn btn'
                  >
                    Зарегистрироваться
                  </button>
                </form>
              )}
            </Formik>
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
