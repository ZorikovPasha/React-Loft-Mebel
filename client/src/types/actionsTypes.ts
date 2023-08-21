import { IFurniture } from '../api/types'

export const Actions = {
  SET_PRODUCTS: 'SET_PRODUCTS',
  FETCH_SLIDES: 'FETCH_SLIDES',
  ADD_FAVORITES: 'ADD_FAVORITES',
  REMOVE_FAVORITES: 'REMOVE_FAVORITES',
  FAVORITES_LOADED: 'FAVORITES_LOADED',
  ADD_CART_ITEM: 'ADD_CART_ITEM',
  QUINTITY: 'QUINTITY',
  REMOVE_CART_ITEM: 'REMOVE_CART_ITEM',
  CALC_TOTAL_COST: 'CALC_TOTAL_COST',
  CURRENT_PRODUCT: 'CURRENT_PRODUCT',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  USER: 'USER',
  RESET_CART: 'RESET_CART',
  RESET_FAVORITES: 'RESET_FAVORITES',
  ORDER_STATUS: 'ORDER_STATUS',
  SET_ORDERS: 'SET_ORDERS',
  CART_LOADING: 'CART_LOADING',
  RESET_PRODUCTS: 'RESET_PRODUCTS',
  EDIT_USER_DATA: 'EDIT_USER_DATA',
  SET_PATHNAME: 'SET_PATHNAME'
} as const

export type fetchItemsActionType = {
  type: typeof Actions.SET_PRODUCTS
  payload: {
    items: IFurniture[]
    isLoaded: boolean
  }
}

export interface IPathnameAction {
  type: typeof Actions.SET_PATHNAME
  payload: string
}
