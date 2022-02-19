import React from "react";
import { useSelector } from "react-redux";

import { Header, ProductCard, Breadcrumbs, ProductTabs, Related, Loader } from "../Components";

import { fetchItemsThunkCreator } from "../redux/actions/items";
import { getCurrentProductId, getProducts } from "../redux/getters";

import { IPageProps } from "../types";
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { useLoading } from '../hooks/useLoading';

import "../../node_modules/slick-carousel/slick/slick.css";

interface IProductProps extends IPageProps {};

const Product: React.FC<IProductProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {

  const currentId = useSelector(getCurrentProductId);
  const items = useSelector(getProducts);

  const breadcrumbs = useBreadcrumbs();

  const [isLoading, setLoading] = React.useState(false);
  useLoading(fetchItemsThunkCreator, setLoading);

  const [ currentProduct ] = items.filter((item) => item.id === currentId );

  return (
    <>
      <Header 
        isMobMenuOpen={isMobMenuOpen}
        setMobMenuOpen={setMobMenuOpen}
        headerMiddleTall 
        />
      <main className="main">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {currentProduct && 
          <ProductCard product={currentProduct} />}
        {currentProduct && <ProductTabs />}

        <section className="sales">
          <div className="container">
            <h3 className="sales__title">Хиты продаж</h3>
            {
              isLoading
                ? <Loader />
                : <Related />
            }
          </div>
        </section>
      </main>
    </>
  );
};

export default Product;
