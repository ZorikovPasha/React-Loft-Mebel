import React from 'react';
import { useSelector } from "react-redux";

import { SalesItem, Breadcrumbs, Empty, Loader } from "../Components";
import { getFavorites, getFavsLoadingState, getIsAuth, getProducts } from "../redux/getters";
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { ProductType } from "../types"; 

const Favorites: React.FC = () => {
  const breadcrumbs = useBreadcrumbs();

  const isLoaded = useSelector(getFavsLoadingState);
  const items = useSelector(getProducts);
  const favoriteItemsIds = useSelector(getFavorites);
  const isAuth = useSelector(getIsAuth);
  
  const favorites: ProductType[] = []; 
  favoriteItemsIds.forEach(id => {
    const item = items.find(item => item.id === id)
    if (!!item) {
      favorites.push(item);
    }
  })

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section className="cart">
        <div className="container">
          <div className="cart__top">
            <p>Вам понравилось:</p>
            <p>
              <span className="cart__top-num">Предметов: {favoriteItemsIds?.length}</span>
            </p>
          </div>
        </div>
      </section>
      {
        !isLoaded && isAuth
          ? <Loader />
          : favoriteItemsIds.length
          ? (<section className="sales">
            <div className="container">
              <div className="sales__items sales__items--cart">
                {favorites && favorites.map(item => (
                  <SalesItem 
                    key={item.id} 
                    product={item}
                    baseDir={'../../../'}
                    isFavorite={true}
                  />
                ))}
              </div>
            </div>
            </section>)
          : (<div className="container">
              <Empty text="Вам ничего не понравилось("/>
            </div>)
        }
    </>
  );
}

export default Favorites;