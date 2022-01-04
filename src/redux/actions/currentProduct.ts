import { ActionsTypes } from '../../types';

export const currentProductActionCreator = (id: number) => ({
  type: ActionsTypes.CURRENT_PRODUCT,
  payload: id
});