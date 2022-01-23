import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { Main, Catalog, Product, Cart } from "../pages";
import { Footer, MobMenu } from "../components";

const AppRouter: React.FC = () => {
  const [isMobMenuOpen, setMobMenuOpen] = React.useState(false);

  return (
    <BrowserRouter>
      <div className="wrapper">
        <MobMenu
          isMobMenuOpen={isMobMenuOpen}
          setMobMenuOpen={setMobMenuOpen}
        ></MobMenu>
        <Route path="/" exact>
          <Main 
            isMobMenuOpen={isMobMenuOpen}
            setMobMenuOpen={setMobMenuOpen}
          ></Main>
        </Route>
        <Route path="/catalog/:room/:kind">
          <Catalog
            isMobMenuOpen={isMobMenuOpen}
            setMobMenuOpen={setMobMenuOpen}
          ></Catalog>
        </Route>
        <Route path="/products/:id" exact>
          <Product
            isMobMenuOpen={isMobMenuOpen}
            setMobMenuOpen={setMobMenuOpen}
          ></Product>
        </Route>
        <Route path="/cart" exact>
          <Cart
            isMobMenuOpen={isMobMenuOpen}
            setMobMenuOpen={setMobMenuOpen}
          ></Cart>
        </Route>
        <Redirect to="/" />
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
