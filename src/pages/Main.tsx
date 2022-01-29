import React, { FC } from "react";

import { Header, Top, Sales } from "../components";
import { IPageProps } from "../types";

import "../scss/style.scss";

interface IMainProps extends IPageProps {};

const Main: FC<IMainProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {
  
  return (
    <> 
      <Header 
        showHeaderTop 
        isMobMenuOpen={isMobMenuOpen}
        setMobMenuOpen={setMobMenuOpen}
      >
      </Header>
      <main className="main">
        <Top />
        <Sales />
      </main>
    </>
  );
};

export default Main;
