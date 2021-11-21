import React, { FC } from "react";

import TopSlider from "./TopSlider";

import topImg_1 from "../images/top-bg-1.jpg";
import topImg_2 from "../images/top-bg-2.jpg";
import topImg_3 from "../images/top-bg-3.jpg";

const Top: FC = () => {

  const texts = [
    { title: 'loft мебель', subtitle: 'Современная и удобная мебель в Анапе', button: 'СМОТРЕТЬ КАТАЛОГ', imageUrl: topImg_1 },
    { title: 'loft мебель', subtitle: 'Новые поступления в наш магазин', button: 'СМОТРЕТЬ КАТАЛОГ', imageUrl: topImg_2 },
    { title: 'loft мебель', subtitle: 'Большие скидки в связи с открытием магазина в Краснодаре', button: 'СМОТРЕТЬ КАТАЛОГ', imageUrl: topImg_3 }
  ]

  const [ slidersTexts, setSlidersTexts ] = React.useState([]);

  const getSlidersTexts = () => {


  }

  return (
    <section className="top">
      <div className="container">
        <TopSlider items={texts}></TopSlider>
      </div>
    </section>
  );
};

export default Top