import React, { FC, MouseEventHandler, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Header, Aside, SortPopup, SalesItem, Breadcrumbs, Pagination } from "../components";

import { fetchItemsThunkCreator } from "../redux/actions/items";
import { RootState } from "../redux/store";
import { ProductType, IPageProps } from "../types";

import "../scss/_reset.scss";
import "../scss/_global.scss";
import "../scss/catalog.scss";

interface ICatalogProps extends IPageProps {};


const Catalog: FC<ICatalogProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchItemsThunkCreator());
  }, []);

  const items = useSelector((state: RootState) => state.items.items);

  const links = [
    { name:"Главная", href:"/", isLink:true },
    { name:"Гостинные", href:"/catalog", isLink:true },
    { name:"Мягкая мебель", href:"/catalog", isLink:true },
    { name:"Диваны", href:"", isLink:false }
  ];

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
    <>
      <Header 
        isMobMenuOpen={isMobMenuOpen}
        setMobMenuOpen={setMobMenuOpen}
        headerMiddleTall 
        ></Header>
      <main className="main">
        <Breadcrumbs links={links}></Breadcrumbs>
        <section className="catalog">
          <div className="container">
            <div className="catalog__inner">
              {<Aside 
                isAsideVisible={isAsideVisible}
                onAsideCloseClick={onAsideCloseClick}
                ></Aside>}
              <div className="catalog__body">
                <div className="catalog__controls controls">
                  <button 
                    className="controls__toggle-aside" 
                      onClick={onBtnClick} 
                      ref={asideToggleRef}
                      >
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
                <Pagination></Pagination>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Catalog;
