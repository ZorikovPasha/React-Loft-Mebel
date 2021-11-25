import { CONST } from '../types';

export const currentProductActionCreator = (id: number) => ({
  type: CONST.CURRENT_PRODUCT,
  payload: id
});