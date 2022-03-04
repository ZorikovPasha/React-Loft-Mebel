import { ActionsTypes } from '../../types/actionsTypes';
import { CartItemType } from '../../types';

type removeActionsTypes = ActionsTypes.REMOVE_CART_ITEM | ActionsTypes.RESET_CART;

type actionCreatorType<T> = (payload?: T) => { type: removeActionsTypes, payload?: T}


export const removeItemActionCreator: actionCreatorType<CartItemType> = (obj) => ({
  type: ActionsTypes.REMOVE_CART_ITEM,
  payload: obj
});

export const resetCartActionCreator: actionCreatorType<null> = () => ({
  type: ActionsTypes.RESET_CART,
});