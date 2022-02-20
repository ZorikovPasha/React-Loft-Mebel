import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Header, SalesItem, CartItem, Breadcrumbs, Empty } from "../Components";

import { fetchItemsThunkCreator } from "../redux/actions/items";
import { getCartItems, getQuintity, getTotalCost, getFavorites, getProducts } from "../redux/getters";
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';

import { IPageProps } from "../types"; 

interface ICartProps extends IPageProps {};

const Cart: React.FC<ICartProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector(getCartItems);
  const quintity = useSelector(getQuintity);
  const total = useSelector(getTotalCost);
  const items = useSelector(getProducts);
  const favorites = useSelector(getFavorites);

  React.useEffect(() => {
    dispatch(fetchItemsThunkCreator());
  }, [dispatch]);

  const breadcrumbs = useBreadcrumbs();

  return (
    <>
      <Header 
        isMobMenuOpen={isMobMenuOpen}
        setMobMenuOpen={setMobMenuOpen}
       />
      <main className="main">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <section className="cart">
          <div className="container">
            {
              cartItems.length ?
              <>
                <div className="cart__top">
                  <p>Ваша корзина</p>
                  <p>
                    <span className="cart__top-num">Предметов: {quintity}</span>
                  </p>
                </div>
                {cartItems && 
                  cartItems.map(cartItem => {
                    const currItem = items.find(item => item.id === cartItem.id);
                    if (currItem) {
                      return (
                        <CartItem 
                          key={`${cartItem.id}_${cartItem.quintity}_${cartItem.colors.filter((_, idx) => idx)}`} 
                          cartItem={cartItem} 
                          item={currItem}
                        />
                      )}
                  })}
                <div className="cart__bottom">
                  <p className="cart__bottom-total">
                    Итоговая стоимость:
                    <span> {total} P</span>
                  </p>
                  <button className="cart__bottom-btn">Оформить заказ</button>
                </div>
              </>
              : <Empty text="Вы ничего не добавили в корзину(" />
            }

          </div>
        </section>
        {
          cartItems.length 
            ? (
              <section className="sales">
              <div className="container">
                <h3 className="sales__title">Вам может понравиться</h3>
                <div className="sales__items sales__items--cart">
                  {items && items.filter((item) => item.id < 4).map((product) => (
                    <SalesItem 
                      key={product.id} 
                      product={product}
                      baseDir={'../../../'}
                      isFavorite={favorites.includes(product.id)}
                      />
                  ))}
                </div>
              </div>
            </section>
            )
            : ''
        }
      </main>
    </>
  );
};

export default Cart;
