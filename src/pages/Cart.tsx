import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Header, SalesItem, CartItem } from "../components";

import { RootState } from "../redux/store";
import { fetchItemsThunkCreator } from "../redux/actions/items";
import { IPageProps } from "../types"; 

import "../scss/_reset.scss";
import "../scss/_global.scss";
import "../scss/cart.scss";

interface ICartProps extends IPageProps {};

const Cart: FC<ICartProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cartItems.cartItems);
  const quintity = useSelector((state: RootState) => state.cartItems.quintity);
  const total = useSelector((state: RootState) => state.cartItems.totalCost);
  const items = useSelector((state: RootState) => state.items.items);

  React.useEffect(() => {
    dispatch(fetchItemsThunkCreator());
  }, []);

  return (
    <>
      <Header 
        isMobMenuOpen={isMobMenuOpen}
        setMobMenuOpen={setMobMenuOpen}
      >
      </Header>

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
              cartItems.map((cartItem) => {
                const currItem = items.find(item => item.id === cartItem.id);
                if (currItem) {
                  return (
                    <CartItem 
                    key={`${cartItem.id}_${cartItem.quintity}_${cartItem.colors.filter((_, idx) => idx)}`} 
                    cartItem={cartItem} 
                    item={currItem}>
                    </CartItem>
                  )}
              })}
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
              {items.filter((item) => item.id < 4).map((product) => (
                <SalesItem key={product.id} product={product}></SalesItem>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Cart;
