import React, { Suspense } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { Main } from "../pages";
import { Footer, Loader, MobMenu } from "../Components";

const LazyCart = React.lazy(() => import('../pages/Cart'));
const LazyCatalog = React.lazy(() => import('../pages/Catalog'));
const LazyProduct = React.lazy(() => import('../pages/Product'));
const LazyFavorites = React.lazy(() => import('../pages/Favorites'));


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
          <Suspense fallback={ <Loader />}>
            <LazyCatalog
              isMobMenuOpen={isMobMenuOpen}
              setMobMenuOpen={setMobMenuOpen}
            />
          </Suspense>
        </Route>
        <Route path="/products/:id" exact>
        <Suspense fallback={ <Loader />}>
          <LazyProduct
              isMobMenuOpen={isMobMenuOpen}
              setMobMenuOpen={setMobMenuOpen}
            />
          </Suspense>
        </Route>
        <Route path="/cart" exact>
        <Suspense fallback={ <Loader />}>
          <LazyCart 
              isMobMenuOpen={isMobMenuOpen}
              setMobMenuOpen={setMobMenuOpen}
            />
          </Suspense>
        </Route>
        <Route path="/favorites" exact>
        <Suspense fallback={ <Loader />}>
          <LazyFavorites
              isMobMenuOpen={isMobMenuOpen}
              setMobMenuOpen={setMobMenuOpen}
            />
          </Suspense>
        </Route>
        <Redirect to="/" />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
