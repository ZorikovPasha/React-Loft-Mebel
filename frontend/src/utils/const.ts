export const ROUTES = {
  Catalog: '/catalog',
  Product: '/products/:id',
  Cart: '/cart',
  Favorites: '/favorites',
  About: '/about',
  Contacts: '/contacts',
  Login: '/login',
  Signup: '/signup',
  Profile: '/profile',
  SearchResult: '/search',
  Home: '/',
  NewProduct: '/products/new',
  LoginFinish: '/login-finish'
} as const

export const Const = {
  phone: '8 (964) 89 99 119'
}

export const SCREEN_SIZES = {
  desktop: 1200,
  tablet_medium: 992,
  tablet: 767,
  mobile: 320
}

export const revalidate = 1 * 60 // 1 minute
