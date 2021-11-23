import { ThunkAction } from 'redux-thunk';

import { ActionsTypes } from '../types';
import { fetchItemsActionType } from '../types';
import { initialStateType } from '../reducers/itemsReducer';
import { fetchItemsThunk } from '../api';

import { CONST } from '../types';

export type ProductType = {
  id: number,
  imageUrl: string,
  thumbsUrls: string[],
  name: string,
  type: string,
  priceOld: string | null,
  priceNew: string,
  dimensions: { width: number, length: number, height: number },
  colors: string[],
  rating: number,
  sale: string
}


export const fetchItemsThunkCreator = (): ThunkAction<void, initialStateType, unknown, ActionsTypes> => {
  return dispatch => {
    fetchItemsThunk('furniture', dispatch, fetchItemsAtionCreator)
  }
}


const fetchItemsAtionCreator = (items: []): fetchItemsActionType => ({
  type: CONST.FETCH_PRODUCTS,
  payload: items
});