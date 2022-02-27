import React from 'react';
import { Formik } from "formik";
import * as yup from 'yup';

import { Header } from '../Components';

import { IPageProps } from "../types"; 

const SignUp: React.FC<IPageProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {

  const initFormValues = {
    name: '',
    email: '',
    password: '',
  };

  const formSchema = yup.object().shape({
    name: yup.string().required("Пожалуйста, заполните имя"),
    email: yup.string().email('Введите, корректный email').required('Пожалуйста, заполните email'),
    password: yup.string()
      .required("Введите пароль")
      .min(8, 'Пароль должен быть длиной не менее 8 символов')
      .max(32, 'Пароль должен быть длиной не более 32 символов'),
  });


  const handleSubmit = ({ name, email, password }: typeof initFormValues) => {
    console.log(name, email, password);
  };

  return (
    <>
      <Header 
        isMobMenuOpen={isMobMenuOpen}
        setMobMenuOpen={setMobMenuOpen}
        />
      <main className="main">
        <div className="signup">
            <div className="container">
              <div className="signup__inner">
                <h1 className="signup__title">Регистрация</h1>

                <Formik 
                  initialValues={initFormValues}
                  validationSchema={formSchema}
                  onSubmit={handleSubmit}
                > 
                  {({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => (
                    <form className="signup__form from" onSubmit={handleSubmit}>
                      <div className="form-block">
                        <p className="signup__form-label form-label">Имя пользователя</p>
                        <input 
                          type="text" 
                          className={`signup__form-input form-input ${errors.name && touched.name ? 'form-input--error' : ''}`} 
                          value={values.name}
                          name="name" 
                          placeholder="Введите имя" 
                          required 
                          onChange={handleChange}
                          onBlur={handleBlur}
                          />
                        {errors.name && touched.name && 
                          <p className="form-error">
                            {errors.name}
                          </p>}
                      </div>

                      <div className="form-block">
                        <p className="signup__form-label form-label">Электронная почта</p>
                        <input 
                          type="password" 
                          className={`signup__form-input form-input ${errors.email && touched.email ? 'form-input--error' : ''}`} 
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
                        <p className="signup__form-label form-label">Пароль</p>
                        <input 
                          type="password" 
                          className={`signup__form-input form-input ${errors.password && touched.password ? 'form-input--error' : ''}`} 
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
                      <button className="signup__form-btn btn">Зарегистрироваться</button>
                    </form>
                  )}
                </ Formik>
              </div>
            </div>
          </div>
      </main>
    </>
  )
}

export default SignUp;