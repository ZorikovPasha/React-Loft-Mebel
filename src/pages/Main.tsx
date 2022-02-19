import React from "react";

import { Header, TopSlider, Sales } from "../Components";
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
      <main className="main home">
        <div className="container">
          <div className="home__top top">
            <TopSlider />
          </div>
          <div className="home__promo">
            <video className="home__promo-video" autoPlay muted loop>
              <source src="../images/promo.mp4" />
            </video>
            <div className="home__promo-content">
              <p className="home__promo-text">
                Новый коллекция ярких решений для вашего интерьера.
                <p className="home__promo-label">Украсьте вашу жизнь</p>
              </p>
            </div>
          </div>
          <Sales />
        </div>
      </main>
    </>
  );
};

export default Main;
