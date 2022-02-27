import React from 'react';
import { useSelector } from "react-redux";

import { Header, SalesItem, Breadcrumbs, Empty } from "../Components";

import { getFavorites, getProducts } from "../redux/getters";
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';

import { IPageProps, ProductType } from "../types"; 

const Favorites: React.FC<IPageProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {

  const breadcrumbs = useBreadcrumbs();

  const items = useSelector(getProducts);
  const favoriteItemsIds = useSelector(getFavorites);
  const favorites: ProductType[] = []; 

  favoriteItemsIds.forEach(id => {
    const item = items.find(item => item.id === id)
    if (!!item) {
      favorites.push(item);
    }
  })

  return (
    <>
      <Header 
        isMobMenuOpen={isMobMenuOpen}
        setMobMenuOpen={setMobMenuOpen}
       />
      <main className="main">
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
          favoriteItemsIds.length
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
      </main>
    </>
  );
}

export default Favorites;