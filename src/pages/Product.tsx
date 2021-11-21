import React, { FC } from 'react';

import { Header, Footer, MobMenu} from '../Components';

import "../../node_modules/slick-carousel/slick/slick.css";
import '../scss/_reset.scss';
import '../scss/_global.scss';
import '../scss/product.scss';

const Product: FC = () => {

return (
  <div className="wrapper">
    
    <Header showHeaderTop items={[
        'Главная',
        'О нас',
        'Контакты'
      ]}></Header>
  <MobMenu></MobMenu>

  <main className="main">
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <a className="breadcrumbs__link" href="#">Главная</a>
          </li>
          <li className="breadcrumbs__item">
            <a className="breadcrumbs__link" href="#">Гостинные</a>
          </li>
          <li className="breadcrumbs__item">
            <a className="breadcrumbs__link" href="#">Мягкая мебель</a>
          </li>
          <li className="breadcrumbs__item">
            <a className="breadcrumbs__item-back" href="catalog.html">
              <img src="images/icons/arrow-back.svg" alt="back" />
            </a>
            <span className="breadcrumbs__link">Диваны</span>
          </li>
        </ul>  
      </div>
    </div>

    <section className="product">
      <div className="container">
        <div className="product__inner">
          <div className="product__images">
            <div className="product__slider">
              <div className="product__slider-item">
                <img src="images/product/1.png" alt="furniture" />
              </div>
              <div className="product__slider-item">
                <img src="images/product/1.png" alt="furniture" />
              </div>
              <div className="product__slider-item">
                <img src="images/product/1.png" alt="furniture" />
              </div>
              <div className="product__slider-item">
                <img src="images/product/1.png" alt="furniture" />
              </div>
              <div className="product__slider-item">
                <img src="images/product/1.png" alt="furniture" />
              </div>
              <div className="product__slider-item">
                <img src="images/product/1.png" alt="furniture" />
              </div>
            </div>
            <div className="product__thumbs">
              <div className="product__thumb">
                <img src="images/product/thumbs/1.png" alt="furniture thumb" />
              </div>
              <div className="product__thumb">
                <img src="images/product/thumbs/2.png" alt="furniture thumb" />
              </div>
              <div className="product__thumb">
                <img src="images/product/thumbs/3.png" alt="furniture thumb" />
              </div>
              <div className="product__thumb">
                <img src="images/product/thumbs/4.png" alt="furniture thumb" />
              </div>
              <div className="product__thumb">
                <img src="images/product/thumbs/5.png" alt="furniture thumb" />
              </div>
              <div className="product__thumb">
                <img src="images/product/thumbs/1.png" alt="furniture thumb" />
              </div>
            </div>
          </div>
          <div className="product__info info">
            <div className="info__star" data-rateyo-rating="4"></div>
            <h1 className="info__title">Динс Velvet Yellow</h1>
            <p className="info__category">Диваны</p>
            <form action="">
              <div className="info__shop shop">
                <p className="shop__price">4 690₽</p>
                <button className="shop__btn" type="submit">Купить</button>
                <button className="shop__wish">Добавить в желаемое</button>
              </div>
              <div className="info__features features">
                <div className="features__col features__col--color">
                  <p className="features__title">Цвет</p>
                  <select className="features__select-color color-select select">
                    <option className="color-select__option" value="#FFC107">#FFC107</option>
                    <option className="color-select__option" value="#245462">#245462</option>
                    <option className="color-select__option" value="#D74444">#D74444</option>
                  </select>
                </div>

                <div className="features__col features__col--quintity">
                  <p className="features__title">Количество</p>
                  <select className="features__select-quintity quintity-select select">
                    <option className="quintity-select__option" value="1">1</option>
                    <option className="quintity-select__option" value="2">2</option>
                    <option className="quintity-select__option" value="3">3</option>
                    <option className="quintity-select__option" value="4">4</option>
                    <option className="quintity-select__option" value="5">5</option>
                  </select>
                </div>
                <div className="features__col features__col--size">
                  <p className="features__title">Размер (Д × Ш × В)</p>
                  <select className="size-select select">
                    <option className="size-select__option" value="218-95-90">
                      218 CM × 95 CM × 90 CM
                    </option>
                    <option className="size-select__option" value="240-112-140">
                      240 CM × 112 CM × 140 CM
                    </option>
                    <option className="size-select__option" value="260-130-160">
                      260 CM × 130 CM × 150 CM
                    </option>
                  </select>
                </div>
              </div>
            </form>
            <p className="info__text-title">Описание</p>
            <p className="info__text">Лаконичные линии и простые формы, безупречный стиль и индивидуальность – все это диван «Динс». Сдержанный скандинавский дизайн украсит любую современную обстановку. Элегантность, комфорт и функциональность, собранные воедино – «Динс» просто создан для размеренного отдыха в кругу семьи или компании друзей!</p>
          </div>
        </div>
      </div>
    </section>

    <section className="product-tabs">
      <div className="container">
        <div className="product-tabs__inner">
        
          <div className="product-tabs__toggle">
            <a className="product-tabs__title active" href="#features">Характеристики</a>
            <a className="product-tabs__title" href="#reviews">Отзывы</a>
            <a className="product-tabs__title" href="#delivery">Доставка и оплата</a>
          </div>

          <div className="product-tabs__content">
            <div className="product-tabs__content-item product-content active" id="features">
              <div className="product-content__box">
                  <div className="product-content__row">
                    <div className="product-content__line">
                      <p className="product-content__text product-content__text--left">Размер</p>
                      <div className="product-content__dots"></div>
                    </div>
                    <p className="product-content__text product-content__text--right">218 × 95 × 90 <span>(Дл. × Шир. × Выс.)</span> </p>
                  </div>

                  <div className="product-content__row">
                    <div className="product-content__line">
                      <p className="product-content__text product-content__text--left">Спальное место</p>
                      <div className="product-content__dots"></div>
                    </div>
                    <p className="product-content__text product-content__text--right">195 × 144 × 44 <span>(Дл. × Шир. × Выс.)</span></p>
                  </div>

                  <div className="product-content__row">
                    <div className="product-content__line">
                      <p className="product-content__text product-content__text--left">Посадочное место</p>
                      <div className="product-content__dots"></div>
                    </div>
                    <p className="product-content__text product-content__text--right">50 × 44 (Глуб. × Выс.)</p>
                  </div>

                  <div className="product-content__row">
                    <div className="product-content__line">
                      <p className="product-content__text product-content__text--left">Каркас</p>
                      <div className="product-content__dots"></div>
                    </div>
                    <p className="product-content__text product-content__text--right">массив, фанера, ДВП, пружинная змейка</p>
                  </div>

                  <div className="product-content__row">
                    <div className="product-content__line">
                      <p className="product-content__text product-content__text--left">Механизм</p>
                      <div className="product-content__dots"></div>
                    </div>
                    <p className="product-content__text product-content__text--right">пантограф</p>
                  </div>

                  <div className="product-content__row">
                    <div className="product-content__line">
                      <p className="product-content__text product-content__text--left">Материал ножек</p>
                      <div className="product-content__dots"></div>
                    </div>
                    <p className="product-content__text product-content__text--right">массив</p>
                  </div>

                  <div className="product-content__row">
                    <div className="product-content__line">
                      <p className="product-content__text product-content__text--left">Наполнение подушек</p>
                      <div className="product-content__dots"></div>
                    </div>
                    <p className="product-content__text product-content__text--right">крошка ППУ, холлофайбер</p>
                  </div>
              </div>

              <div className="product-content__box">
                  <div className="product-content__row">
                    <div className="product-content__line">
                      <p className="product-content__text product-content__text--left">Бельевой ящик</p>
                      <div className="product-content__dots"></div>
                    </div>  
                    <p className="product-content__text product-content__text--right">есть</p>
                  </div>
                  <div className="product-content__row">
                    <div className="product-content__line">
                      <p className="product-content__text product-content__text--left">Зарядное устройство USB</p>
                      <div className="product-content__dots"></div>
                    </div>  
                    <p className="product-content__text product-content__text--right">нет</p>
                  </div>

                  <div className="product-content__row">
                    <div className="product-content__line">
                      <p className="product-content__text product-content__text--left">Съемный чехол</p>
                      <div className="product-content__dots"></div>
                    </div>  
                    <p className="product-content__text product-content__text--right">нет</p>
                  </div>

                  <div className="product-content__row">
                    <div className="product-content__line">
                      <p className="product-content__text product-content__text--left">Декоративные подушки</p>
                      <div className="product-content__dots"></div>
                    </div>  
                    <p className="product-content__text product-content__text--right">есть</p>
                  </div>

                  <div className="product-content__row">
                    <div className="product-content__line">
                      <p className="product-content__text product-content__text--left">Вариант доставки</p>
                      <div className="product-content__dots"></div>
                    </div>  
                    <p className="product-content__text product-content__text--right">в разобранном виде</p>
                  </div>

                  <div className="product-content__row">
                    <div className="product-content__line">
                      <p className="product-content__text product-content__text--left">Производитель</p>
                      <div className="product-content__dots"></div>
                    </div>
                    <p className="product-content__text product-content__text--right">Россия</p>
                  </div>

              </div>
            </div>
            <div className="product-tabs__content-item product-content" id="reviews">
              <div className="product-content__box">
                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Размер</p>
                    <div className="product-content__dots"></div>
                  </div>
                  <p className="product-content__text product-content__text--right">218 × 95 × 90 <span>(Дл. × Шир. × Выс.)</span> </p>
                </div>

                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Спальное место</p>
                    <div className="product-content__dots"></div>
                  </div>
                  <p className="product-content__text product-content__text--right">195 × 144 × 44 <span>(Дл. × Шир. × Выс.)</span></p>
                </div>

                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Посадочное место</p>
                    <div className="product-content__dots"></div>
                  </div>
                  <p className="product-content__text product-content__text--right">50 × 44 (Глуб. × Выс.)</p>
                </div>

                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Каркас</p>
                    <div className="product-content__dots"></div>
                  </div>
                  <p className="product-content__text product-content__text--right">массив, фанера, ДВП, пружинная змейка</p>
                </div>

                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Механизм</p>
                    <div className="product-content__dots"></div>
                  </div>
                  <p className="product-content__text product-content__text--right">пантограф</p>
                </div>

                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Материал ножек</p>
                    <div className="product-content__dots"></div>
                  </div>
                  <p className="product-content__text product-content__text--right">массив</p>
                </div>

                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Наполнение подушек</p>
                    <div className="product-content__dots"></div>
                  </div>
                  <p className="product-content__text product-content__text--right">крошка ППУ, холлофайбер</p>
                </div>
            </div>

            <div className="product-content__box">
                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Бельевой ящик</p>
                    <div className="product-content__dots"></div>
                  </div>  
                  <p className="product-content__text product-content__text--right">есть</p>
                </div>
                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Зарядное устройство USB</p>
                    <div className="product-content__dots"></div>
                  </div>  
                  <p className="product-content__text product-content__text--right">нет</p>
                </div>

                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Съемный чехол</p>
                    <div className="product-content__dots"></div>
                  </div>  
                  <p className="product-content__text product-content__text--right">нет</p>
                </div>

                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Декоративные подушки</p>
                    <div className="product-content__dots"></div>
                  </div>  
                  <p className="product-content__text product-content__text--right">есть</p>
                </div>

                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Вариант доставки</p>
                    <div className="product-content__dots"></div>
                  </div>  
                  <p className="product-content__text product-content__text--right">в разобранном виде</p>
                </div>

                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Производитель</p>
                    <div className="product-content__dots"></div>
                  </div>
                  <p className="product-content__text product-content__text--right">Россия</p>
                </div>

            </div>
            </div>
            <div className="product-tabs__content-item product-content" id="delivery">
              <div className="product-content__box">
                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Размер</p>
                    <div className="product-content__dots"></div>
                  </div>
                  <p className="product-content__text product-content__text--right">218 × 95 × 90 <span>(Дл. × Шир. × Выс.)</span> </p>
                </div>

                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Спальное место</p>
                    <div className="product-content__dots"></div>
                  </div>
                  <p className="product-content__text product-content__text--right">195 × 144 × 44 <span>(Дл. × Шир. × Выс.)</span></p>
                </div>

                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Посадочное место</p>
                    <div className="product-content__dots"></div>
                  </div>
                  <p className="product-content__text product-content__text--right">50 × 44 (Глуб. × Выс.)</p>
                </div>

                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Каркас</p>
                    <div className="product-content__dots"></div>
                  </div>
                  <p className="product-content__text product-content__text--right">массив, фанера, ДВП, пружинная змейка</p>
                </div>

                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Механизм</p>
                    <div className="product-content__dots"></div>
                  </div>
                  <p className="product-content__text product-content__text--right">пантограф</p>
                </div>

                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Материал ножек</p>
                    <div className="product-content__dots"></div>
                  </div>
                  <p className="product-content__text product-content__text--right">массив</p>
                </div>

                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Наполнение подушек</p>
                    <div className="product-content__dots"></div>
                  </div>
                  <p className="product-content__text product-content__text--right">крошка ППУ, холлофайбер</p>
                </div>
            </div>

            <div className="product-content__box">
                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Бельевой ящик</p>
                    <div className="product-content__dots"></div>
                  </div>  
                  <p className="product-content__text product-content__text--right">есть</p>
                </div>
                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Зарядное устройство USB</p>
                    <div className="product-content__dots"></div>
                  </div>  
                  <p className="product-content__text product-content__text--right">нет</p>
                </div>

                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Съемный чехол</p>
                    <div className="product-content__dots"></div>
                  </div>  
                  <p className="product-content__text product-content__text--right">нет</p>
                </div>

                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Декоративные подушки</p>
                    <div className="product-content__dots"></div>
                  </div>  
                  <p className="product-content__text product-content__text--right">есть</p>
                </div>

                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Вариант доставки</p>
                    <div className="product-content__dots"></div>
                  </div>  
                  <p className="product-content__text product-content__text--right">в разобранном виде</p>
                </div>

                <div className="product-content__row">
                  <div className="product-content__line">
                    <p className="product-content__text product-content__text--left">Производитель</p>
                    <div className="product-content__dots"></div>
                  </div>
                  <p className="product-content__text product-content__text--right">Россия</p>
                </div>

            </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>

    <section className="sales">
      <div className="container">
        <h3 className="sales__title">Хиты продаж</h3>
        <div className="sales__items sales__items--product">
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

export default Product