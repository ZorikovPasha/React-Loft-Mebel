import { IFurniture } from '../api/types'
import { ICartItem } from '../redux/actions/cartItems'
import { OrderInfoType } from './index'

export const Actions = {
  SET_PRODUCTS: 'SET_PRODUCTS',
  FETCH_SLIDES: 'FETCH_SLIDES',
  ADD_FAVORITES: 'ADD_FAVORITES',
  REMOVE_FAVORITES: 'REMOVE_FAVORITES',
  FAVORITES_LOADED: 'FAVORITES_LOADED',
  ADD_CART_ITEMS: 'ADD_CART_ITEMS',
  ADD_SINGLE_ITEM: 'ADD_SINGLE_ITEM',
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
  RESET_PRODUCTS: 'RESET_PRODUCTS'
} as const

export type fetchItemsActionType = {
  type: typeof Actions.SET_PRODUCTS
  payload: {
    items: IFurniture[]
    isLoaded: boolean
  }
}

export type favoritesActionType =
  | {
      type: typeof Actions.ADD_FAVORITES
      payload: number[]
    }
  | {
      type: typeof Actions.REMOVE_FAVORITES
      payload: number[]
    }
  | {
      type: typeof Actions.RESET_FAVORITES
    }
  | {
      type: typeof Actions.FAVORITES_LOADED
      payload: boolean
    }

export type ordersActionCreator = {
  type: typeof Actions.SET_ORDERS
  payload: OrderInfoType[]
}

export type cartItemsActionType =
  | {
      type: typeof Actions.ADD_SINGLE_ITEM | typeof Actions.REMOVE_CART_ITEM | typeof Actions.RESET_CART
      payload: ICartItem
    }
  | ordersActionCreator
  | {
      type: typeof Actions.ADD_CART_ITEMS
      payload: ICartItem[]
    }
  | { type: typeof Actions.CART_LOADING; payload: boolean }
  | { type: typeof Actions.ORDER_STATUS; payload: boolean }
