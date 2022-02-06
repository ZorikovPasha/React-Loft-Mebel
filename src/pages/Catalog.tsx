import React, { FC, MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { Header, Aside, SortPopup, SalesItem, Breadcrumbs, Pagination, Loader } from "../Components";

import { fetchItemsThunkCreator, sortASCActionCreator, sortDESCActionCreator, sortPOPActionCreator } from "../redux/actions/items";
import { RootState } from "../redux/store";
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';

import { IPageProps } from "../types";

import "../scss/_reset.scss";
import "../scss/_global.scss";
import "../scss/catalog.scss";


interface ICatalogProps extends IPageProps {};

const getFavorites = (state: RootState) => state.favorites.favorites;
const getProducts = (state: RootState) => state.items.items;
const getIsLoaded = (state: RootState) => state.items.isLoaded;

const Catalog: FC<ICatalogProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {
  const dispatch = useDispatch();

  const asideToggleRef = React.useRef(null);

  const [isLoading, setLoading] = React.useState(false);
  const [isAsideVisible, toggleAsideVisibility] = React.useState(false);

  const favorites = useSelector(getFavorites);
  const products = useSelector(getProducts);
  const areItemsLoaded = useSelector(getIsLoaded);

  const router = useHistory();
  const points = router.location.pathname.split('/');
  const breadcrumbs = useBreadcrumbs(points);

  React.useEffect(() => {

    if (areItemsLoaded) {
      return;
    }

    setLoading(true);
    dispatch(fetchItemsThunkCreator());
    setLoading(false);
  }, []);

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
  }

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
                {/* <Pagination /> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Catalog;
