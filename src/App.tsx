import React, { FC } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import { Main, Catalog, Product, Cart } from "./pages";

const App: FC = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={Main} exact></Route>
        <Route path="/catalog" component={Catalog} exact></Route>
        <Route path="/product" component={Product} exact></Route>
        <Route path="/cart" component={Cart} exact></Route>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
