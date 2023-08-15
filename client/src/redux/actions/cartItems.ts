import { ActionsTypes } from '../../types/actionsTypes'
import { OrderInfoType } from '../../types'

export interface ICartItem {
  id: number
  quintity: number
  price: number
}

type CartItemsActionsTypes =
  | ActionsTypes.ADD_CART_ITEMS
  | ActionsTypes.ORDER_STATUS
  | ActionsTypes.SET_ORDERS
  | ActionsTypes.CART_LOADING
  | ActionsTypes.REMOVE_CART_ITEM
  | ActionsTypes.RESET_CART

type actionCreatorType<T> = (payload?: T) => { type: CartItemsActionsTypes; payload?: T }

export const addtemsActionCreator: actionCreatorType<ICartItem[]> = (payload) => ({
  type: ActionsTypes.ADD_CART_ITEMS,
  payload: payload
})

export const setOrderStatusActionCreator: actionCreatorType<boolean> = (payload) => ({
  type: ActionsTypes.ORDER_STATUS,
  payload: payload
})

export const ordersActionCreator: actionCreatorType<OrderInfoType[]> = (payload) => ({
  type: ActionsTypes.SET_ORDERS,
  payload: payload
})

export const fetchingActionCreator: actionCreatorType<boolean> = (bool) => ({
  type: ActionsTypes.CART_LOADING,
  payload: bool
})

export const removeItemActionCreator: actionCreatorType<ICartItem> = (obj) => ({
  type: ActionsTypes.REMOVE_CART_ITEM,
  payload: obj
})

export const resetCartActionCreator: actionCreatorType<null> = () => ({
  type: ActionsTypes.RESET_CART
})
