import React, { FC } from "react";
import { Provider } from "react-redux";

import store from "./redux/store";


import AppRouter from "./router/AppRouter";

const App: FC = () => {

  return (
    <Provider store={store}>
        <AppRouter></AppRouter>
    </Provider>
  );
};

export default App;
