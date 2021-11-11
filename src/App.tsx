import React from 'react'
import './App.css'

function App() {
  return (
    <div className="wrapper">
      <div className="mob-menu">
        <div className="mob-menu__body">
          <div className="mob-menu__top">
            <h5 className="mob-menu__title">Меню</h5>
            <button className="mob-menu__close">
              <img src="images/mob-menu/close.svg" alt="close" />
            </button>
          </div>
          <ul className="mob-menu__list">
            <li className="mob-menu__list-item">
              <a className="mob-menu__link" href="main.html">
                <span>
                  <img src="images/mob-menu/home.svg" alt="" />
                </span>
                Главная
              </a>
            </li>
            <li className="mob-menu__list-item ">
              <a className="mob-menu__link" href="about.html">
                <span>
                  <img src="images/mob-menu/info.svg" alt="" />
                </span>
                О нас
              </a>
            </li>
            <li className="mob-menu__list-item">
              <a className="mob-menu__link" href="contacts.html">
                <span>
                  <img src="images/mob-menu/contacts.svg" alt="" />
                </span>
                Контакты
              </a>
            </li>
          </ul>
          <p className="mob-menu__subtitle">Категории</p>
          <ul className="mob-menu__list">
            <li className="mob-menu__list-item">
              <a className="mob-menu__link" href="catalog.html">
                <span>
                  <img src="images/mob-menu/kitchen.svg" alt="" />
                </span>
                Кухни
              </a>
            </li>
            <li className="mob-menu__list-item">
              <a className="mob-menu__link" href="catalog.html">
                <span>
                  <img src="images/mob-menu/bedroom.svg" alt="" />
                </span>
                Спальни
              </a>
            </li>
            <li className="mob-menu__list-item">
              <a className="mob-menu__link" href="catalog.html">
                <span>
                  <img src="images/mob-menu/livingroom.svg" alt="" />
                </span>
                Гостинные
              </a>
            </li>
            <li className="mob-menu__list-item">
              <a className="mob-menu__link" href="catalog.html">
                <span>
                  <img src="images/mob-menu/closet.svg" alt="" />
                </span>
                Прихожие
              </a>
            </li>
            <li className="mob-menu__list-item">
              <a className="mob-menu__link" href="catalog.html">
                <span>
                  <img src="images/mob-menu/office.svg" alt="" />
                </span>
                Офисная мебель
              </a>
            </li>
            <li className="mob-menu__list-item">
              <a className="mob-menu__link" href="catalog.html">
                <span>
                  <img src="images/mob-menu/childrensroom.svg" alt="" />
                </span>
                Детская
              </a>
            </li>
            <li className="mob-menu__list-item">
              <a className="mob-menu__link promo" href="catalog.html">
                <span>
                  <img src="images/mob-menu/promo.svg" alt="" />
                </span>
                Акция
              </a>
            </li>
            <li className="mob-menu__list-item">
              <a className="mob-menu__link" href="catalog.html">
                <span>
                  <img src="images/mob-menu/new.svg" alt="" />
                </span>
                Новинки
              </a>
            </li>
            <li className="mob-menu__list-item">
              <a className="mob-menu__link" href="catalog.html">
                <span>
                  <img src="images/mob-menu/mattress.svg" alt="" />
                </span>
                Матрасы
              </a>
            </li>
            <li className="mob-menu__list-item">
              <a className="mob-menu__link" href="catalog.html">
                <span>
                  <img src="images/mob-menu/armchair.svg" alt="" />
                </span>
                Мягкая мебель
              </a>
            </li>
            <li className="mob-menu__list-item">
              <a className="mob-menu__link" href="catalog.html">
                <span>
                  <img src="images/mob-menu/cupboard.svg" alt="" />
                </span>
                Шкафы
              </a>
            </li>
          </ul>
        </div>
      </div>

      <main className="main">
        <section className="top">
          <div className="container">
            <div className="top__slider animate__animated animate__fadeIn animate__delay-1s">
              <div className="top__slider-item">
                <div className="top__slider-box">
                  <h1 className="top__title animate__animated animate__fadeIn animate__delay-2s">
                    loft мебель
                  </h1>
                  <p className="top__subtitle animate__animated animate__fadeIn animate__delay-3s">
                    Современная и удобная мебель в Анапе
                  </p>
                  <a
                    className="top__btn animate__animated animate__fadeIn animate__delay-3s"
                    href="catalog.html"
                  >
                    СМОТРЕТЬ КАТАЛОГ
                  </a>
                </div>
              </div>
              <div className="top__slider-item">
                <div className="top__slider-box">
                  <h1 className="top__title">loft мебель</h1>
                  <p className="top__subtitle">
                    Современная и удобная мебель в Анапе
                  </p>
                  <a className="top__btn" href="catalog.html">
                    СМОТРЕТЬ КАТАЛОГ
                  </a>
                </div>
              </div>
              <div className="top__slider-item">
                <div className="top__slider-box">
                  <h1 className="top__title">loft мебель</h1>
                  <p className="top__subtitle">
                    Современная и удобная мебель в Анапе
                  </p>
                  <a className="top__btn" href="catalog.html">
                    СМОТРЕТЬ КАТАЛОГ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
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
                    <button className="item-sales__tocart">
                      Добавить в корзину
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <div className="footer__main">
              <div className="footer__column">
                <p className="footer__title">НАВИГАЦИЯ</p>
                <div className="footer__box">
                  <ul className="footer__list">
                    <li className="footer__list-item">
                      <a className="footer__list-link" href="catalog.hmtl">
                        Кухни
                      </a>
                    </li>
                    <li className="footer__list-item">
                      <a className="footer__list-link" href="catalog.hmtl">
                        Спальни
                      </a>
                    </li>
                    <li className="footer__list-item">
                      <a className="footer__list-link" href="catalog.hmtl">
                        Гостинные
                      </a>
                    </li>
                  </ul>
                  <ul className="footer__list">
                    <li className="footer__list-item">
                      <a className="footer__list-link" href="catalog.hmtl">
                        Прихожие
                      </a>
                    </li>
                    <li className="footer__list-item">
                      <a className="footer__list-link" href="catalog.hmtl">
                        Офисная мебель
                      </a>
                    </li>
                    <li className="footer__list-item">
                      <a className="footer__list-link" href="catalog.hmtl">
                        Детская
                      </a>
                    </li>
                  </ul>
                  <ul className="footer__list">
                    <li className="footer__list-item">
                      <a className="footer__list-link" href="catalog.hmtl">
                        Шкафы
                      </a>
                    </li>
                    <li className="footer__list-item">
                      <a className="footer__list-link" href="catalog.hmtl">
                        Матрасы
                      </a>
                    </li>
                    <li className="footer__list-item">
                      <a className="footer__list-link" href="catalog.hmtl">
                        Мягкая мебель
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="footer__column footer__column--common">
                <div className="footer__logo">
                  <img src="images/icons/footer-logo.svg" alt="logo" />
                </div>
                <p className="footer__address">
                  г. Анапа, Анапское шоссе, 30 Ж/К Черное море
                </p>
              </div>
            </div>
            <div className="footer__bottom bottom-footer">
              <div className="bottom-footer__left">
                <a
                  className="bottom-footer__text bottom-footer__text--promo"
                  href="catalog.html"
                >
                  Акция
                </a>
                <a className="bottom-footer__text" href="catalog.html">
                  Новинки
                </a>
              </div>
              <div className="bottom-footer__contacts">
                <a className="bottom-footer__phone" href="tel:89648999119">
                  8 (964) 89 99 119
                </a>
                <a className="bottom-footer__link" href="#">
                  INSTAGRAM
                </a>
                <a
                  className="bottom-footer__mail"
                  href="mailto:mebel_loft_anapa@mail.ru"
                >
                  mebel_loft_anapa@mail.ru
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
    )
}

export default App;
