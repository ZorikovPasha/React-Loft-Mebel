import { cartItemsActionType, ActionsTypes } from '../../types/actionsTypes';
import { CartItemType } from '../../types';

export const cartItemsActionCreator = (item: CartItemType ): cartItemsActionType => ({
  type: ActionsTypes.CART_ITEMS,
  payload: item
});