import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { Formik } from "formik";
import { useDispatch } from 'react-redux';

import { ModalInfo } from '../Components';
import { authActionCreator } from '../redux/actions/authAction';
import { HttpClient } from '../services/api';
import vk from '../images/vk.svg';
import fb from '../images/fb.svg';
import google from '../images/google.svg';

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [modalVisible, setModalVisible] = React.useState(false);

  const loginErrorMessage = React.useRef('');

  const initFormValues = {
    email: '',
    password: '',
  };

  const formSchema = yup.object().shape({
    email: yup.string().email('Введите, корректный email').required('Пожалуйста, заполните email'),
    password: yup.string()
      .required("Введите пароль")
      .min(8, 'Пароль должен быть длиной не менее 8 символов')
      .max(32, 'Пароль должен быть длиной не более 32 символов'),
  });

  const handleSubmit = async({ email, password }: typeof initFormValues) => {
    const { token, message } = await HttpClient.login(email, password);
    
    if (message) {
      loginErrorMessage.current = message;
      document.body.classList.add("lock");
      setModalVisible(true);
    }

    if (token) {
      localStorage.setItem('token', token);
      dispatch(authActionCreator(true));

      history.push({
        pathname: '/',
      });
    }
  };

  const onModalClose: React.MouseEventHandler<HTMLButtonElement> = () => {
    setModalVisible(false);
    document.body.classList.remove("lock");
  };

  return (
    <>
      <div className="login">
        <div className="container">
          <div className="login__inner">
            <h1 className="login__title">Авторизация</h1>
              <Formik 
                initialValues={initFormValues}
                validationSchema={formSchema}
                onSubmit={handleSubmit}
              > 
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form className="login__form form" onSubmit={handleSubmit}>
                    <div className="form-block">
                      <p className="login__form-label form-label">Электронная почта</p>
                      <input 
                        type="text" 
                        className={`login__form-input form-input ${errors.email && touched.email ? 'form-input--error' : ''}`} 
                        value={values.email}
                        name="email" 
                        placeholder="Введите электронную почту" 
                        required 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.email && touched.email && 
                        <p className="form-error">
                          {errors.email}
                        </p>}
                    </div>

                    <div className="form-block">
                      <p className="login__form-label form-label">Пароль</p>
                      <input 
                        type="password" 
                        className={`login__form-input form-input ${errors.password && touched.password ? 'form-input--error' : ''}`} 
                        value={values.password}
                        name="password" 
                        placeholder="Введите пароль" 
                        required 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                          {errors.password && touched.password && 
                          <p className="form-error">
                            {errors.password}
                          </p>}
                    </div>
                    <div className="login__link-wrapper">
                      {/* <a href="restore-password.html" className="login__form-reminder">Забыли пароль?</a> */}
                    </div>
                    <button className="login__form-btn btn" type="submit">Войти</button>
                  </form>
                )}
              </ Formik>
            <p className="login__text">или авторизоваться через</p>
            <div className="login__socials">
              <button className="login__socials-link" aria-label="facebook icon">
                <img src={fb} alt="facebook icon" />
              </button>
              <button  className="login__socials-link" aria-label="vkontacte icon">
                <img src={vk} alt="vkontacte icon" />
              </button>
              <button className="login__socials-link" aria-label="google icon">
                <img src={google} alt="google icon" />
              </button>
            </div>
          </div>
          <div className="login__bottom">
            <span className="login__new">Новый пользователь?</span>
            <Link className="login__new-link" to="/signup">Создать учетную запись</Link>
          </div>
        </div>
      </div>
      { modalVisible && 
        <ModalInfo 
          title="Оошибка при логине"
          text={loginErrorMessage.current} 
          onModalClose={onModalClose}
          />
      }
    </>
  )
};

export default Login;