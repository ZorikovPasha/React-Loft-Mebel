import React from 'react';

import term_1 from "../images/terms/1.svg";
import term_2 from "../images/terms/2.svg";
import term_3 from "../images/terms/3.svg";

const Profile: React.FC = () => {

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
                <span>0</span>
                бонусных баллов
              </p>
              <button className="profile__rules" >Правила бонусной программы</button>  
            </div>
          </div>
          <div className="profile__terms">
            <div className="profile__term">
              <img src={term_1} alt="condition" />
              <p className="profile__term-text">Возвращаем до 7% на бонусный счет
              </p>
            </div>
            <div className="profile__term">
              <img src={term_2} alt="condition" />
              <p className="profile__term-text">1 бонус = 1 рубль</p>
            </div>
            <div className="profile__term">
              <img src={term_3} alt="condition" />
              <p className="profile__term-text">Оплачивайте бонусами до 20% от покупки</p>
            </div>
          </div>
        </div>

        <div className="profile__body">
          <div className="profile__box">
            <h3 className="profile__title">Личные данные</h3>
            <form className="profile__form" action="">
              <div className="profile__form-block">
                <div className="profile__form-line">
                  <label className="profile__form-label">
                    Имя
                    <input type="text" className="profile__form-input" value="Дмитрий" />
                  </label>
                  <label className="profile__form-label">
                    E-mail
                    <input type="text" className="profile__form-input" value="morlibae@gmail.com" />
                  </label>
                </div>
                <div className="profile__form-line">
                  <label className="profile__form-label">
                    Фамилия
                    <input type="text" className="profile__form-input" value="Галькевич" />
                  </label>
                  <label className="profile__form-label">
                    Номер телефона
                    <input type="text" className="profile__form-input" value="+7 (901) 784-65-45" />
                  </label>
                </div>
              </div>

              <label className="profile__form-label city">
                Город
                <input type="text" className="profile__form-input" value="Москва" />
              </label>
              <label className="profile__form-label wide">
                Улица
                <input type="text" className="profile__form-input" value="Святоозерская" />
              </label>
              <div className="profile__form-line">
                <label className="profile__form-label house">
                  Дом/Корпус
                  <input type="text" className="profile__form-input" value="16/1" />
                </label>
                <label className="profile__form-label apartment">
                  Квартира
                  <input type="text" className="profile__form-input" value="29" />
                </label>  
              </div>
              <button className="profile__form-btn" type="submit">Изменить</button>
            </form>
          </div>
          <div className="profile__orders orders">
            <h3 className="profile__title">Мои заказы</h3>
            <div className="orders__items">
              <div className="orders__name heading">Товар</div>
              <div className="orders__cost heading">Цена</div>
              <div className="orders__date heading">Дата</div>
              <div className="orders__status heading">Статус</div>

              <div className="orders__name">
                <img src="images/orders/1.png" alt="order" />
                <a  href="product.html">
                  Кускен Navy Blue
                </a>
              </div>
              <div className="orders__cost">16990</div>
              <div className="orders__date">01.05.2020</div>
              <div className="orders__status">Ожидается</div>

              <div className="orders__name">
                <img src="images/orders/2.png" alt="order" />
                <a  href="product.html">
                  Кускен Navy Blue
                </a>

              </div>
              <div className="orders__cost">28490</div>
              <div className="orders__date">01.05.2020</div>
              <div className="orders__status">Оплачено 50%</div>

              <div className="orders__name">
                <img src="images/orders/3.png" alt="order" />
                <a  href="product.html">
                  Кускен Navy Blue
                </a>
  
              </div>
              <div className="orders__cost">21990</div>
              <div className="orders__date">01.05.2020</div>
              <div className="orders__status">Доставлено</div>

              <div className="orders__name">
                <img src="images/orders/4.png" alt="order" />
                <a  href="product.html">
                  Кускен Navy Blue
                </a>
              </div>
              <div className="orders__cost">21921212190</div>
              <div className="orders__date">01.05.2020</div>
              <div className="orders__status">Отменен</div>

            </div>
            <div className="orders__all">
              <a href="/#">Смотреть все</a>
            </div>
          </div>
        </div>

      </div>
    </section>
  </>
)
};

export default Profile;