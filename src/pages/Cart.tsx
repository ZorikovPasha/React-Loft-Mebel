import React, { FC, ReactElement } from 'react';

import {Header, Footer, MobMenu} from '../Components'

const Cart: FC = (): ReactElement => {

  return (

    <div className="wrapper">
      
      <Header></Header>

      <MobMenu></MobMenu>

      <main className="main">
        <div className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href="#">Главная</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__item-back" href="catalog.html">
                  <img src="images/icons/arrow-back.svg" alt="back" />
                </a>
                <span className="breadcrumbs__link">Корзина</span>
              </li>
            </ul>  
          </div>
        </div>
        <section className="cart">
          <div className="container">
            <div className="cart__top">
              <p>Ваша корзина</p>
              <p>
                <span className="cart__top-num">4</span>
                предмета
              </p>
            </div>
            <div className="cart__item item">
              <div className="item__box">
                <img src="images/cart/1.png" alt="furniture" />
                <div className="item__info">
                  <div className="item__info-top">
                    <h4 className="item__info-name">
                      <a href="product.html">Кускен Navy Blue</a>
                    </h4>
                    <div className="item__info-nums">
                      <p className="item__info-price">16 990₽</p>
                    </div>
                  </div>
                  <div className="item__info-line">
                    <div className="item__info-feature info-feature" data-color>
                      <p className="info-feature__name">Цвет:</p>
                      <p className="info-feature__val">Темно-синий</p>
                      <span></span>
                    </div>
                    <div className="item__info-feature info-feature">
                      <p className="info-feature__name info-feature__name--total">Количество:</p>
                      <p className="info-feature__val" data-total>1</p>
                    </div>
                    <div className="item__info-feature info-feature" data-size>
                      <p className="info-feature__name">Размер(Ш×Д×В):</p>
                      <p className="info-feature__val">218 СМ × 95 СМ × 80 СМ</p>
                    </div>
                  </div>
                </div>
                <div className="item__bottom"></div>
              </div>
              <div className="item__remove">
                <img src="images/icons/cross.svg" alt="cross" />
              </div>
            </div>

            <div className="cart__item item">
              <div className="item__box">
                <img src="images/cart/2.png" alt="furniture" />
                <div className="item__info">
                  <div className="item__info-top">
                    <h4 className="item__info-name">
                      <a href="product.html">Кускен Navy Blue</a>
                    </h4>
                    <div className="item__info-nums">
                      <p className="item__info-price">16 990₽</p>
                    </div>
                  </div>
                  <div className="item__info-line">
                    <div className="item__info-feature info-feature" data-color>
                      <p className="info-feature__name">Цвет:</p>
                      <p className="info-feature__val">Темно-синий</p>
                      <span></span>
                    </div>
                    <div className="item__info-feature info-feature">
                      <p className="info-feature__name info-feature__name--total">Количество:</p>
                      <p className="info-feature__val" data-total>1</p>
                    </div>
                    <div className="item__info-feature info-feature" data-size>
                      <p className="info-feature__name">Размер(Ш×Д×В):</p>
                      <p className="info-feature__val">218 СМ × 95 СМ × 125 СМ</p>
                    </div>
                  </div>
                </div>
                <div className="item__bottom"></div>
              </div>
              <div className="item__remove">
                <img src="images/icons/cross.svg" alt="cross" />
              </div>
            </div>

            <div className="cart__item item">
              <div className="item__box">
                <img src="images/cart/2.png" alt="furniture" />
                <div className="item__info">
                  <div className="item__info-top">
                    <h4 className="item__info-name">
                      <a href="product.html">Кускен Navy Blue</a>
                    </h4>
                    <div className="item__info-nums">
                      <p className="item__info-price">16 990₽</p>
                    </div>
                  </div>
                  <div className="item__info-line">
                    <div className="item__info-feature info-feature" data-color>
                      <p className="info-feature__name">Цвет:</p>
                      <p className="info-feature__val">Темно-синий</p>
                      <span></span>
                    </div>
                    <div className="item__info-feature info-feature">
                      <p className="info-feature__name info-feature__name--total">Количество:</p>
                      <p className="info-feature__val" data-total>1</p>
                    </div>
                    <div className="item__info-feature info-feature" data-size>
                      <p className="info-feature__name">Размер(Ш×Д×В):</p>
                      <p className="info-feature__val">218 СМ × 140 СМ × 90 СМ</p>
                    </div>
                  </div>
                </div>
                <div className="item__bottom"></div>
              </div>
              <div className="item__remove">
                <img src="images/icons/cross.svg" alt="cross" />
              </div>
            </div>

            <div className="cart__item item">
              <div className="item__box">
                <img src="images/cart/2.png" alt="furniture" />
                <div className="item__info">
                  <div className="item__info-top">
                    <h4 className="item__info-name">
                      <a href="product.html">Кускен Navy Blue</a>
                    </h4>
                    <div className="item__info-nums">
                      <p className="item__info-price">16 990₽</p>
                    </div>
                  </div>
                  <div className="item__info-line">
                    <div className="item__info-feature info-feature" data-color>
                      <p className="info-feature__name">Цвет:</p>
                      <p className="info-feature__val">Темно-синий</p>
                      <span></span>
                    </div>
                    <div className="item__info-feature info-feature">
                      <p className="info-feature__name info-feature__name--total">Количество:</p>
                      <p className="info-feature__val" data-total>1</p>
                    </div>
                    <div className="item__info-feature info-feature" data-size>
                      <p className="info-feature__name">Размер(Ш×Д×В):</p>
                      <p className="info-feature__val">218 СМ × 130 СМ × 110 СМ</p>
                    </div>
                  </div>
                </div>
                <div className="item__bottom"></div>
              </div>
              <div className="item__remove">
                <img src="images/icons/cross.svg" alt="cross" />
              </div>
            </div>

            <div className="cart__bottom">
              <p className="cart__bottom-total">
                Итоговая стоимость:
                <span>69 960₽</span>
              </p>
              <button className="cart__bottom-btn">Оформить заказ</button>
            </div>
          </div>
        </section>

        <section className="sales">
          <div className="container">
            <h3 className="sales__title">Вам может понравиться</h3>
            <div className="sales__items sales__items--cart">
              <div className="sales__item item-sales">
                <button className="item-sales__like"></button>
                <div className="item-sales__box">
                  <div className="item-sales__img">
                    <img src="images/sales/1.png" alt="furniture" />
                  </div>
                  <a className="item-sales__title" href="product.html">Валенсия Beige Валенсия Beige Валенсия Beige</a>
                  <a className="item-sales__type" href="catalog.html">Барные стулья</a>
                  <div className="item-sales__price">
                    <p className="item-sales__price-new">2 300₽</p>
                  </div>
                  <div className="item-sales__bottom">
                    <p className="item-sales__text">Размеры</p>
                    <div className="item-sales__line">
                      <div className="item-sales__size">
                        <p className="item-sales__val">ШИРИНА</p>
                        <p className="item-sales__num">43 СМ</p>
                      </div>
                      <div className="item-sales__size">
                        <p className="item-sales__val">ГЛУБИНА</p>
                        <p className="item-sales__num">43 СМ</p>
                      </div>
                      <div className="item-sales__size">
                        <p className="item-sales__val">ВЫСОТА</p>
                        <p className="item-sales__num">77 СМ</p>
                      </div>
                    </div>
                    <button className="item-sales__tocart">Добавить в корзину</button>
                  </div>
                </div>
              </div>
              <div className="sales__item item-sales">
                <button className="item-sales__like"></button>
                <div className="item-sales__box">
                  <div className="item-sales__img">
                    <img src="images/sales/2.png" alt="furniture" />
                  </div>
                  <a className="item-sales__title" href="product.html">Толикс-2 White Gloss</a>
                  <a className="item-sales__type" href="catalog.html">Барные стулья</a>
                  <div className="item-sales__price">
                    <p className="item-sales__price-new">245 300₽</p>
                    <p className="item-sales__price-old">2 300₽</p>
                  </div>
                  <div className="item-sales__bottom">
                    <p className="item-sales__text">Размеры</p>
                    <div className="item-sales__line">
                      <div className="item-sales__size">
                        <p className="item-sales__val">ШИРИНА</p>
                        <p className="item-sales__num">433 СМ</p>
                      </div>
                      <div className="item-sales__size">
                        <p className="item-sales__val">ГЛУБИНА</p>
                        <p className="item-sales__num">443 СМ</p>
                      </div>
                      <div className="item-sales__size">
                        <p className="item-sales__val">ВЫСОТА</p>
                        <p className="item-sales__num">727 СМ</p>
                      </div>
                    </div>
                    <button className="item-sales__tocart">Добавить в корзину</button>
                  </div>
                </div>
              </div>
              <div className="sales__item item-sales">
                <button className="item-sales__like"></button>
                <div className="item-sales__box">
                  <div className="item-sales__img">
                    <img src="images/sales/3.png" alt="furniture" />
                  </div>
                  <a className="item-sales__title" href="product.html">Валенсия Beige</a>
                  <a className="item-sales__type" href="catalog.html">Барные стулья</a>
                  <div className="item-sales__price">
                    <p className="item-sales__price-new">2 300₽</p>
                    <p className="item-sales__price-old">21 300₽</p>

                  </div>
                  <div className="item-sales__bottom">
                    <p className="item-sales__text">Размеры</p>
                    <div className="item-sales__line">
                      <div className="item-sales__size">
                        <p className="item-sales__val">ШИРИНА</p>
                        <p className="item-sales__num">43 СМ</p>
                      </div>
                      <div className="item-sales__size">
                        <p className="item-sales__val">ГЛУБИНА</p>
                        <p className="item-sales__num">43 СМ</p>
                      </div>
                      <div className="item-sales__size">
                        <p className="item-sales__val">ВЫСОТА</p>
                        <p className="item-sales__num">77 СМ</p>
                      </div>
                    </div>
                    <button className="item-sales__tocart">Добавить в корзину</button>
                  </div>
                </div>
              </div>
              <div className="sales__item item-sales">
                <div className="item-sales__label label-sales">
                  <div className="label-sales__body">-25%</div>
                </div>
                <button className="item-sales__like"></button>
                <div className="item-sales__box">
                  <div className="item-sales__img">
                    <img src="images/sales/4.png" alt="furniture" />
                  </div>
                  <a className="item-sales__title" href="product.html">Кускен Navy Blue</a>
                  <a className="item-sales__type" href="catalog.html">Диваны</a>
                  <div className="item-sales__price">
                    <p className="item-sales__price-new">2 300₽</p>
                    <p className="item-sales__price-old">2 300₽</p>

                  </div>
                  <div className="item-sales__bottom">
                    <p className="item-sales__text">Размеры</p>
                    <div className="item-sales__line">
                      <div className="item-sales__size">
                        <p className="item-sales__val">ШИРИНА</p>
                        <p className="item-sales__num">43 СМ</p>
                      </div>
                      <div className="item-sales__size">
                        <p className="item-sales__val">ГЛУБИНА</p>
                        <p className="item-sales__num">43 СМ</p>
                      </div>
                      <div className="item-sales__size">
                        <p className="item-sales__val">ВЫСОТА</p>
                        <p className="item-sales__num">77 СМ</p>
                      </div>
                    </div>
                    <button className="item-sales__tocart">Добавить в корзину</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer></Footer>
    </div>
  )
}

export default Cart