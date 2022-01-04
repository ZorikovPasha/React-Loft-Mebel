import React, { FC, MouseEventHandler, useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import { useDispatch, useSelector } from "react-redux";

import { favoritesActionCreator } from "../redux/actions/favorites";
import { RootState } from "../redux/store";
import { cartItemsActionCreator } from "../redux/actions/cartItems";

import { ProductType } from "../types";

interface IProductCardProps {
  product: ProductType;
}

const SliderPrevArrow: FC = () => {
  return (
    <button className="slick-btn slick-prev">
      <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 1L1.5 7L7.5 13" stroke="black" strokeLinecap="square" />
      </svg>
    </button>
  );
};

const SliderNextArrow: FC = () => {
  return (
    <button className="slick-btn slick-next">
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 13L7 7L1 1" stroke="black" strokeLinecap="square" />
      </svg>
    </button>
  );
};

const slider1Settings: Settings = {
  arrows: false,
  fade: true,
  swipe: false,
};

const slider2Settings: Settings = {
  variableWidth: true,
  infinite: false,
  focusOnSelect: true,
  prevArrow: <SliderPrevArrow />,
  nextArrow: <SliderNextArrow />,
  responsive: [
    {
      breakpoint: 511,
      settings: {
        arrows: false,
      },
    },
  ],
};

const ProuctCard: FC<IProductCardProps> = ({ product }) => {
  const { id, thumbsUrls, imageUrl, name, type, priceNew, colors, dimensions } = product;

  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const dispatch = useDispatch();

  const [nav1, setNav1] = useState<Slider>();
  const [nav2, setNav2] = useState<Slider>();

  const favoriteBtnRef = useRef<HTMLButtonElement>(null);
  const selectQuintityRef = useRef<HTMLSelectElement>(null);
  const selectColorRef = useRef<HTMLSelectElement>(null);

  const onAddToFavoriteClick: MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault();
    dispatch(favoritesActionCreator(id));
  };

  const onBuyClick: MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault();
    const productColors: number[] = [];

    colors.map((_, index) => {
      if (selectColorRef?.current?.selectedIndex === index) {
        productColors.push(1);
      } else {
        productColors.push(0);
      }
    });

    dispatch(
      cartItemsActionCreator({
        id: id,
        colors: [...productColors],
        quintity: Number(selectQuintityRef?.current?.options[selectQuintityRef.current.selectedIndex].value),
        dimensions: {
          width: dimensions.width,
          length: dimensions.length,
          height: dimensions.height,
        },
        price: priceNew,
      })
    );
  };

  return (
    <section className="product">
      <div className="container">
        <div className="product__inner">
          <div className="product__images">
            <Slider 
              className="product__slider" 
              asNavFor={nav2} 
              ref={(slider1: Slider) => setNav1(slider1)}
              {...slider1Settings}>
              {thumbsUrls.map((url) => (
                <div className="product__slider-item" key={url}>
                  <img src={imageUrl} alt="furniture" />
                </div>
              ))}
            </Slider>
            <Slider 
              className="product__thumbs" 
              asNavFor={nav1} 
              ref={(slider2: Slider) => setNav2(slider2)} 
              {...slider2Settings}>
              {thumbsUrls.map((url) => (
                <div className="product__thumb" key={url}>
                  <img src={imageUrl} alt="furniture thumb" />
                </div>
              ))}
            </Slider>
          </div>
          <div className="product__info info">
            <div className="info__star" data-rateyo-rating="4"></div>
            <h1 className="info__title">{name}</h1>
            <p className="info__category">{type}</p>
            <form action="">
              <div className="info__shop shop">
                <p className="shop__price">{priceNew} P</p>
                <button 
                  className="shop__btn" 
                  type="submit" 
                  onClick={onBuyClick}>
                  Купить
                </button>
                <button 
                  className={favorites && favorites.includes(id) ? "shop__wish active" : "shop__wish"} 
                  ref={favoriteBtnRef} 
                  onClick={onAddToFavoriteClick}>
                  Добавить в желаемое
                </button>
              </div>
              <div className="info__features features">
                <div className="features__col features__col--color">
                  <p className="features__title">Цвет</p>
                  <select 
                    className="features__select-color color-select select" 
                    ref={selectColorRef}>
                    {colors.map((color) => (
                      <option className="color-select__option" value={color} key={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="features__col features__col--quintity">
                  <p className="features__title">Количество</p>
                  <select 
                    className="features__select-quintity quintity-select select" 
                    ref={selectQuintityRef}>
                    <option className="quintity-select__option" value="1">
                      1
                    </option>
                    <option className="quintity-select__option" value="2">
                      2
                    </option>
                    <option className="quintity-select__option" value="3">
                      3
                    </option>
                    <option className="quintity-select__option" value="4">
                      4
                    </option>
                    <option className="quintity-select__option" value="5">
                      5
                    </option>
                  </select>
                </div>
                <div className="features__col features__col--size">
                  <p className="features__title">Размер (Д × Ш × В)</p>
                  <select className="size-select select">
                    <option className="size-select__option" value="218-95-90">
                      {dimensions.width} CM × {dimensions.length} CM × {dimensions.height} CM
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
  );
};

export default ProuctCard;
