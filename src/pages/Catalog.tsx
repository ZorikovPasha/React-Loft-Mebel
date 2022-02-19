import React, { FC, MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Header, Aside, SortPopup, SalesItem, Breadcrumbs, Loader } from "../Components";

import { fetchItemsThunkCreator, sortASCActionCreator, sortDESCActionCreator, sortPOPActionCreator } from "../redux/actions/items";
import { getFavorites, getProducts } from "../redux/getters";
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { useLoading } from '../hooks/useLoading';

import { IPageProps } from "../types";

interface ICatalogProps extends IPageProps {};

const Catalog: FC<ICatalogProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {
  const dispatch = useDispatch();

  const asideToggleRef = React.useRef(null);

  const [isLoading, setLoading] = React.useState(false);
  const [isAsideVisible, toggleAsideVisibility] = React.useState(false);

  const favorites = useSelector(getFavorites);
  const products = useSelector(getProducts);

  const breadcrumbs = useBreadcrumbs();

  useLoading(fetchItemsThunkCreator, setLoading);

  const onBtnClick: MouseEventHandler<HTMLButtonElement> = React.useCallback((): void => {
    toggleAsideVisibility(true);
    document.body.classList.add("lock");
  }, []);

  const onAsideCloseClick: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault();
    toggleAsideVisibility(false);
    document.body.classList.remove("lock");
  };

  const onSortTypeClick = React.useCallback((cat: string): void => {
    switch(cat) {
      case 'asc':
        dispatch(sortASCActionCreator());
        break;
      case 'desc':
        dispatch(sortDESCActionCreator());
        break;
      case 'pop':
        dispatch(sortPOPActionCreator());
        break;
    }
  }, [dispatch]);

  return (
    <>
      <Header 
        isMobMenuOpen={isMobMenuOpen}
        setMobMenuOpen={setMobMenuOpen}
        headerMiddleTall 
      />
      <main className="main">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <section className="catalog">
          <div className="container">
            <div className="catalog__inner">
              {<Aside 
                isAsideVisible={isAsideVisible}
                onAsideCloseClick={onAsideCloseClick}
                />}
              <div className="catalog__body">
                <div className="catalog__controls controls">
                  <button 
                    className="controls__toggle-aside" 
                      onClick={onBtnClick} 
                      ref={asideToggleRef}
                      >
                    Фильтр
                  </button>
                  <SortPopup onSortTypeClick={onSortTypeClick} />
                </div>
                {
                  isLoading 
                  ? <Loader />
                  : (
                    <div className="catalog__items">
                      {products && products.map((product) => (
                        <SalesItem 
                          key={product.id} 
                          product={product}
                          baseDir={'../../'}
                          isFavorite={favorites.includes(product.id)}
                          />
                      ))}
                  </div>
                  )
                }
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Catalog;
