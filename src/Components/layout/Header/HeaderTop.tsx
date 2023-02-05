import React from "react";
import { Link } from "react-router-dom";

type ItemType = {
  name: string,
  link: string,
}

interface IHeaderTopProps {
  items: ItemType[];
};

const HeaderTop: React.FC<IHeaderTopProps> = ({ items }) => {
  return (
    <div className="header__top">
      <div className="container">
        <div className="header__top-inner">
          <nav className="header__nav">
            <ul className="header__list">
              {items.map(({ name, link }, idx) => 
                <li 
                  key={`${name}_${idx}`} 
                  className="header__list-item"
                >
                  <Link 
                    to={link}
                    className="header__list-link"
                    >
                    {name}
                  </Link>
                </li>
              )}
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
              to="/about" 
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
