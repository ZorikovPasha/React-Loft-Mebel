import React, { FC, ReactElement } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { Main, Catalog, Product, Cart } from './pages'

const App: FC = (): ReactElement => {
  return (
    <BrowserRouter>

      <Route path="/" component={Main} exact></Route>
      <Route path="/catalog" component={Catalog} exact></Route>
      <Route path="/product" component={Product} exact></Route>
      <Route path="/cart" component={Cart} exact></Route>
    </BrowserRouter>
    )
}

export default App;