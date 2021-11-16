import React, { FC } from "react";

const Top: FC = (): React.ReactElement => {

  return (
    <section className="top">
      <div className="container">
        <div className="top__slider animate__animated animate__fadeIn animate__delay-1s">
          <div className="top__slider-item">
            <div className="top__slider-box">
              <h1 className="top__title animate__animated animate__fadeIn animate__delay-2s">loft мебель</h1>
              <p className="top__subtitle animate__animated animate__fadeIn animate__delay-3s">Современная и удобная мебель в Анапе</p>
              <a className="top__btn animate__animated animate__fadeIn animate__delay-3s" href="catalog.html">
                СМОТРЕТЬ КАТАЛОГ
              </a>
            </div>
          </div>
          <div className="top__slider-item">
            <div className="top__slider-box">
              <h1 className="top__title">loft мебель</h1>
              <p className="top__subtitle">Современная и удобная мебель в Анапе</p>
              <a className="top__btn" href="catalog.html">
                СМОТРЕТЬ КАТАЛОГ
              </a>
            </div>
          </div>
          <div className="top__slider-item">
            <div className="top__slider-box">
              <h1 className="top__title">loft мебель</h1>
              <p className="top__subtitle">Современная и удобная мебель в Анапе</p>
              <a className="top__btn" href="catalog.html">
                СМОТРЕТЬ КАТАЛОГ
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Top