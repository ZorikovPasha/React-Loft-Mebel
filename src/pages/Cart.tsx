import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { SalesItem, CartItem, Breadcrumbs, Empty, Loader } from "../Components";
import { fetchItemsThunkCreator } from "../redux/actions/items";
import { getCartItems, getQuintity, getTotalCost, getFavorites, getProducts } from "../redux/getters";
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';


const Cart: React.FC = () => {
  const [isLoading, setIsloading] = React.useState(false);
  const dispatch = useDispatch();

  const cartItems = useSelector(getCartItems);
  const quintity = useSelector(getQuintity);
  const total = useSelector(getTotalCost);
  const items = useSelector(getProducts);
  const favorites = useSelector(getFavorites);

  React.useEffect(() => {
    setIsloading(true);
    dispatch(fetchItemsThunkCreator(''));
    setIsloading(false);
  }, [dispatch]);

  const breadcrumbs = useBreadcrumbs();

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section className="cart">
        <div className="container">
          {
            isLoading
              ? <Loader />
              : !isLoading && !cartItems?.length 
                ? <Empty text="Вы ничего не добавили в корзину(" />
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
                      <button className="cart__bottom-btn">Оформить заказ</button>
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
