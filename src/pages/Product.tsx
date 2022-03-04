import React from "react";
import { useParams } from "react-router-dom";

import { ProductCard, Breadcrumbs, ProductTabs, Related } from "../Components";
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import "../../node_modules/slick-carousel/slick/slick.css";
import { HttpClient } from "../services/api";
import { ProductType } from "../types";

const Product: React.FC = () => {
  const [currentProduct, setCurrentProduct] = React.useState<ProductType>();
  const breadcrumbs = useBreadcrumbs();

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const getCurrentItem = async (): Promise<ProductType> => {
      return await HttpClient.getOneFurniture(id);
    };
  
    getCurrentItem().then(data => setCurrentProduct(data));
  }, [id]);

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {currentProduct && <ProductCard product={currentProduct} />}
      {currentProduct && <ProductTabs />}

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
