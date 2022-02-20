import React from 'react';
import { useSelector } from "react-redux";

import { Header, SalesItem, Breadcrumbs, Empty } from "../Components";

import { getFavorites, getProducts } from "../redux/getters";
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';

import { IPageProps } from "../types"; 

const Favorites: React.FC<IPageProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {

  const breadcrumbs = useBreadcrumbs();

  const items = useSelector(getProducts);
  const favorites = useSelector(getFavorites);
  
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
                <span className="cart__top-num">Предметов: {favorites?.length}</span>
              </p>
            </div>
          </div>
        </section>
        {
          favorites.length
            ? (<section className="sales">
              <div className="container">
                <div className="sales__items sales__items--cart">
                  {favorites && favorites.map(id => {
                      const likedItem = items.find(item => item.id === id);
    
                      if (likedItem) {
                        return (
                          <SalesItem 
                            key={likedItem.id} 
                            product={likedItem}
                            baseDir={'../../../'}
                            isFavorite={true}
                          />
                        )}
                    })}
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