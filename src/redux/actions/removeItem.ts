import { ActionsTypes, cartItemsActionType } from '../../types/actionsTypes';
import { CartItemType } from '../../types';

export const removeItemActionCreator = (obj: CartItemType): cartItemsActionType => ({
  type: ActionsTypes.REMOVE_CART_ITEM,
  payload: obj
});

export const resetCartActionCreator = () => ({
  type: ActionsTypes.RESET_CART,
});