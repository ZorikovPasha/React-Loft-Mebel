import React from "react";
import { Link } from "react-router-dom";

interface IHeaderTopProps {
  items: string[];
};

const HeaderTop: React.FC<IHeaderTopProps> = ({ items }) => {

  return (
    <div className="header__top">
      <div className="container">
        <div className="header__top-inner">
          <nav className="header__nav">
            <ul className="header__list">
              {items.map((text, idx) => {
                return (
                  <li 
                    key={`${text}_${idx}`} 
                    className="header__list-item"
                    >
                    <Link 
                      to="/" 
                      className="header__list-link"
                      >
                      {text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="header__connect">
            <a 
              className="header__phone" 
              href="tel:89648999119"
              >
              8 (964) 89 99 119
            </a>
            <Link 
              to="/catalog" 
              className="header__delivery"
              >
              Доставка
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
