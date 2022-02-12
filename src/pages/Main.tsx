import React from "react";

import { Header, Top, Sales } from "../Components";
import { IPageProps } from "../types";

import "../scss/style.scss";

interface IMainProps extends IPageProps {};

const Main: React.FC<IMainProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {
  
  return (
    <> 
      <Header 
        showHeaderTop 
        isMobMenuOpen={isMobMenuOpen}
        setMobMenuOpen={setMobMenuOpen}
      />
      <main className="main">
        <Top />
        <Sales />
      </main>
    </>
  );
};

export default Main;
