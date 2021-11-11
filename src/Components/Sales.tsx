import React, { FC, ReactElement } from "react";

const Sales: FC = (): ReactElement => {
  return (
    <section className="sales">
      <div className="container">
        <h3 className="sales__title">Хиты продаж</h3>
        <div className="sales__items">
          <div className="sales__item item-sales">
            <button className="item-sales__like"></button>
            <div className="item-sales__box">
              <div className="item-sales__img">
                <img src="images/sales/1.png" alt="furniture" />
              </div>
              <a className="item-sales__title" href="product.html">
                Валенсия Beige Валенсия Beige Валенсия Beige
              </a>
              <a className="item-sales__type" href="catalog.html">
                Барные стулья
              </a>
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
              <a className="item-sales__title" href="product.html">
                Толикс-2 White Gloss
              </a>
              <a className="item-sales__type" href="catalog.html">
                Барные стулья
              </a>
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
              <a className="item-sales__title" href="product.html">
                Валенсия Beige
              </a>
              <a className="item-sales__type" href="catalog.html">
                Барные стулья
              </a>
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
              <a className="item-sales__title" href="product.html">
                Кускен Navy Blue
              </a>
              <a className="item-sales__type" href="catalog.html">
                Диваны
              </a>
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

          <div className="sales__item item-sales">
            <button className="item-sales__like"></button>
            <div className="item-sales__box">
              <div className="item-sales__img">
                <img src="images/sales/1.png" alt="furniture" />
              </div>
              <a className="item-sales__title" href="product.html">
                Валенсия Beige Валенсия Beige Валенсия Beige
              </a>
              <a className="item-sales__type" href="catalog.html">
                Барные стулья
              </a>
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
              <a className="item-sales__title" href="product.html">
                Толикс-2 White Gloss
              </a>
              <a className="item-sales__type" href="catalog.html">
                Барные стулья
              </a>
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
              <a className="item-sales__title" href="product.html">
                Валенсия Beige
              </a>
              <a className="item-sales__type" href="catalog.html">
                Барные стулья
              </a>
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
              <a className="item-sales__title" href="product.html">
                Кускен Navy Blue
              </a>
              <a className="item-sales__type" href="catalog.html">
                Диваны
              </a>
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
          <div className="sales__item item-sales">
            <button className="item-sales__like"></button>
            <div className="item-sales__box">
              <div className="item-sales__img">
                <img src="images/sales/1.png" alt="furniture" />
              </div>
              <a className="item-sales__title" href="product.html">
                Валенсия Beige Валенсия Beige Валенсия Beige
              </a>
              <a className="item-sales__type" href="catalog.html">
                Барные стулья
              </a>
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
              <a className="item-sales__title" href="product.html">
                Толикс-2 White Gloss
              </a>
              <a className="item-sales__type" href="catalog.html">
                Барные стулья
              </a>
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
              <a className="item-sales__title" href="product.html">
                Валенсия Beige
              </a>
              <a className="item-sales__type" href="catalog.html">
                Барные стулья
              </a>
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
              <a className="item-sales__title" href="product.html">
                Кускен Navy Blue
              </a>
              <a className="item-sales__type" href="catalog.html">
                Диваны
              </a>
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

          <div className="sales__item item-sales">
            <button className="item-sales__like"></button>
            <div className="item-sales__box">
              <div className="item-sales__img">
                <img src="images/sales/1.png" alt="furniture" />
              </div>
              <a className="item-sales__title" href="product.html">
                Валенсия Beige Валенсия Beige Валенсия Beige
              </a>
              <a className="item-sales__type" href="catalog.html">
                Барные стулья
              </a>
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
              <a className="item-sales__title" href="product.html">
                Толикс-2 White Gloss
              </a>
              <a className="item-sales__type" href="catalog.html">
                Барные стулья
              </a>
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
              <a className="item-sales__title" href="product.html">
                Валенсия Beige
              </a>
              <a className="item-sales__type" href="catalog.html">
                Барные стулья
              </a>
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
              <a className="item-sales__title" href="product.html">
                Кускен Navy Blue
              </a>
              <a className="item-sales__type" href="catalog.html">
                Диваны
              </a>
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

          <div className="sales__item item-sales">
            <button className="item-sales__like"></button>
            <div className="item-sales__box">
              <div className="item-sales__img">
                <img src="images/sales/1.png" alt="furniture" />
              </div>
              <a className="item-sales__title" href="product.html">
                Валенсия Beige Валенсия Beige Валенсия Beige
              </a>
              <a className="item-sales__type" href="catalog.html">
                Барные стулья
              </a>
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
              <a className="item-sales__title" href="product.html">
                Толикс-2 White Gloss
              </a>
              <a className="item-sales__type" href="catalog.html">
                Барные стулья
              </a>
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
              <a className="item-sales__title" href="product.html">
                Валенсия Beige
              </a>
              <a className="item-sales__type" href="catalog.html">
                Барные стулья
              </a>
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
              <a className="item-sales__title" href="product.html">
                Кускен Navy Blue
              </a>
              <a className="item-sales__type" href="catalog.html">
                Диваны
              </a>
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

          <div className="sales__item item-sales">
            <button className="item-sales__like"></button>
            <div className="item-sales__box">
              <div className="item-sales__img">
                <img src="images/sales/1.png" alt="furniture" />
              </div>
              <a className="item-sales__title" href="product.html">
                Валенсия Beige Валенсия Beige Валенсия Beige
              </a>
              <a className="item-sales__type" href="catalog.html">
                Барные стулья
              </a>
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
              <a className="item-sales__title" href="product.html">
                Толикс-2 White Gloss
              </a>
              <a className="item-sales__type" href="catalog.html">
                Барные стулья
              </a>
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
              <a className="item-sales__title" href="product.html">
                Валенсия Beige
              </a>
              <a className="item-sales__type" href="catalog.html">
                Барные стулья
              </a>
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
              <a className="item-sales__title" href="product.html">
                Кускен Navy Blue
              </a>
              <a className="item-sales__type" href="catalog.html">
                Диваны
              </a>
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
  );
};

export default Sales;
