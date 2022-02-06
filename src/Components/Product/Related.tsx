import React from 'react';
import { useSelector } from "react-redux";

import { SalesItem } from "../";

import { RootState } from "../../redux/store";

const getProducts = (state: RootState) => state.items.items;
const getFavorites = (state: RootState) => state.favorites.favorites;

const Related: React.FC = () => {

  const items = useSelector(getProducts);
  const favorites = useSelector(getFavorites);

  return (
    <div className="sales__items sales__items--product">
    {items.filter((item) => item.rating > 4.1)
      .map((product) => (
        <SalesItem 
          key={product.id} 
          product={product}
          baseDir={'../../../'}
          isFavorite={favorites.includes(product.id)}
          />
      ))}
    </div>
  )
}

export default Related;