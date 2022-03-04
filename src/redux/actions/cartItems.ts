import { ActionsTypes } from '../../types/actionsTypes';
import { CartItemType, OrderInfoType } from '../../types';

type CartItemsActionsTypes = ActionsTypes.ADD_CART_ITEMS | ActionsTypes.ORDER_STATUS | ActionsTypes.SET_ORDERS;

type actionCreatorType<T> = (payload?: T) => { type: CartItemsActionsTypes, payload?: T }

export const addtemsActionCreator: actionCreatorType<CartItemType[]> = (payload) => ({
  type: ActionsTypes.ADD_CART_ITEMS,
  payload: payload
});

export const setOrderStatusActionCreator: actionCreatorType<boolean> = (payload) => ({
  type: ActionsTypes.ORDER_STATUS,
  payload: payload
});

export const ordersActionCreator: actionCreatorType<OrderInfoType[]> = (payload) => ({
  type: ActionsTypes.SET_ORDERS,
  payload: payload,
});