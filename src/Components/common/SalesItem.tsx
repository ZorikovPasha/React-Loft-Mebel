import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { addFavoritesActionCreator } from "../../redux/actions/favorites";
import { addtemsActionCreator } from "../../redux/actions/cartItems";
import { ProductType } from "../../types";
import { getIsAuth } from "../../redux/getters";
import { UserApiClient } from "../../services/api";

interface ISalesItemProps {
  product: ProductType;
  baseDir: string,
  isFavorite: boolean,
}

const SalesItem: React.FC<ISalesItemProps> = ({ product, isFavorite, baseDir }) => {
  const { id, imageUrl, name, type, priceOld, priceNew, dimensions, sale, colors } = product;

  const dispatch = useDispatch();
  const router = useHistory();
  const isAuth = useSelector(getIsAuth);

  const onLikeProductClick = () => {
    dispatch(addFavoritesActionCreator([id]));

    if (isAuth ) {
      UserApiClient.sendFavoriteItem(id);
    }
  };

  const onProductLinkClick = (): void => {
    router.push(`/products/${id}`);
  }

  const onAddToCartClick = async () => {
    dispatch(addtemsActionCreator([{
        id: id,
        colors: [colors[0]],
        quintity: 1,
        dimensions: {
          width: dimensions.width,
          length: dimensions.length,
          height: dimensions.height,
        },
        price: priceNew,
      }])
    );
    if (!isAuth) return;

    UserApiClient.addItemToCart({
      id: id,
      colors: [colors[0]],
      quintity: 1,
      dimensions: {
        width: dimensions.width,
        length: dimensions.length,
        height: dimensions.height,
      },
      price: priceNew,
    })
  };

  return (
    <div className="sales__item item-sales" >
      {sale &&
        <div className="item-sales__label label-sales">
          <div className="label-sales__body">-{sale}</div>
        </div>
      }
      <button 
        className={`item-sales__like ${isFavorite ? 'active' : ''}`} 
        onClick={onLikeProductClick}
      />
      <div className="item-sales__box">
        <div className="item-sales__img">
          <img src={baseDir + imageUrl} alt="furniture" />
        </div>
        <h5
          className="item-sales__title"
          onClick={onProductLinkClick}
        >
          {name}
        </h5>
        <p className="item-sales__type">{type.label}</p>
        <div className="item-sales__price">
          <p className="item-sales__price-new">{priceNew} ₽</p>
          <p className="item-sales__price-old">{!!priceOld && priceOld + " ₽"}</p>
        </div>
        <div className="item-sales__bottom">
          <p className="item-sales__text">Размеры</p>
          <div className="item-sales__line">
            <div className="item-sales__size">
              <p className="item-sales__val">ШИРИНА</p>
              <p className="item-sales__num">{dimensions.width} СМ</p>
            </div>
            <div className="item-sales__size">
              <p className="item-sales__val">ГЛУБИНА</p>
              <p className="item-sales__num">{dimensions.length} СМ</p>
            </div>
            <div className="item-sales__size">
              <p className="item-sales__val">ВЫСОТА</p>
              <p className="item-sales__num">{dimensions.height} СМ</p>
            </div>
          </div>
          <button 
            className="item-sales__tocart" 
            onClick={onAddToCartClick}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SalesItem);
