import { CartItemType, cartItemsActionType, ActionsTypes } from '../../types';

export const cartItemsActionCreator = (item: CartItemType ): cartItemsActionType => ({
  type: ActionsTypes.CART_ITEMS,
  payload: item
});