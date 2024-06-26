import { IProcessedFurniture } from '../../utils'

export const Actions = {
  SET_PRODUCTS: 'SET_PRODUCTS',
  ADD_CART_ITEM: 'ADD_CART_ITEM',
  REMOVE_CART_ITEM: 'REMOVE_CART_ITEM',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  EDIT_USER_DATA: 'EDIT_USER_DATA',
  SET_PATHNAME: 'SET_PATHNAME',
  EDIT_ORDER: 'EDIT_ORDER',
  BUMP_REVIEW_HELP_COUNT: 'BUMP_REVIEW_HELP_COUNT',
  DUMP_REVIEW_HELP_COUNT: 'DUMP_REVIEW_HELP_COUNT',
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE'
} as const

export type fetchItemsActionType = {
  type: typeof Actions.SET_PRODUCTS
  payload: {
    items: IProcessedFurniture[]
    isLoaded: boolean
  }
}

export interface IPathnameAction {
  type: typeof Actions.SET_PATHNAME
  payload: string
}
