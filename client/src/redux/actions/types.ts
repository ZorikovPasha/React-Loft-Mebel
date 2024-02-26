import { IFurniture } from '../../api/types'

export const Actions = {
  SET_PRODUCTS: 'SET_PRODUCTS',
  ADD_CART_ITEM: 'ADD_CART_ITEM',
  REMOVE_CART_ITEM: 'REMOVE_CART_ITEM',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  EDIT_USER_DATA: 'EDIT_USER_DATA',
  SET_PATHNAME: 'SET_PATHNAME',
  EDIT_ORDER: 'EDIT_ORDER',
  SEARCH: 'SEARCH',
  FORCE_RERENDER: 'FORCE_RERENDER'
} as const

export type fetchItemsActionType = {
  type: typeof Actions.SET_PRODUCTS | typeof Actions.FORCE_RERENDER
  payload: {
    items: IFurniture[]
    isLoaded: boolean
  }
}

export interface IPathnameAction {
  type: typeof Actions.SET_PATHNAME
  payload: string
}
