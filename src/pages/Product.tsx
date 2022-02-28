import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ProductCard, Breadcrumbs, ProductTabs, Related } from "../Components";
import { getProducts } from "../redux/getters";
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import "../../node_modules/slick-carousel/slick/slick.css";

const Product: React.FC = () => {
  const items = useSelector(getProducts);

  const breadcrumbs = useBreadcrumbs();

  const { id } = useParams<{ id: string }>();
  const currentItem = items.find(item => item.id === Number(id));

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {currentItem && <ProductCard product={currentItem} />}
      {currentItem && <ProductTabs />}

      <section className="sales">
        <div className="container">
          <h3 className="sales__title">Хиты продаж</h3>
          <Related />
        </div>
      </section>
    </>
  );
};

export default Product;
