import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Header, SalesItem, ProductCard, Breadcrumbs, ProductTabs } from "../components";

import { RootState } from "../redux/store";
import { fetchItemsThunkCreator } from "../redux/actions/items";

import { ProductType, IPageProps } from "../types";

import "../../node_modules/slick-carousel/slick/slick.css";
import "../scss/_reset.scss";
import "../scss/_global.scss";
import "../scss/product.scss";

interface IProductProps extends IPageProps {};

const getCurrentProductId = (state: RootState) => state.currentProduct.id;
const getProducts = (state: RootState) => state.items.items;

const Product: FC<IProductProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchItemsThunkCreator());
  }, []);

  const currentId = useSelector(getCurrentProductId);
  const items = useSelector(getProducts);

  const breadcrumbs = [
    { name:"Главная", href:"/", isLink:true },
    { name:"Гостинные", href:"/catalog", isLink:true },
    { name:"Мягкая мебель", href:"/catalog", isLink:true },
    { name:"Диваны", href:"", isLink:false }
  ];

  const [ currentProduct ] = items.filter((item: ProductType) => item.id === currentId );
  
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
            <div className="sales__items sales__items--product">
            {items.filter((item) => item.rating > 4.1)
              .map((product) => (
                <SalesItem 
                  key={product.id} 
                  product={product}
                  />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Product;
