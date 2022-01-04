import React, { FC, MouseEventHandler, ReactElement, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Header, Footer, Aside, SortPopup, SalesItem } from "../components";
import { fetchItemsThunkCreator } from "../redux/actions/items";
import { RootState } from "../redux/store";
import { ProductType } from "../types";

import "../scss/_reset.scss";
import "../scss/_global.scss";
import "../scss/catalog.scss";
import arrBack from "../images/icons/arrow-back.svg";

const Catalog: FC = (): ReactElement => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchItemsThunkCreator());
  }, []);

  const items = useSelector((state: RootState) => state.items.items);

  const [isAsideVisible, toggleAsideVisibility] = useState(false);

  const asideToggleRef = useRef(null);

  const onBtnClick: MouseEventHandler<HTMLButtonElement> = (): void => {
    toggleAsideVisibility(true);
    document.body.classList.add("lock");
  };

  const onAsideCloseClick: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault();
    toggleAsideVisibility(false);
    document.body.classList.remove("lock");
  };

  const onSortTypeClick = (cat: string): void => {
  }

  return (
    <div className="wrapper">
      <Header headerMidTaller items={["Главная", "О нас", "Контакты"]}></Header>
      <main className="main">
        <div className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href="#">
                  Главная
                </a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href="#">
                  Гостинные
                </a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href="#">
                  Мягкая мебель
                </a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__item-back" href="catalog.html">
                  <img src={arrBack} alt="back" />
                </a>
                <span className="breadcrumbs__link">Диваны</span>
              </li>
            </ul>
          </div>
        </div>

        <section className="catalog">
          <div className="container">
            <div className="catalog__inner">
              {<Aside 
                isAsideVisible={isAsideVisible}
                onAsideCloseClick={onAsideCloseClick}>
              </Aside>}
              <div className="catalog__body">
                <div className="catalog__controls controls">
                  <button className="controls__toggle-aside" onClick={onBtnClick} ref={asideToggleRef}>
                    Фильтр
                  </button>
                  <SortPopup onSortTypeClick={onSortTypeClick}></SortPopup>
                </div>
                <div className="catalog__items">
                  {items.map((product: ProductType) => (
                    <SalesItem 
                      key={product.id} 
                      product={product}
                      >
                    </SalesItem>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default Catalog;
