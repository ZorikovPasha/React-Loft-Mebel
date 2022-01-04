import React, { FC, MouseEventHandler, ReactChild, ReactNode } from "react";
import { Link } from "react-router-dom";

import HeaderSubList from "./HeaderSubList";
import HeaderSearchForm from "./HeaderSearchForm";
import { fetchItems } from "../api";
import MobMenu from "./MobMenu";

import logo from "../images/logo.svg";
import wishlist from "../images/icons/wishlist.svg";
import bag from "../images/icons/bag.svg";
import profile from "../images/icons/profile.svg";
import etc from "../images/icons/etc.svg";

interface IHeaderProps {
  items: Array<string>;
  headerMidTaller?: boolean;
  showHeaderTop?: boolean;
  childen?: ReactChild | ReactNode;
}

type SubListsType = Array<string[]>;

const Header: FC<IHeaderProps> = ({ showHeaderTop, items, headerMidTaller }): React.ReactElement => {
  const menuBtnRef = React.useRef(null);

  const [subLists, setSubLists] = React.useState<SubListsType>([]);

  React.useEffect(() => {
    fetchItems("subLists", setSubLists);
  }, []);

  const [isMobMenuOpen, setIsMobMenuOpen] = React.useState(false);

  const onMobMenuBtnClick: MouseEventHandler<HTMLDivElement> = (): void => {
    setIsMobMenuOpen(true);
    document.body.classList.add("lock");
  };

  document.body.onclick =  function(e: any): void {
    if ( isMobMenuOpen && !e.path.includes(menuBtnRef.current)  ) {
      setIsMobMenuOpen(false);
      document.body.classList.remove("lock");
    }
  };

  // document.body.onclick = function(e: MouseEvent): void {
  //   if ( isMobMenuOpen && !e.path.includes(menuBtnRef.current)  ) {
  //     setIsMobMenuOpen(false);
  //     document.body.classList.remove("lock");
  //   }
  // };

  const onMobMenuCloseClick: MouseEventHandler<HTMLButtonElement> = (): void => {
    setIsMobMenuOpen(false);
    document.body.classList.remove("lock");
  };

  return (
    <header className="header">
      {<MobMenu onMobMenuCloseClick={onMobMenuCloseClick} isMobMenuOpen={isMobMenuOpen}></MobMenu>}

      {showHeaderTop && (
        <div className="header__top">
          <div className="container">
            <div className="header__top-inner">
              <nav className="header__nav">
                <ul className="header__list">
                  {items.map((text, idx) => {
                    return (
                      <li key={`${text}_${idx}`} className="header__list-item">
                        <Link to="/" className="header__list-link">
                          {text}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="header__connect">
                <a className="header__phone" href="tel:89648999119">
                  8 (964) 89 99 119
                </a>
                <Link to="/catalog" className="header__delivery">
                  Доставка
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        {headerMidTaller ? (
          <div className="header__mid header__mid--taller">
            <div className="menu-btn" onClick={onMobMenuBtnClick} ref={menuBtnRef}>
              <div></div>
              <div></div>
              <div></div>
            </div>

            <Link to="/" className="logo">
              <img src={logo} alt="logo" />
            </Link>
            <nav className="header__nav">
              <ul className="header__list">
                {items.map((text, idx) => {
                  return (
                    <li key={`${text}_${idx}`} className="header__list-item">
                      <Link to="/" className="header__list-link">
                        {text}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <HeaderSearchForm inputSpec></HeaderSearchForm>
            <div className="header__connect">
              <a className="header__phone header__phone--black" href="tel:89648999119">
                8 (964) 89 99 119
              </a>
              <a className="header__delivery header__delivery--black" href="#">
                Доставка
              </a>
            </div>
            <div className="header__user user-header">
              <Link to="/cart" className="user-header__link">
                <img src={wishlist} alt="wishlist" />
              </Link>
              <Link to="/cart" className="user-header__link">
                <img src={bag} alt="bag" />
              </Link>
              <Link to="/cart" className="user-header__link">
                <img src={profile} alt="profile" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="header__mid">
            <div className="menu-btn" onClick={onMobMenuBtnClick}>
              <div></div>
              <div></div>
              <div></div>
            </div>

            <Link to="/" className="logo">
              <img src={logo} alt="logo" />
            </Link>

            <HeaderSearchForm />
            <div className="header__connect header__connect--mid">
              <a className="header__phone header__phone--black" href="tel:89648999119">
                8 (964) 89 99 119
              </a>
              <Link to="/catalog" className="header__delivery header__delivery--black">
                Доставка
              </Link>
            </div>
            <div className="header__user user-header">
              <Link to="/cart" className="user-header__link">
                <img src={wishlist} alt="wishlist" />
              </Link>
              <Link to="/cart" className="user-header__link">
                <img src={bag} alt="bag" />
              </Link>
              <Link to="/cart" className="user-header__link">
                <img src={profile} alt="profile" />
              </Link>
            </div>
          </div>
        )}

        <div className="header__bottom">
          <div className="header__categories categories">
            <ul className="categories__list">
              <li className="categories__item categories__item--promo">
                <Link to="/catalog" className="categories__item-img">
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.46429 7.07143H7.67857M11.3214 11.9286H12.5357M12.5357 6.46429L6.46429 12.5357M8.65177 1.35135L7.28081 2.7223C7.05585 2.94727 6.75073 3.07365 6.43258 3.07365H4.27324C3.61073 3.07365 3.07365 3.61073 3.07365 4.27324V6.43258C3.07365 6.75073 2.94727 7.05585 2.7223 7.28081L1.35135 8.65177C0.882883 9.12023 0.882883 9.87977 1.35135 10.3482L2.7223 11.7192C2.94727 11.9442 3.07365 12.2493 3.07365 12.5674V14.7268C3.07365 15.3893 3.61073 15.9263 4.27324 15.9263H6.43258C6.75073 15.9263 7.05585 16.0527 7.28081 16.2777L8.65177 17.6486C9.12023 18.1171 9.87977 18.1171 10.3482 17.6486L11.7192 16.2777C11.9442 16.0527 12.2493 15.9263 12.5674 15.9263H14.7268C15.3893 15.9263 15.9263 15.3893 15.9263 14.7268V12.5674C15.9263 12.2493 16.0527 11.9442 16.2777 11.7192L17.6486 10.3482C18.1171 9.87977 18.1171 9.12023 17.6486 8.65177L16.2777 7.28081C16.0527 7.05585 15.9263 6.75073 15.9263 6.43258V4.27324C15.9263 3.61073 15.3893 3.07365 14.7268 3.07365H12.5674C12.2493 3.07365 11.9442 2.94727 11.7192 2.7223L10.3482 1.35135C9.87977 0.882883 9.12023 0.882883 8.65177 1.35135Z"
                      stroke="#414141"
                    />
                  </svg>
                </Link>
                <Link to="/catalog" className="categories__link">
                  Акция
                </Link>
              </li>
              <li className="categories__item categories__item--new">
                <Link to="/catalog" className="categories__item-img">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.7327 9.36166L20.7488 9.37349C21.3351 9.8039 22 10.2946 22 10.9996C22 11.7044 21.3355 12.194 20.7502 12.6253L20.7499 12.6256C20.4113 12.8723 19.9885 13.1842 19.933 13.3908C19.9522 13.7877 20.0635 14.1748 20.2582 14.5213L20.2669 14.5414C20.5617 15.2208 20.8641 15.9178 20.5222 16.506C20.1769 17.1 19.4012 17.187 18.6513 17.2712C18.2637 17.2736 17.8817 17.3642 17.5342 17.5361C17.3619 17.8839 17.271 18.2662 17.2683 18.6543C17.1841 19.4041 17.0865 20.1856 16.4974 20.5251C15.9082 20.8647 15.1985 20.5586 14.5136 20.2602C14.1695 20.066 13.7853 19.9535 13.3908 19.9312C13.1909 19.9827 12.8879 20.3934 12.6399 20.7296L12.6256 20.7489L12.6248 20.75C12.1936 21.3351 11.705 21.9981 10.9996 21.9981C10.294 21.9981 9.80537 21.335 9.37418 20.7498L9.37353 20.7489C9.12578 20.4103 8.81494 19.9876 8.60834 19.9321C8.21173 19.9536 7.82521 20.0648 7.47779 20.2573L7.46081 20.2647C6.78037 20.5608 6.08216 20.8647 5.4931 20.5213C4.89913 20.175 4.81206 19.4003 4.7279 18.6513C4.7262 18.262 4.63523 17.8781 4.46199 17.5294C4.11448 17.3564 3.73204 17.2651 3.34386 17.2625C2.59494 17.1831 1.81634 17.0875 1.47394 16.4974C1.13154 15.9072 1.43951 15.1975 1.73793 14.5127C1.93264 14.169 2.04527 13.7851 2.06697 13.3907C2.01613 13.1902 1.60207 12.885 1.2662 12.6374L1.26619 12.6374L1.25012 12.6255C0.663777 12.1951 0 11.7054 0 10.9995C0 10.2936 0.663777 9.8039 1.24914 9.37349C1.58773 9.12672 2.01052 8.81489 2.06598 8.6083C2.04491 8.21263 1.93228 7.82728 1.73694 7.48254C1.43471 6.79675 1.13145 6.08698 1.47672 5.49301C1.82199 4.89904 2.59772 4.81197 3.34758 4.72781C3.73405 4.72584 4.11501 4.63626 4.46185 4.46575C4.63411 4.11802 4.72503 3.73567 4.72777 3.34762C4.81197 2.59395 4.91047 1.81347 5.4987 1.47295C6.08693 1.13243 6.79662 1.43466 7.48528 1.73788C7.83001 1.93071 8.21389 2.04316 8.60816 2.06692C8.80803 2.01533 9.11104 1.60466 9.35905 1.26852L9.37335 1.24914L9.37418 1.24802C9.80537 0.662935 10.2939 0 10.9994 0C11.7017 0 12.1891 0.657086 12.6217 1.24026L12.6283 1.24914C12.876 1.58773 13.1869 2.01052 13.3935 2.06598C13.7881 2.04415 14.1724 1.93157 14.5163 1.73694C15.2011 1.43471 15.9118 1.13149 16.5058 1.47775C17.0998 1.82401 17.1868 2.59875 17.271 3.34767C17.2727 3.73706 17.3636 4.12089 17.5369 4.46961C17.8844 4.64258 18.2668 4.73387 18.655 4.73647C19.4039 4.81587 20.1825 4.9115 20.5249 5.50166C20.8673 6.09182 20.5594 6.8015 20.261 7.48635C20.0662 7.82997 19.9536 8.21393 19.9319 8.6083C19.9827 8.80882 20.3968 9.11406 20.7327 9.36166ZM7.74743 13.1994C7.83772 13.3198 7.97949 13.3907 8.13 13.3907C8.18143 13.3907 8.23245 13.3823 8.28114 13.3658C8.47635 13.3008 8.60812 13.1182 8.60825 12.9124V9.08655C8.60825 8.82243 8.39412 8.6083 8.13 8.6083C7.86588 8.6083 7.65175 8.82243 7.65175 9.08655V11.4777L5.64316 8.7996C5.55286 8.67918 5.41109 8.6083 5.26058 8.6083C4.99646 8.6083 4.78233 8.82243 4.78233 9.08655V12.9124C4.78233 13.1765 4.99646 13.3907 5.26058 13.3907C5.5247 13.3907 5.73884 13.1765 5.73884 12.9124V10.5213L7.74743 13.1994ZM11.9559 13.3907H10.043C9.77884 13.3907 9.56471 13.1765 9.56471 12.9124V10.9995V9.08655C9.56471 8.82243 9.77884 8.6083 10.043 8.6083H11.9559C12.22 8.6083 12.4342 8.82243 12.4342 9.08655C12.4342 9.35067 12.22 9.5648 11.9559 9.5648H10.5212V10.5212H11.9559C12.22 10.5212 12.4342 10.7353 12.4342 10.9995C12.4342 11.2636 12.22 11.4777 11.9559 11.4777H10.5212V12.4342H11.9559C12.22 12.4342 12.4342 12.6483 12.4342 12.9125C12.4342 13.1766 12.22 13.3907 11.9559 13.3907ZM16.2839 13.0636C16.349 13.2591 16.5321 13.3909 16.7382 13.3907L16.7574 13.3897C16.9698 13.3817 17.1514 13.2344 17.2031 13.0282L18.1596 9.20231C18.2235 8.94581 18.0674 8.68613 17.811 8.62219C17.5545 8.55826 17.2948 8.71437 17.2308 8.97083L16.6732 11.2032L16.2361 9.89191C16.1862 9.78189 16.0981 9.69374 15.9881 9.64384C15.7374 9.53018 15.4421 9.64124 15.3284 9.89191L14.8913 11.2032L14.3337 8.97083C14.2698 8.71437 14.0101 8.55826 13.7536 8.62219C13.4972 8.68613 13.341 8.94586 13.405 9.20231L14.3614 13.0282C14.4131 13.2344 14.5947 13.3817 14.8071 13.3897C15.0218 13.4058 15.2185 13.2699 15.2796 13.0636L15.7818 11.5552L16.2839 13.0636Z"
                      fill="#414141"
                    />
                  </svg>
                </Link>
                <Link to="/catalog" className="categories__link">
                  Новинки
                </Link>
              </li>

              <li className="categories__item">
                <Link to="/catalog" className="categories__item-img">
                  <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 0V12.9375H0V23H23V0H11.5ZM11.5 21.5625H1.4375V14.375H11.5V21.5625ZM21.5625 21.5625H12.9375V7.1875H21.5625V21.5625ZM21.5625 5.75H12.9375V1.4375H21.5625V5.75Z" fill="black" />
                    <path d="M10.0625 4.73369L8.625 3.29619V0H7.1875V3.89131L8.625 5.32881V5.75H2.875V5.32881L4.3125 3.89131V0H2.875V3.29619L1.4375 4.73369V7.1875H10.0625V4.73369Z" fill="black" />
                    <path d="M8.625 15.8125H4.3125V17.25H8.625V15.8125Z" fill="black" />
                    <path d="M15.8125 2.875H14.375V4.3125H15.8125V2.875Z" fill="black" />
                    <path d="M15.8125 10.0625H14.375V14.375H15.8125V10.0625Z" fill="black" />
                    <path d="M2.875 8.625H1.4375V10.0625H2.875V8.625Z" fill="black" />
                    <path d="M6.46875 8.625H5.03125V10.0625H6.46875V8.625Z" fill="black" />
                    <path d="M10.0625 8.625H8.625V10.0625H10.0625V8.625Z" fill="black" />
                  </svg>
                </Link>
                <Link to="/catalog" className="categories__link">
                  Кухни
                </Link>
                {subLists && <HeaderSubList items={subLists[0]}></HeaderSubList>}
              </li>
              <li className="categories__item">
                <Link to="/catalog" className="categories__item-img">
                  <svg width="28" height="23" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M28 12.6475C28 11.7213 27.4932 10.8869 26.6773 10.4697C25.8454 10.0442 24.7681 9.82849 23.4756 9.82849H9.42501C9.32384 9.32362 9.09967 8.8649 8.7634 8.49111L6.77086 6.2761C6.2778 5.72797 5.56927 5.39514 4.77586 5.33903L4.41793 5.31371C4.23467 5.30053 4.04846 5.3264 3.86974 5.38634V4.21542C3.86974 3.80527 3.69698 3.43487 3.42081 3.17242C3.70087 2.83675 3.86974 2.40516 3.86974 1.93484C3.86974 0.867945 3.00174 0 1.9349 0C0.868055 0 0 0.868 0 1.9349C0 2.40527 0.168875 2.8368 0.44893 3.17248C0.172758 3.43498 0 3.80532 0 4.21548V21.6712C0 21.9732 0.244836 22.2181 0.546875 22.2181H2.43441C2.71649 22.2181 2.9523 22.0036 2.97888 21.7227C3.04402 21.034 3.40818 19.1427 4.31041 18.2946H5.77478C6.07682 18.2946 6.32166 18.0497 6.32166 17.7477C6.32166 17.4457 6.07682 17.2008 5.77478 17.2008L1.0937 17.2008V12.3863L8.39316 12.3861V13.8112C8.39316 14.6544 9.07911 15.3404 9.92234 15.3404H26.4709C26.6177 15.3404 26.7655 15.3191 26.9062 15.2773V17.2008H23.8926C23.8921 17.2008 23.8917 17.2009 23.8912 17.2009H10.5867C10.2847 17.2009 10.0399 17.4457 10.0399 17.7477C10.0399 18.0497 10.2847 18.2946 10.5867 18.2946H23.6896C24.5883 19.1404 24.9548 21.0335 25.0212 21.7227C25.0478 22.0036 25.2835 22.2182 25.5656 22.2182H27.4531C27.7552 22.2182 28 21.9733 28 21.6713V12.6475ZM3.87105 7.17445C3.8792 6.94143 3.84727 6.70064 4.03927 6.5293C4.23243 6.35693 4.46414 6.41342 4.69864 6.43005C5.21533 6.46663 5.6507 6.6663 5.95766 7.0076L7.9502 9.22266C8.27318 9.58163 8.42811 10.082 8.38638 10.6315C8.37036 10.843 8.37419 11.0305 8.19591 11.1798C8.03299 11.3162 7.85619 11.2907 7.66008 11.2849C7.10927 11.2684 6.62807 11.0615 6.30509 10.7025L4.31255 8.4875C3.99027 8.12913 3.85443 7.65023 3.87105 7.17445ZM1.09375 11.2925V4.21548C1.09375 4.02484 1.24884 3.86974 1.43948 3.86974H2.43015C2.62079 3.86974 2.77588 4.02484 2.77588 4.21548V11.2924L1.09375 11.2925ZM3.86969 9.63047L5.36473 11.2925H3.86969V9.63047ZM1.93484 1.0938C2.39859 1.0938 2.77594 1.47109 2.77594 1.9349C2.77594 2.3987 2.39865 2.77599 1.93484 2.77599C1.47104 2.77599 1.09375 2.3987 1.09375 1.9349C1.09375 1.47109 1.47104 1.0938 1.93484 1.0938ZM1.95792 21.1244H1.09375V18.2947H2.92753C2.3357 19.2635 2.06806 20.4619 1.95792 21.1244ZM9.92239 14.2467C9.68237 14.2467 9.48708 14.0514 9.48708 13.8114L9.48686 10.9222H23.4756C24.5933 10.9222 25.503 11.0976 26.1793 11.4435C26.6277 11.6727 26.9062 12.1341 26.9062 12.6475V13.8093C26.9062 13.81 26.9061 13.8107 26.9061 13.8114C26.9061 14.0515 26.7108 14.2467 26.4708 14.2467L9.92239 14.2467ZM26.0421 21.1244C25.9319 20.4619 25.6643 19.2635 25.0725 18.2947H26.9062V21.1244H26.0421Z"
                      fill="black"
                    />
                    <path d="M8.68597 17.5387C8.57282 17.2629 8.24628 17.1294 7.97175 17.2429C7.69623 17.3567 7.56186 17.6817 7.67588 17.9571C7.78985 18.2323 8.11486 18.367 8.39011 18.2529C8.66481 18.1391 8.80032 17.8134 8.68597 17.5387Z" fill="black" />
                  </svg>
                </Link>
                <Link to="/catalog" className="categories__link">
                  Спальни
                </Link>
                {subLists && <HeaderSubList items={subLists[1]}></HeaderSubList>}
              </li>
              <li className="categories__item">
                <Link to="/catalog" className="categories__item-img">
                  <svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M29.5312 15.9375H28.125V13.125H29.0625C29.3214 13.1249 29.5311 12.9149 29.531 12.656C29.531 12.6304 29.5289 12.6047 29.5247 12.5794L29.0559 9.76688C29.0184 9.54082 28.8229 9.37512 28.5938 9.375H26.7188C26.4896 9.37512 26.2941 9.54082 26.2566 9.76688L25.7878 12.5794C25.7453 12.8347 25.9179 13.0762 26.1734 13.1187C26.1987 13.1229 26.2243 13.125 26.25 13.125H27.1875V15.9375H25.3125C25.2967 15.9397 25.281 15.9428 25.2656 15.9469C25.0455 14.8525 24.0851 14.0644 22.9688 14.0625H22.0312V12.6562C22.0312 11.8796 21.4017 11.25 20.625 11.25H16.875C16.0983 11.25 15.4688 11.8796 15.4688 12.6562V14.0625H14.5312V12.6562C14.5312 11.8796 13.9017 11.25 13.125 11.25H9.375C8.59834 11.25 7.96875 11.8796 7.96875 12.6562V14.0625H7.03125C5.91492 14.0644 4.95445 14.8525 4.73438 15.9469C4.71897 15.9428 4.70332 15.9397 4.6875 15.9375H2.8125V13.125H3.75C4.00887 13.1249 4.21863 12.9149 4.21852 12.656C4.21852 12.6304 4.21641 12.6047 4.21219 12.5794L3.74344 9.76688C3.70588 9.54082 3.51041 9.37512 3.28125 9.375H1.40625C1.17709 9.37512 0.981621 9.54082 0.944062 9.76688L0.475313 12.5794C0.432832 12.8347 0.605449 13.0762 0.860859 13.1187C0.886172 13.1229 0.911836 13.125 0.9375 13.125H1.875V15.9375H0.46875C0.209883 15.9375 0 16.1474 0 16.4062V21.5625C0 21.8214 0.209883 22.0312 0.46875 22.0312H29.5312C29.7901 22.0312 30 21.8214 30 21.5625V16.4062C30 16.1474 29.7901 15.9375 29.5312 15.9375ZM1.49109 12.1875L1.80328 10.3125H2.88422L3.19641 12.1875H1.49109ZM4.21875 21.0938H0.9375V16.875H4.21875V21.0938ZM16.4062 12.6562C16.4062 12.3974 16.6161 12.1875 16.875 12.1875H20.625C20.8839 12.1875 21.0938 12.3974 21.0938 12.6562V14.0625H16.4062V12.6562ZM8.90625 12.6562C8.90625 12.3974 9.11613 12.1875 9.375 12.1875H13.125C13.3839 12.1875 13.5938 12.3974 13.5938 12.6562V14.0625H8.90625V12.6562ZM24.375 21.0938H5.625V19.6875H24.375V21.0938ZM24.375 18.75H5.625V16.4062C5.625 15.6296 6.25459 15 7.03125 15H22.9688C23.7454 15 24.375 15.6296 24.375 16.4062V18.75ZM26.8036 12.1875L27.1158 10.3125H28.1967L28.5089 12.1875H26.8036ZM29.0625 21.0938H25.7812V16.875H29.0625V21.0938Z"
                      fill="black"
                    />
                    <path
                      d="M9.375 8.4375H19.6875C19.9464 8.4375 20.1562 8.22762 20.1562 7.96875V0.46875C20.1562 0.209883 19.9464 0 19.6875 0H9.375C9.11613 0 8.90625 0.209883 8.90625 0.46875V7.96875C8.90625 8.22762 9.11613 8.4375 9.375 8.4375ZM9.84375 0.9375H19.2188V5.69438L18.1786 4.39453C18.0954 4.29029 17.9719 4.22637 17.8387 4.21875C17.7058 4.21289 17.5764 4.26223 17.4811 4.35516L15.9375 5.89969L12.9877 2.94984C12.8145 2.77693 12.5374 2.76633 12.3516 2.92547L9.84375 5.07516V0.9375ZM9.84375 6.30891L12.6314 3.91828L15.6061 6.8925C15.7891 7.07549 16.0859 7.07549 16.2689 6.8925L17.7736 5.38781L19.2188 7.19625V7.5H9.84375V6.30891Z"
                      fill="black"
                    />
                    <path d="M16.4062 4.21875C17.1829 4.21875 17.8125 3.58916 17.8125 2.8125C17.8125 2.03584 17.1829 1.40625 16.4062 1.40625C15.6296 1.40625 15 2.03584 15 2.8125C15 3.58916 15.6296 4.21875 16.4062 4.21875ZM16.4062 2.34375C16.6651 2.34375 16.875 2.55363 16.875 2.8125C16.875 3.07137 16.6651 3.28125 16.4062 3.28125C16.1474 3.28125 15.9375 3.07137 15.9375 2.8125C15.9375 2.55363 16.1474 2.34375 16.4062 2.34375Z" fill="black" />
                  </svg>
                </Link>
                <Link to="/catalog" className="categories__link">
                  Гостинные
                </Link>
                {subLists && <HeaderSubList items={subLists[2]}></HeaderSubList>}
              </li>
              <li className="categories__item">
                <Link to="/catalog" className="categories__item-img">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21.2695 0H0.644531C0.288578 0 0 0.288578 0 0.644531C0 1.00048 0.288578 1.28906 0.644531 1.28906H0.6875V21.3555C0.6875 21.7114 0.976078 22 1.33203 22C1.68798 22 1.97656 21.7114 1.97656 21.3555V20.9688H19.9375V21.3555C19.9375 21.7114 20.2261 22 20.582 22C20.938 22 21.2266 21.7114 21.2266 21.3555V1.28906H21.2695C21.6255 1.28906 21.9141 1.00048 21.9141 0.644531C21.9141 0.288578 21.6255 0 21.2695 0ZM11.6016 13.3633H19.9375V15.8555H11.6016V13.3633ZM19.9375 12.0742H11.6016V9.58203H19.9375V12.0742ZM10.3125 19.6797H6.78906V1.28906H10.3125V19.6797ZM1.97656 1.28906H5.5V19.6797H1.97656V1.28906ZM11.6016 19.6797V17.1445H19.9375V19.6797H11.6016ZM19.9375 8.29297H11.6016V1.28906H19.9375V8.29297Z"
                      fill="black"
                    />
                    <path d="M8.55078 11.6445C8.90675 11.6445 9.19531 11.356 9.19531 11C9.19531 10.644 8.90675 10.3555 8.55078 10.3555C8.19482 10.3555 7.90625 10.644 7.90625 11C7.90625 11.356 8.19482 11.6445 8.55078 11.6445Z" fill="black" />
                    <path d="M3.73828 11.6446C4.09425 11.6446 4.38281 11.356 4.38281 11C4.38281 10.6441 4.09425 10.3555 3.73828 10.3555C3.38232 10.3555 3.09375 10.6441 3.09375 11C3.09375 11.356 3.38232 11.6446 3.73828 11.6446Z" fill="black" />
                  </svg>
                </Link>
                <Link to="/catalog" className="categories__link">
                  Прихожие
                </Link>
                {subLists && <HeaderSubList items={subLists[3]}></HeaderSubList>}
              </li>
              <li className="categories__item">
                <Link to="/catalog" className="categories__item-img">
                  <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.3125 10.3984H21.3211C21.5413 10.0189 21.668 9.57881 21.668 9.10938V7.17578C21.668 6.81983 21.3794 6.53125 21.0234 6.53125H19.8029C20.1742 4.80137 21.9349 3.85352 21.9653 3.8375C22.2804 3.67366 22.4037 3.28552 22.2405 2.96978C22.0771 2.65353 21.6883 2.52961 21.372 2.69302C21.3088 2.72577 20.4899 3.15842 19.7344 3.99536V1.97656C19.7344 1.62061 19.4458 1.33203 19.0898 1.33203C18.7339 1.33203 18.4453 1.62061 18.4453 1.97656V3.99536C17.6898 3.15842 16.8709 2.72577 16.8076 2.69302C16.4913 2.52953 16.1025 2.65358 15.9391 2.96978C15.7757 3.28604 15.8996 3.67486 16.2158 3.83823C16.2358 3.84854 18.0075 4.78427 18.3777 6.53125H17.1562C16.8003 6.53125 16.5117 6.81983 16.5117 7.17578V9.10938C16.5117 9.57881 16.6384 10.0189 16.8586 10.3984H11.0663L10.4218 9.10938H13.2891C13.645 9.10938 13.9336 8.8208 13.9336 8.46484V0.644531C13.9336 0.288578 13.645 0 13.2891 0H2.89062C2.53467 0 2.24609 0.288578 2.24609 0.644531V8.46484C2.24609 8.8208 2.53467 9.10938 2.89062 9.10938H5.75793L5.1134 10.3984H1.60156C1.24561 10.3984 0.957031 10.687 0.957031 11.043C0.957031 11.3989 1.24561 11.6875 1.60156 11.6875H2.24609V21.3555C2.24609 21.7114 2.53467 22 2.89062 22C3.24658 22 3.53516 21.7114 3.53516 21.3555V19.4219H12.6445V21.3555C12.6445 21.7114 12.9331 22 13.2891 22H21.0234C21.3794 22 21.668 21.7114 21.668 21.3555V11.6875H22.3125C22.6685 11.6875 22.957 11.3989 22.957 11.043C22.957 10.687 22.6685 10.3984 22.3125 10.3984ZM17.8008 9.10938V7.82031H20.3789V9.10938C20.3789 9.82016 19.8006 10.3984 19.0898 10.3984C18.3791 10.3984 17.8008 9.82016 17.8008 9.10938ZM3.53516 1.28906H12.6445V7.82031H3.53516V1.28906ZM7.1991 9.10938H8.98059L9.62512 10.3984H6.55457L7.1991 9.10938ZM3.53516 18.1328V11.6875H12.6445V18.1328H3.53516ZM13.9336 16.8438H20.3789V20.7109H13.9336V16.8438ZM20.3789 15.5547H13.9336V11.6875H20.3789V15.5547Z"
                      fill="black"
                    />
                    <path d="M17.1562 14.2656C17.5122 14.2656 17.8008 13.9771 17.8008 13.6211C17.8008 13.2651 17.5122 12.9766 17.1562 12.9766C16.8003 12.9766 16.5117 13.2651 16.5117 13.6211C16.5117 13.9771 16.8003 14.2656 17.1562 14.2656Z" fill="black" />
                    <path d="M17.1562 19.4219C17.5122 19.4219 17.8008 19.1333 17.8008 18.7773C17.8008 18.4214 17.5122 18.1328 17.1562 18.1328C16.8003 18.1328 16.5117 18.4214 16.5117 18.7773C16.5117 19.1333 16.8003 19.4219 17.1562 19.4219Z" fill="black" />
                  </svg>
                </Link>
                <Link to="/catalog" className="categories__link">
                  Офисная мебель
                </Link>
                {subLists && <HeaderSubList items={subLists[4]}></HeaderSubList>}
              </li>
              <li className="categories__item">
                <Link to="/catalog" className="categories__item-img">
                  <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.7717 18.3255C22.5233 18.0729 22.1181 18.0685 21.8641 18.3145C21.8641 18.3145 21.8632 18.3149 21.862 18.3161L21.8602 18.3143L21.8639 18.3107C21.8617 18.3127 21.7854 18.3842 21.6246 18.501V8.46145C21.6246 8.1055 21.3361 7.81693 20.9801 7.81693C20.6242 7.81693 20.3356 8.1055 20.3356 8.46145V9.09862C18.0346 9.04633 16.8496 8.71517 15.7014 8.39386C14.6413 8.09717 13.64 7.81693 11.9568 7.81693C10.2736 7.81693 9.27226 8.09717 8.21219 8.39386C7.064 8.71522 5.87907 9.04637 3.57804 9.09862V5.88336C3.57804 3.57057 4.63222 1.99566 6.54641 1.44872C8.32412 0.940834 10.1995 1.67812 11.1667 3.2132C10.9322 3.32904 10.7334 3.45331 10.5707 3.58582L9.8345 2.84952C9.58283 2.59781 9.17472 2.59781 8.92301 2.84952C8.67131 3.10123 8.67131 3.50929 8.92301 3.761L9.75634 4.59432L8.92301 5.42765C8.67131 5.67935 8.67131 6.08742 8.92301 6.33913C9.17468 6.59079 9.58279 6.59083 9.8345 6.33913L10.5708 5.60287C10.7934 5.78419 11.0834 5.95022 11.4403 6.10014C12.0498 6.35601 12.7753 6.52797 13.2459 6.52797C14.3121 6.52797 15.1795 5.66057 15.1795 4.59441C15.1795 3.52824 14.3121 2.66085 13.2459 2.66085C13.0134 2.66085 12.7187 2.70291 12.4065 2.77626C11.1887 0.591332 8.62073 -0.484503 6.19235 0.20926C3.71176 0.918018 2.28904 2.98616 2.28904 5.88336V18.501C2.12826 18.3841 2.05194 18.3127 2.0498 18.3106L2.05349 18.3142L2.05173 18.316C2.05139 18.3157 2.04984 18.3142 2.04984 18.3142C1.79581 18.0683 1.39045 18.0728 1.14205 18.3254C0.892451 18.5792 0.895802 18.9872 1.14961 19.2369C1.20565 19.2926 1.93679 19.9887 3.64086 20.6654C5.34485 21.3427 8.01845 22.0002 11.9569 22C15.8953 22.0002 18.5689 21.3427 20.2729 20.6654C21.9769 19.9887 22.7081 19.2926 22.7641 19.2369C23.0179 18.9873 23.0213 18.5792 22.7717 18.3255ZM12.1081 4.21045C12.5686 4.03935 13.0291 3.9498 13.2459 3.9498C13.6013 3.9498 13.8904 4.23893 13.8904 4.59432C13.8904 4.94971 13.6013 5.23884 13.2459 5.23884C13.0291 5.23884 12.5686 5.1493 12.1081 4.9782C11.7087 4.82974 11.4836 4.68541 11.3749 4.59432C11.4836 4.50323 11.7087 4.3589 12.1081 4.21045ZM3.57809 10.3878C6.06435 10.333 7.38484 9.964 8.55963 9.63516C9.57432 9.35119 10.4506 9.10597 11.9569 9.10597C13.4631 9.10597 14.3394 9.35123 15.3541 9.63516C16.5289 9.96396 17.8494 10.333 20.3356 10.3878V16.8402H3.57809V10.3878ZM3.57809 18.1293H20.3356V19.2335C17.8845 20.3596 14.6765 20.7073 11.9569 20.7073C9.23741 20.7073 6.02933 20.3597 3.57809 19.2335V18.1293Z"
                      fill="black"
                    />
                    <path d="M6.8002 15.5512C7.15615 15.5512 7.44473 15.2626 7.44473 14.9067V12.3286C7.44473 11.9726 7.15615 11.6841 6.8002 11.6841C6.44426 11.6841 6.15568 11.9726 6.15568 12.3286V14.9067C6.15568 15.2626 6.44426 15.5512 6.8002 15.5512Z" fill="black" />
                    <path d="M9.37827 15.5512C9.73422 15.5512 10.0228 15.2626 10.0228 14.9067V12.3286C10.0228 11.9726 9.73422 11.6841 9.37827 11.6841C9.02232 11.6841 8.73375 11.9726 8.73375 12.3286V14.9067C8.73375 15.2626 9.02232 15.5512 9.37827 15.5512Z" fill="black" />
                    <path d="M11.9564 15.5512C12.3123 15.5512 12.6009 15.2626 12.6009 14.9067V12.3286C12.6009 11.9726 12.3123 11.6841 11.9564 11.6841C11.6004 11.6841 11.3118 11.9726 11.3118 12.3286V14.9067C11.3118 15.2626 11.6004 15.5512 11.9564 15.5512Z" fill="black" />
                    <path d="M14.5345 15.5512C14.8904 15.5512 15.179 15.2626 15.179 14.9067V12.3286C15.179 11.9726 14.8904 11.6841 14.5345 11.6841C14.1785 11.6841 13.8899 11.9726 13.8899 12.3286V14.9067C13.8899 15.2626 14.1785 15.5512 14.5345 15.5512Z" fill="black" />
                    <path d="M17.1125 15.5512C17.4685 15.5512 17.757 15.2626 17.757 14.9067V12.3286C17.757 11.9726 17.4685 11.6841 17.1125 11.6841C16.7566 11.6841 16.468 11.9726 16.468 12.3286V14.9067C16.468 15.2626 16.7566 15.5512 17.1125 15.5512Z" fill="black" />
                  </svg>
                </Link>
                <Link to="/catalog" className="categories__link">
                  Детская
                </Link>
                {subLists && <HeaderSubList items={subLists[5]}></HeaderSubList>}
              </li>
            </ul>
          </div>
          <div className="header__promo">
            <Link to="/catalog" className="header__promo-link">
              Акция
            </Link>
            {subLists && <HeaderSubList items={subLists[6]}></HeaderSubList>}
          </div>
          <Link to="/catalog" className="header__more">
            <img src={etc} alt="etc" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
