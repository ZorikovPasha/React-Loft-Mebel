import React, { FC, MouseEventHandler } from 'react';
import { Link } from "react-router-dom";

import HeaderSearchForm from "./HeaderSearchForm";

import { IPageProps } from "../../../types";

import logo from "../../../images/logo.svg";
import wishlist from "../../../images/icons/wishlist.svg";
import bag from "../../../images/icons/bag.svg";
import profile from "../../../images/icons/profile.svg";

interface IHeaderMiddleProps extends IPageProps {
  headerMiddleTall: boolean | undefined;
  items: string[];
};

const HeaderMiddle: FC<IHeaderMiddleProps> = ({ headerMiddleTall, isMobMenuOpen, setMobMenuOpen, items }) => {
  const menuBtnRef = React.useRef(null);

  React.useEffect(() => {
    document.body.onclick =  function(e: any): void {
      if ( isMobMenuOpen && !e.path.includes(menuBtnRef.current)  ) {
        setMobMenuOpen(false);
        document.body.classList.remove("lock");
      }
    };
  }, []);

  const onMobMenuBtnClick: MouseEventHandler<HTMLDivElement> = (): void => {
    setMobMenuOpen(true);
    document.body.classList.add("lock");
  };

return (
  <>
    {headerMiddleTall ? (
      <div className="header__mid header__mid--taller">
        <div 
          className="menu-btn" 
          onClick={onMobMenuBtnClick} 
          ref={menuBtnRef}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>

        <Link 
          to="/" 
          className="logo"
          >
          <img src={logo} alt="logo" />
        </Link>
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
        <HeaderSearchForm inputSpec></HeaderSearchForm>
        <div className="header__connect">
          <a 
            className="header__phone header__phone--black" 
            href="tel:89648999119"
            >
            8 (964) 89 99 119
          </a>
          <a 
            className="header__delivery header__delivery--black" 
            href="#"
            >
            Доставка
          </a>
        </div>
        <div className="header__user user-header">
          <Link 
            to="/cart" 
            className="user-header__link"
            >
            <img src={wishlist} alt="wishlist" />
          </Link>
          <Link 
            to="/cart" 
            className="user-header__link"
            >
            <img src={bag} alt="bag" />
          </Link>
          <Link 
            to="/cart" 
            className="user-header__link"
            >
            <img src={profile} alt="profile" />
          </Link>
        </div>
      </div>
    ) : (
      <div className="header__mid">
        <div 
          className="menu-btn" 
          onClick={onMobMenuBtnClick}
          >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <Link 
          to="/" 
          className="logo"
          >
          <img src={logo} alt="logo" />
        </Link>
        <HeaderSearchForm />
        <div className="header__connect header__connect--mid">
          <a 
            className="header__phone header__phone--black" 
            href="tel:89648999119"
            >
            8 (964) 89 99 119
          </a>
          <Link 
            to="/catalog" 
            className="header__delivery header__delivery--black"
            >
            Доставка
          </Link>
        </div>
        <div className="header__user user-header">
          <Link 
            to="/cart" 
            className="user-header__link"
            >
            <img src={wishlist} alt="wishlist" />
          </Link>
          <Link 
            to="/cart" 
            className="user-header__link"
            >
            <img src={bag} alt="bag" />
          </Link>
          <Link 
            to="/cart" 
            className="user-header__link"
            >
            <img src={profile} alt="profile" />
          </Link>
        </div>
      </div>
    )}
  </>
  )
}

export default HeaderMiddle;