import React from "react";
import { Link } from "react-router-dom";

import "../../scss/_footer.scss";
import logo from "../../images/icons/footer-logo.svg";

const Footer: React.FC = () => {

  const FooterListsRef = React.useRef([
    [{ name: "Кухни", link: "/catalog/kitchens"}, { name: "Спальни", link: "/catalog/bedroom"}, { name: "Гостинные", link: "/catalog/living"}],
    [{ name: "Прихожие", link: "/catalog/hall"}, { name: "Офисная мебель", link: "/catalog/office"}, { name: "Детская", link: "/catalog/children"}],
    [{ name: "Шкафы", link: "/catalog/cabinets"}, { name: "Матрасы", link: "/catalog/mattresses"}, { name: "Мягкая мебель", link: "/catalog/upholstered"}]
  ]);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__main">
            <div className="footer__column">
              <p className="footer__title">НАВИГАЦИЯ</p>
              <div className="footer__box">
                {FooterListsRef.current?.map(list => (
                    <ul 
                      className="footer__list" 
                      key={list[0].link}
                      >
                      {list.map((listItem) => (
                        <li 
                          className="footer__list-item" 
                          key={listItem.link}
                          >
                          <Link 
                            to={listItem.link} 
                            className="footer__list-link"
                            >
                            {listItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ))}
              </div>
            </div>
            <div className="footer__column footer__column--common">
              <div className="footer__logo">
                <img src={logo} alt="logo" />
              </div>
              <p className="footer__address">г. Анапа, Анапское шоссе, 30 Ж/К Черное море</p>
            </div>
          </div>
          <div className="footer__bottom bottom-footer">
            <div className="bottom-footer__left">
              <Link 
                to="/catalog/new" 
                className="bottom-footer__text bottom-footer__text--promo"
                  >
                  Акция
                </Link>
              <Link 
                to="/catalog/new" 
                className="bottom-footer__text"
                >
                  Новинки
                </Link>
            </div>
            <div className="bottom-footer__contacts">
              <a 
                className="bottom-footer__phone" 
                href="tel:89648999119"
                >
                8 (964) 89 99 119
              </a>
              <a 
                className="bottom-footer__link" 
                href="#"
                >
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
};

export default Footer;
