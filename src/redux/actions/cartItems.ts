import { CartItemType, cartItemsActionType, CONST } from '../types';

export const cartItemsActionCreator = (item: CartItemType ): cartItemsActionType => ({
  type: CONST.CART_ITEMS,
  payload: item
});