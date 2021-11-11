import React, { FC } from "react";


const Footer: FC = (): React.ReactElement => {

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__main"> 
            <div className="footer__column">
              <p className="footer__title">НАВИГАЦИЯ</p>
              <div className="footer__box">
                <ul className="footer__list">
                  <li className="footer__list-item">
                    <a className="footer__list-link" href="catalog.hmtl">
                      Кухни
                    </a>
                  </li>
                  <li className="footer__list-item">
                    <a className="footer__list-link" href="catalog.hmtl">
                      Спальни
                    </a>
                  </li>
                  <li className="footer__list-item">
                    <a className="footer__list-link" href="catalog.hmtl">
                      Гостинные
                    </a>
                  </li>
                </ul>
                <ul className="footer__list">
                  <li className="footer__list-item">
                    <a className="footer__list-link" href="catalog.hmtl">
                      Прихожие
                    </a>
                  </li>
                  <li className="footer__list-item">
                    <a className="footer__list-link" href="catalog.hmtl">
                      Офисная мебель
                    </a>
                  </li>
                  <li className="footer__list-item">
                    <a className="footer__list-link" href="catalog.hmtl">
                      Детская
                    </a>
                  </li>
                </ul>
                <ul className="footer__list">
                  <li className="footer__list-item">
                    <a className="footer__list-link" href="catalog.hmtl">
                      Шкафы
                    </a>
                  </li>
                  <li className="footer__list-item">
                    <a className="footer__list-link" href="catalog.hmtl">
                      Матрасы
                    </a>
                  </li>
                  <li className="footer__list-item">
                    <a className="footer__list-link" href="catalog.hmtl">
                      Мягкая мебель
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer__column footer__column--common">
              <div className="footer__logo">
                <img src="images/icons/footer-logo.svg" alt="logo" />
              </div>
              <p className="footer__address">
                г. Анапа, Анапское шоссе, 30 Ж/К Черное море
              </p>
            </div>
          </div>
          <div className="footer__bottom bottom-footer">
            <div className="bottom-footer__left">
              <a
                className="bottom-footer__text bottom-footer__text--promo"
                href="catalog.html"
              >
                Акция
              </a>
              <a className="bottom-footer__text" href="catalog.html">
                Новинки
              </a>
            </div>
            <div className="bottom-footer__contacts">
              <a className="bottom-footer__phone" href="tel:89648999119">
                8 (964) 89 99 119
              </a>
              <a className="bottom-footer__link" href="#">
                INSTAGRAM
              </a>
              <a
                className="bottom-footer__mail"
                href="mailto:mebel_loft_anapa@mail.ru"
              >
                mebel_loft_anapa@mail.ru
              </a>
            </div>
          </div>
        </div>
      </div>
  </footer>
    );
}

export default Footer;
