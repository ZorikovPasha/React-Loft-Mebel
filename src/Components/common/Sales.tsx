import React from "react";
import { useSelector } from "react-redux";

import { getFavorites, getProducts } from "../../redux/getters";
import { fetchItemsThunkCreator } from "../../redux/actions/items";
import { useLoading } from "../../hooks/useLoading";

import { SalesItem } from "..";
import Loader from "../common/Loader";

const Sales: React.FC = () => {
  const [isLoading, setLoading] = React.useState(false);

  const items = useSelector(getProducts);
  const favorites = useSelector(getFavorites);

  useLoading(fetchItemsThunkCreator, setLoading);
  
  return (
    <section className="sales">
      <h3 className="sales__title">Хиты продаж</h3>
      {
        isLoading 
        ? <Loader />
        : (<div className="sales__items">
            {items && items.map((product) => (
            <SalesItem 
              product={product} 
              key={product.id}
              baseDir={''}
              isFavorite={favorites.includes(product.id)}
              />
            ))}
          </div>)
      }
    </section>
  );
};

export default Sales;
