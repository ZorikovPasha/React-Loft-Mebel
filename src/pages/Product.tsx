import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { Header, ProductCard, Breadcrumbs, ProductTabs, Related, Loader } from "../components";

import { RootState } from "../redux/store";
import { fetchItemsThunkCreator } from "../redux/actions/items";

import { IPageProps } from "../types";
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';

import "../../node_modules/slick-carousel/slick/slick.css";
import "../scss/_reset.scss";
import "../scss/_global.scss";
import "../scss/product.scss";

interface IProductProps extends IPageProps {};

const getCurrentProductId = (state: RootState) => state.currentProduct.id;
const getProducts = (state: RootState) => state.items.items;
const getIsLoaded = (state: RootState) => state.items.isLoaded;

const Product: FC<IProductProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {
  const dispatch = useDispatch();

  const areItemsLoaded = useSelector(getIsLoaded);
  const currentId = useSelector(getCurrentProductId);
  const items = useSelector(getProducts);

  const router = useHistory();
  const points = router.location.pathname.split('/');
  const breadcrumbs = useBreadcrumbs(points);

  const [isLoading, setLoading] = React.useState(false);

  const [ currentProduct ] = items.filter((item) => item.id === currentId );
  
  React.useEffect(() => {
    if (areItemsLoaded) {
      return;
    }

    setLoading(true);
    dispatch(fetchItemsThunkCreator());
    setLoading(false);
  }, []);


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
