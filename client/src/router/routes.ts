import React from 'react'

import { ROUTES } from '../utils/const'
import { Main } from '../pages/Main'
const LazyCart = React.lazy(() => import('../pages/Cart'))
const LazyCatalog = React.lazy(() => import('../pages/Catalog'))
const LazyProduct = React.lazy(() => import('../pages/Product'))
const LazyFavorites = React.lazy(() => import('../pages/Favorites'))
const LazyAbout = React.lazy(() => import('../pages/About'))
const LazyContacts = React.lazy(() => import('../pages/Contacts'))
const LazyLogin = React.lazy(() => import('../pages/Login'))
const LazySignup = React.lazy(() => import('../pages/SignUp'))
const LazyProfile = React.lazy(() => import('../pages/Profile'))
const LazyProfileSearchReult = React.lazy(() => import('../pages/SearchResult'))
const LazyNewProduct = React.lazy(() => import('../pages/newProduct'))

export const initialRoute = {
  path: ROUTES.Home,
  component: Main,
  exact: true
}

export const publicRoutes = [
  {
    path: ROUTES.Cart,
    component: LazyCart,
    exact: true
  },
  {
    path: ROUTES.Catalog,
    component: LazyCatalog,
    exact: false
  },
  {
    path: ROUTES.Product,
    component: LazyProduct,
    exact: true
  },
  {
    path: ROUTES.NewProduct,
    component: LazyNewProduct,
    exact: true
  },
  {
    path: ROUTES.Favorites,
    component: LazyFavorites,
    exact: true
  },
  {
    path: ROUTES.About,
    component: LazyAbout,
    exact: true
  },
  {
    path: ROUTES.Contacts,
    component: LazyContacts,
    exact: true
  },
  {
    path: ROUTES.Login,
    component: LazyLogin,
    exact: true
  },
  {
    path: ROUTES.Signup,
    component: LazySignup,
    exact: true
  },
  {
    path: ROUTES.SearchResult,
    component: LazyProfileSearchReult,
    exact: false
  }
]

export const authRoutes = [
  {
    path: ROUTES.Profile,
    component: LazyProfile,
    exact: true
  }
]
