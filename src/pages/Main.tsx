import React, { FC } from "react";

import { Header, Footer, Top, Sales } from "../Components";

import '../scss/_reset.scss';
import '../scss/_global.scss';
import '../scss/_mobile.scss';
import "../scss/_header.scss";
import '../scss/_select.scss'; 
import '../scss/_rangeSlider.scss'; 
import '../scss/main.scss';

const Main: FC = () => {
  return (
    <div className="wrapper">
      <Header showHeaderTop items={[
        'Главная',
        'О нас',
        'Контакты',
      ]}></Header>

      <main className="main">
        <Top></Top>
        <Sales></Sales>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default Main;
