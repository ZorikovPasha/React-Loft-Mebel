import React, { FC } from "react";

import { RootState } from "../redux/store";
import { ProductType } from "../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsThunkCreator } from "../redux/actions/items";
import { Header, Footer, SalesItem, ProductCard } from "../Components";

import "../../node_modules/slick-carousel/slick/slick.css";
import "../scss/_reset.scss";
import "../scss/_global.scss";
import "../scss/product.scss";

const Product: FC = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchItemsThunkCreator());
  }, []);

  const currentId = useSelector((state: RootState) => state.currentProductReducer.id);
  const items = useSelector((state: RootState) => state.itemsReducer.items);
  const [ currentProduct ] = items.filter((item: ProductType) => item.id === currentId )
  
  return (
    <div className="wrapper">
      <Header headerMidTaller items={["Главная", "О нас", "Контакты"]}></Header>
      <main className="main">
        <div className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href="#">
                  Главная
                </a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href="#">
                  Гостинные
                </a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href="#">
                  Мягкая мебель
                </a>
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
        {currentProduct && 
          <ProductCard product={currentProduct}></ProductCard>}
        {currentProduct && 
          <section className="product-tabs">
          <div className="container">
            <div className="product-tabs__inner">
              <div className="product-tabs__toggle">
                <a className="product-tabs__title active" href="#features">
                  Характеристики
                </a>
                <a className="product-tabs__title" href="#reviews">
                  Отзывы
                </a>
                <a className="product-tabs__title" href="#delivery">
                  Доставка и оплата
                </a>
              </div>

              <div className="product-tabs__content">
                <div className="product-tabs__content-item product-content active" id="features">
                  <div className="product-content__box">
                    <div className="product-content__row">
                      <div className="product-content__line">
                        <p className="product-content__text product-content__text--left">Размер</p>
                        <div className="product-content__dots"></div>
                      </div>
                      <p className="product-content__text product-content__text--right">
                        218 × 95 × 90 <span>(Дл. × Шир. × Выс.)</span>{" "}
                      </p>
                    </div>

                    <div className="product-content__row">
                      <div className="product-content__line">
                        <p className="product-content__text product-content__text--left">Спальное место</p>
                        <div className="product-content__dots"></div>
                      </div>
                      <p className="product-content__text product-content__text--right">
                        195 × 144 × 44 <span>(Дл. × Шир. × Выс.)</span>
                      </p>
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
                      <p className="product-content__text product-content__text--right">
                        218 × 95 × 90 <span>(Дл. × Шир. × Выс.)</span>{" "}
                      </p>
                    </div>

                    <div className="product-content__row">
                      <div className="product-content__line">
                        <p className="product-content__text product-content__text--left">Спальное место</p>
                        <div className="product-content__dots"></div>
                      </div>
                      <p className="product-content__text product-content__text--right">
                        195 × 144 × 44 <span>(Дл. × Шир. × Выс.)</span>
                      </p>
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
                      <p className="product-content__text product-content__text--right">
                        218 × 95 × 90 <span>(Дл. × Шир. × Выс.)</span>{" "}
                      </p>
                    </div>

                    <div className="product-content__row">
                      <div className="product-content__line">
                        <p className="product-content__text product-content__text--left">Спальное место</p>
                        <div className="product-content__dots"></div>
                      </div>
                      <p className="product-content__text product-content__text--right">
                        195 × 144 × 44 <span>(Дл. × Шир. × Выс.)</span>
                      </p>
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
        </section> }


        <section className="sales">
          <div className="container">
            <h3 className="sales__title">Хиты продаж</h3>
            <div className="sales__items sales__items--product">
            {items.filter((item: ProductType) => item.rating > 4.1).map((product: ProductType) => (
                <SalesItem key={product.id} product={product}></SalesItem>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default Product;
