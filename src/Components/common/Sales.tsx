import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFavorites, getIsLoaded, getProducts } from "../../redux/getters";
import { fetchItemsThunkCreator } from "../../redux/actions/items";

import { SalesItem } from "..";
import Loader from "../common/Loader";

const Sales: FC = () => {
  const [isLoading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const favorites = useSelector(getFavorites);
  const areItemsLoaded = useSelector(getIsLoaded);

  React.useEffect(() => {
    if (areItemsLoaded) {
      return;
    }

    setLoading(true);
    dispatch(fetchItemsThunkCreator());
    setLoading(false);
  }, []);

  const items = useSelector(getProducts);
  
  return (
    <section className="sales">
      <div className="container">
        <h3 className="sales__title">Хиты продаж</h3>
        {
          isLoading 
          ? <Loader />
          : (
            <div className="sales__items">
              {items && items.map((product) => (
              <SalesItem 
                product={product} 
                key={product.id}
                baseDir={''}
                isFavorite={favorites.includes(product.id)}
                />
              ))}
            </div>
          )}
      </div>
    </section>
  );
};

export default Sales;
