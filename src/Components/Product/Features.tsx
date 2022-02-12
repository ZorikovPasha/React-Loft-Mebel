import React from "react";

type featureItemType = {
  feature: string;
  value: string;
};

interface IFeaturesTabProps {
  features: featureItemType[];
};

const FeaturesTab: React.FC<IFeaturesTabProps> = ({ features }) => {
  return (
    <div className="product-tabs__content-item product-content">
      <div className="product-content__box">
        <div className="product-content__row">
          <div className="product-content__line">
            <p className="product-content__text product-content__text--left">Размер</p>
            <div className="product-content__dots"></div>
          </div>
          <p className="product-content__text product-content__text--right">
            218 × 95 × 90 <span>(Дл. × Шир. × Выс.)</span>
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
    </div>
  );
};

export default FeaturesTab;
