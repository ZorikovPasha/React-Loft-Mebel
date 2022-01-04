import { CartItemType, ActionsTypes } from '../../types';

export const removeItemActionCreator = (obj: CartItemType) => ({
  type: ActionsTypes.REMOVE_CART_ITEM,
  payload: obj
});