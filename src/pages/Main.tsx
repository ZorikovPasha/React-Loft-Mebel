import React, { FC } from "react";

import { Header, Footer, MobMenu, Top, Sales } from "../Components";

import '../scss/_reset.scss'
import '../scss/_global.scss'
import '../scss/main.scss'



const Main: FC = () => {
  return (
    <div className="wrapper">
      <Header showHeaderTop items={[
        'Главная',
        'О нас',
        'Контакты',
      ]}></Header>

      <main className="main">
        <MobMenu></MobMenu>
        <Top></Top>
        <Sales></Sales>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default Main;
