import { CONST } from '../types';

export const removeItemActionCreator = (id: number) => ({
  type: CONST.REMOVE_CART_ITEM,
  payload: id
});