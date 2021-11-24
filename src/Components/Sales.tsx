import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { fetchItemsThunkCreator } from "../redux/actions/items";
import { ProductType } from "../redux/types";

import {SalesItem} from '../Components';

const Sales: FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchItemsThunkCreator());
  }, []);

  const items = useSelector((state: RootState) => state.itemsReducer.items);

  return (
    <section className="sales">

      <div className="container">
        <h3 className="sales__title">Хиты продаж</h3>
        <div className="sales__items">
          {items.map((product: ProductType) => (
              <SalesItem product={product} key={product.id}
              ></SalesItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sales;
