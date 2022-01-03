import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Header, Footer, SalesItem, CartItem } from "../Components";
import { RootState } from "../redux/store";
import { CartItemType, ProductType } from "../redux/types";
import { fetchItemsThunkCreator } from "../redux/actions/items";

import "../scss/_reset.scss";
import "../scss/_global.scss";
import "../scss/cart.scss";

const Cart: FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchItemsThunkCreator());
  }, []);

  const cartItems = useSelector((state: RootState) => state.cartItemsReducer.cartItems);
  const quintity = useSelector((state: RootState) => state.cartItemsReducer.quintity);
  const total = useSelector((state: RootState) => state.cartItemsReducer.totalCost);
  const items: ProductType[] = useSelector((state: RootState) => state.itemsReducer.items);

  return (
    <div className="wrapper">
      <Header items={["Главная", "О нас", "Контакты"]}></Header>

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
                <span className="cart__top-num">предметов {quintity}</span>
              </p>
            </div>
            {cartItems && 
              cartItems.map((cartItem: CartItemType) => (
              <CartItem key={`${cartItem.id}_${cartItem.quintity}_${cartItem.colors.filter((_, idx) => idx)}`} cartItem={cartItem} item={items.find(obj => obj.id === cartItem.id)}></CartItem>
            ))}

            <div className="cart__bottom">
              <p className="cart__bottom-total">
                Итоговая стоимость:
                <span> {total} P</span>
              </p>
              <button className="cart__bottom-btn">Оформить заказ</button>
            </div>
          </div>
        </section>

        <section className="sales">
          <div className="container">
            <h3 className="sales__title">Вам может понравиться</h3>
            <div className="sales__items sales__items--cart">
              {items.filter((item: ProductType) => item.id < 4).map((product: ProductType) => (
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

export default Cart;
