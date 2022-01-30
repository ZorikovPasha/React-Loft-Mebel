import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { fetchItemsThunkCreator } from "../../redux/actions/items";

import { SalesItem } from "..";

const getProducts = (state: RootState) => state.items.items;

const Sales: FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchItemsThunkCreator());
  }, []);

  const items = useSelector(getProducts);

  return (
    <section className="sales">
      <div className="container">
        <h3 className="sales__title">Хиты продаж</h3>
        <div className="sales__items">
          {items.map((product) => (
            <SalesItem 
              product={product} 
              key={product.id}
              />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sales;
