import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { SalesItem, CartItem, Breadcrumbs, Empty, ModalInfo, Loader } from "../Components";
import { getCartItems, getQuintity, getTotalCost, getFavorites, 
  getProducts, getOrderStatus, getIsAuth, getCartLoadingState } from "../redux/getters";
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { UserApiClient } from "../services/api";
import { OrderInfoType } from "../types";
import { resetCartActionCreator } from "../redux/actions/cartItems";
import { setOrderStatusActionCreator } from "../redux/actions/cartItems";


const Cart: React.FC = () => {
  const [modalLoginOpened, setModalLoginOpened] = React.useState(false);
  const dispatch = useDispatch();

  const cartItems = useSelector(getCartItems);
  const quintity = useSelector(getQuintity);
  const total = useSelector(getTotalCost);
  const { items } = useSelector(getProducts);
  const { favorites } = useSelector(getFavorites);
  const isOrderMade = useSelector(getOrderStatus);
  const isAuth = useSelector(getIsAuth);
  const isLoaded = useSelector(getCartLoadingState);
  
  const breadcrumbs = useBreadcrumbs();

  const onRegisterOrder = () => {
    if (!isAuth) {
      setModalLoginOpened(true);
      document.body.classList.add("lock")
      return;
    }
    const orders: OrderInfoType[] = [];

    cartItems.forEach(({ id, dimensions, colors, quintity, price }) => {
      const item = items.find(item => item.id === id);

      if (item) {
        orders.push({
          id, 
          dimensions,
          colors,
          quintity,
          price,
          status: "В ожидании",
          date: Date.now(),
          name: item.name,
          imageUrl: item.imageUrl
        })
      }
    })
    UserApiClient.makeOrder(orders);
    cartItems.forEach(({ id }) => UserApiClient.removeCartItem(id));
    dispatch(resetCartActionCreator());
    dispatch(setOrderStatusActionCreator(true));
  }

  const onLoginModalClose:React.MouseEventHandler<HTMLButtonElement> = () => {
    setModalLoginOpened(false);
    document.body.classList.remove("lock")
  };

  return (
    <>
      { modalLoginOpened && <ModalInfo 
        text="Пожалуйста, войдите в свою учетную запись" 
        title="Мы не знаем, кто вы" 
        link="/login"
        onModalClose={onLoginModalClose}
        /> }
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section className="cart">
        <div className="container">
          {
            !isLoaded && isAuth
              ? <Loader />
              : !cartItems.length 
                ? <Empty text={`${isOrderMade ? 'Ваш заказ успешно добавлен!' : 'Вы ничего не добавили в корзину('}`} />
                :
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
                      <button 
                        className="cart__bottom-btn"
                        onClick={onRegisterOrder}
                        >Оформить заказ</button>
                    </div>
                  </>
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
    </>
  );
};

export default Cart;
