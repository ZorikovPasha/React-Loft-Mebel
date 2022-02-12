import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { Main, Catalog, Product, Cart } from "../pages";
import { Footer, MobMenu } from "../Components";

const AppRouter: React.FC = () => {
  const [isMobMenuOpen, setMobMenuOpen] = React.useState(false);

  return (
    <BrowserRouter>
      <div className="wrapper">
        <MobMenu
          isMobMenuOpen={isMobMenuOpen}
          setMobMenuOpen={setMobMenuOpen}
        />
        <Route path="/" exact>
          <Main 
            isMobMenuOpen={isMobMenuOpen}
            setMobMenuOpen={setMobMenuOpen}
          />
        </Route>
        <Route path="/catalog/:room">
          <Catalog
            isMobMenuOpen={isMobMenuOpen}
            setMobMenuOpen={setMobMenuOpen}
          />
        </Route>
        <Route path="/products/:id" exact>
          <Product
            isMobMenuOpen={isMobMenuOpen}
            setMobMenuOpen={setMobMenuOpen}
          />
        </Route>
        <Route path="/cart" exact>
          <Cart
            isMobMenuOpen={isMobMenuOpen}
            setMobMenuOpen={setMobMenuOpen}
          />
        </Route>
        <Redirect to="/" />
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
