import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../redux/store";
import { fetchItemsThunkCreator } from "../redux/actions/items";
import { ProductType } from "../redux/actions/items";

const Sales: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchItemsThunkCreator());
  }, []);

  const items = useSelector((state: RootState) => state.itemsReducer.items);

  return (
    <section className="sales">
      <div className="container">
        <h3 className="sales__title">Хиты продаж</h3>
        <div className="sales__items">
          {items.map((product: ProductType) => (
            <div className="sales__item item-sales" key={product.id}>
              {product.sale && (
                <div className="item-sales__label label-sales">
                  <div className="label-sales__body">-{product.sale}</div>
                </div>
              )}

              <button className="item-sales__like"></button>
              <div className="item-sales__box">
                <div className="item-sales__img">
                  <img src={product.imageUrl} alt="furniture" />
                </div>
                <Link to="product" className="item-sales__title">
                  {product.name}
                </Link>
                <Link to="catalog" className="item-sales__type">
                  {product.type}
                </Link>
                <div className="item-sales__price">
                  <p className="item-sales__price-new">{product.priceNew} ₽</p>
                  <p className="item-sales__price-old">{product.priceOld && product.priceOld + " ₽" }</p>
                </div>
                <div className="item-sales__bottom">
                  <p className="item-sales__text">Размеры</p>
                  <div className="item-sales__line">
                    <div className="item-sales__size">
                      <p className="item-sales__val">ШИРИНА</p>
                      <p className="item-sales__num">{product.dimensions.width} СМ</p>
                    </div>
                    <div className="item-sales__size">
                      <p className="item-sales__val">ГЛУБИНА</p>
                      <p className="item-sales__num">{product.dimensions.length} СМ</p>
                    </div>
                    <div className="item-sales__size">
                      <p className="item-sales__val">ВЫСОТА</p>
                      <p className="item-sales__num">{product.dimensions.height} СМ</p>
                    </div>
                  </div>
                  <button className="item-sales__tocart">Добавить в корзину</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sales;
