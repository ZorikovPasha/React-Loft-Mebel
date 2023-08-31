import React from 'react'

import { ROUTES } from '../utils/const'
import { Main } from '../pages/Main'
import { Page404 } from '../pages/404'
import { useDispatch } from 'react-redux'
import { setPathnameActionCreator } from '../redux/actions/pathname'
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

interface IRoute {
  path: string
  component: React.ReactElement
  exact: boolean
}

export const WithPathname: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setPathnameActionCreator(window.location.pathname))
  }, [])

  return <>{children}</>
}

export const publicRoutes: IRoute[] = [
  {
    path: ROUTES.Home,
    component: <Main />,
    exact: true
  },
  {
    path: ROUTES.Cart,
    component: <LazyCart />,
    exact: true
  },
  {
    path: ROUTES.Catalog,
    component: <LazyCatalog />,
    exact: false
  },
  {
    path: ROUTES.NewProduct,
    component: <LazyNewProduct />,
    exact: true
  },
  {
    path: ROUTES.Product,
    component: <LazyProduct />,
    exact: true
  },
  {
    path: ROUTES.Favorites,
    component: <LazyFavorites />,
    exact: true
  },
  {
    path: ROUTES.About,
    component: <LazyAbout />,
    exact: true
  },
  {
    path: ROUTES.Contacts,
    component: <LazyContacts />,
    exact: true
  },
  {
    path: ROUTES.Login,
    component: <LazyLogin />,
    exact: true
  },
  {
    path: ROUTES.Signup,
    component: <LazySignup />,
    exact: true
  },
  {
    path: ROUTES.SearchResult,
    component: <LazyProfileSearchReult />,
    exact: true
  },
  {
    path: '*',
    component: <Page404 />,
    exact: false
  }
]

export const authRoutes: IRoute[] = [
  {
    path: ROUTES.Profile,
    component: <LazyProfile />,
    exact: true
  }
]
