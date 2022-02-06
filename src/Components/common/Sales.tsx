import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { fetchItemsThunkCreator } from "../../redux/actions/items";

import { SalesItem } from "..";
import Loader from "../common/Loader";

const getFavorites = (state: RootState) => state.favorites.favorites;
const getProducts = (state: RootState) => state.items.items;
const getIsLoaded = (state: RootState) => state.items.isLoaded;


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
