import { Formik } from 'formik';
import React from 'react';
import * as yup from "yup";

import term_1 from "../images/terms/1.svg";
import term_2 from "../images/terms/2.svg";
import term_3 from "../images/terms/3.svg";
import { userFormValuesType } from '../types';
import { HttpClient } from "../services/api";
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, getUserData } from '../redux/getters';
import { authActionCreator } from '../redux/actions/authAction';
import { addUserDataActionCreator } from '../redux/actions/userAction';
import { initFormValues } from '../redux/reducers/userReducer';
import { resetFavoritesActionCreator } from '../redux/actions/favorites';
import { resetCartActionCreator } from '../redux/actions/removeItem';
import { Link, useHistory } from 'react-router-dom';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const terms = [
    { text: 'Возвращаем до 7% на бонусный счет', img: term_1 },
    { text: '1 бонус = 1 рубль', img: term_2 },
    { text: 'Оплачивайте бонусами до 20% от покупки', img: term_3 },
  ];


  const history = useHistory();

  const fetchedOrders = useSelector(getOrders);
  const userFormValues = useSelector(getUserData);
  let buffer = {...userFormValues};

  const formSchema = yup.object().shape({
    name: yup.string().required(""),
    email: yup.string().email('').required(''),
    surname: yup.string().required(""),
    phone: yup.string().required(""),
    city: yup.string().required(""),
    street: yup.string().required(""),
    house: yup.string().required(""),
    apartment: yup.string().required(""),
  });

  const handleSubmit = (userData: userFormValuesType) => {
    let isAnyDirty = false;

    let k: keyof typeof userData;
    for (k in userData) {
      if (userData[k] !== buffer[k]) {
        isAnyDirty = true;
      }
    }

    if (isAnyDirty) {
      buffer = {...userData};
      HttpClient.sendUserData(userData);
    }
  };

  const onLogout = () => {
    localStorage.setItem('token', '');
    dispatch(authActionCreator(false));
    dispatch(addUserDataActionCreator(initFormValues));
    dispatch(resetFavoritesActionCreator());
    dispatch(resetCartActionCreator());
    history.push({ pathname: '/' })
  };

  return (
    <>
      <section className="profile">
        <div className="container">
          <div className="profile__top">
            <div className="profile__names">
              <h3 className="profile__heading">Бонусная программа</h3>
              <div className="profile__names-right">
                <p className="profile__total">
                  У вас
                  <span> 0 </span>
                  бонусных баллов
                </p>
                <button className="profile__rules" >Правила бонусной программы</button>  
              </div>
            </div>
            <div className="profile__terms">
              {terms.map(({ text , img }) => (
                <div className="profile__term" key={text}>
                  <img src={img} alt="condition" />
                  <p className="profile__term-text">{text}</p>
              </div>
              ))}
            </div>
          </div>

          <div className="profile__body">
            <div className="profile__box">
              <h3 className="profile__title">Личные данные</h3>
              <Formik 
                enableReinitialize
                initialValues={userFormValues}
                validationSchema={formSchema}
                onSubmit={handleSubmit}
                >
                {({ values, touched, errors, handleSubmit, handleChange, handleBlur }) => (
                  <form className="profile__form" onSubmit={handleSubmit}>
                    <div className="profile__form-block">
                      <label className="profile__form-label">
                        Имя
                        <input 
                          name="name"
                          type="text" 
                          required 
                          className={`profile__form-input ${touched.name && errors.name ? 'form-input--error' : ''} `}
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          />
                      </label>
                    </div>
                    <div className="profile__form-block">
                      <label className="profile__form-label">
                        E-mail
                        <input 
                          name="email"
                          type="text" 
                          className={`profile__form-input ${touched.email && errors.email ? 'form-input--error' : ''} `}
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          />
                      </label>
                    </div>
                    <div className="profile__form-line">
                      <div className="profile__form-block">
                        <label className="profile__form-label profile__form-label--gap-right">
                          Фамилия
                          <input 
                            name="surname"
                            type="text" 
                            className={`profile__form-input ${touched.surname && errors.surname ? 'form-input--error' : ''} `}
                            value={values.surname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />
                        </label>
                      </div>

                      <div className="profile__form-block">
                        <label className="profile__form-label">
                          Номер телефона
                          <input 
                            name="phone"
                            type="text" 
                            className={`profile__form-input ${touched.phone && errors.phone ? 'form-input--error' : ''} `}
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />
                        </label>
                      </div>
                    </div>
                    <div className="profile__form-block">
                      <label className="profile__form-label city">
                        Город
                        <input 
                          name="city"
                          type="text" 
                          className={`profile__form-input ${touched.city && errors.city ? 'form-input--error' : ''} `}
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          />
                      </label>
                    </div>

                  <div className="profile__form-block">
                    <label className="profile__form-label wide">
                      Улица
                      <input 
                        name="street"
                        type="text" 
                        className={`profile__form-input ${touched.street && errors.street ? 'form-input--error' : ''} `}
                        value={values.street}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                    </label>
                  </div>

                  <div className="profile__form-line">
                  <div className="profile__form-block">
                    <label className="profile__form-label profile__form-label--gap-right house">
                        Дом/Корпус
                        <input 
                          name="house"
                          type="text" 
                          className={`profile__form-input ${touched.house && errors.house ? 'form-input--error' : ''} `}
                          value={values.house}
                          onChange={handleChange}
                          onBlur={handleBlur}
                            />
                      </label>
                  </div>
                    <div className="profile__form-block">
                      <label className="profile__form-label apartment">
                        Квартира
                        <input 
                          name="apartment"
                          type="text" 
                          className={`profile__form-input ${touched.apartment && errors.apartment ? 'form-input--error' : ''} `}
                          value={values.apartment}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          />
                    </label>  
                    </div>
                  </div>
                  <div className="profile__form-btns">
                    <button 
                      className="profile__form-btn profile__form-btn--red" 
                      type="button"
                      onClick={onLogout}
                      >
                        Выйти
                        </button>
                    <button className="profile__form-btn" type="submit">Изменить</button> 
                  </div>
                  </form>
                )}
              </Formik>
            </div>
            <div className="profile__orders orders">
              <h3 className="profile__title">Мои заказы</h3>
              <div className="orders__items">
                <div className="orders__name heading">Товар</div>
                <div className="orders__cost heading">Цена</div>
                <div className="orders__date heading">Дата</div>
                <div className="orders__status heading">Статус</div>
                { fetchedOrders && fetchedOrders?.map(({ id, name, price, date, status, imageUrl }, idx) => (
                  < React.Fragment key={idx}>
                    <div className="orders__name">
                      <img  className="orders__preview" src={imageUrl} alt="Превю мебели" />
                      <Link to={`/products/${id}`}>{name}</Link>
                    </div>
                    <div className="orders__cost">{price}</div>
                    <div className="orders__date">{date.toString().substring(0, 10)}</div>
                    <div className="orders__status">{status}</div>
                  </React.Fragment>
                )) }
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
};

export default Profile;