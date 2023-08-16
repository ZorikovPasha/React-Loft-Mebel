import { Actions } from '../../types/actionsTypes'
import { OrderInfoType } from '../../types'

export interface ICartItem {
  id: number
  quintity: number
  price: number
}

type CartItemsActionsTypes =
  | typeof Actions.ADD_CART_ITEMS
  | typeof Actions.ORDER_STATUS
  | typeof Actions.SET_ORDERS
  | typeof Actions.CART_LOADING
  | typeof Actions.REMOVE_CART_ITEM
  | typeof Actions.RESET_CART

type actionCreatorType<T> = (payload?: T) => { type: CartItemsActionsTypes; payload?: T }

export const addtemsActionCreator: actionCreatorType<ICartItem[]> = (payload) => ({
  type: Actions.ADD_CART_ITEMS,
  payload: payload
})

export const setOrderStatusActionCreator: actionCreatorType<boolean> = (payload) => ({
  type: Actions.ORDER_STATUS,
  payload: payload
})

export const ordersActionCreator: actionCreatorType<OrderInfoType[]> = (payload) => ({
  type: Actions.SET_ORDERS,
  payload: payload
})

export const fetchingActionCreator: actionCreatorType<boolean> = (bool) => ({
  type: Actions.CART_LOADING,
  payload: bool
})

export const removeItemActionCreator: actionCreatorType<ICartItem> = (obj) => ({
  type: Actions.REMOVE_CART_ITEM,
  payload: obj
})

export const resetCartActionCreator: actionCreatorType<null> = () => ({
  type: Actions.RESET_CART
})
