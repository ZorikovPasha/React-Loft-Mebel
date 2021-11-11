import React, { FC, ReactElement } from "react";

import { Header, Footer, MobMenu, Top, Sales } from "../Components";

const Main: FC = (): ReactElement => {
  return (
    <div className="wrapper">
      <Header></Header>

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
