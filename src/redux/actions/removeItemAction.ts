import { CONST } from '../types';
import { CartItemType } from '../types';

export const removeItemActionCreator = (obj: CartItemType) => ({
  type: CONST.REMOVE_CART_ITEM,
  payload: obj
});