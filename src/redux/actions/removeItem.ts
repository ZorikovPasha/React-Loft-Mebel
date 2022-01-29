import { CartItemType, ActionsTypes, cartItemsActionType } from '../../types';

export const removeItemActionCreator = (obj: CartItemType): cartItemsActionType => ({
  type: ActionsTypes.REMOVE_CART_ITEM,
  payload: obj
});