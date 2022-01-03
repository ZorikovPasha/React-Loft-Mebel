import React, { FC } from "react";

import { Header, Footer, Top, Sales } from "../Components";

import "../scss/style.scss";

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
