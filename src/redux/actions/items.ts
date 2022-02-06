import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';

import { ActionsTypes, fetchItemsActionType, sortItemsActionType, ProductType } from '../../types';
import { stateType } from '../reducers/itemsReducer';
import { getFurnitureItems } from '../../api';

export const fetchItemsThunkCreator = (): ThunkAction<void, stateType, unknown, fetchItemsActionType> => {
  return async (dispatch: Dispatch<fetchItemsActionType>) => {
    const furniture = await getFurnitureItems();
    dispatch(fetchItemsActionCreator(furniture));
  }
}

const fetchItemsActionCreator = (items: Array<ProductType>): fetchItemsActionType => ({
  type: ActionsTypes.FETCH_PRODUCTS,
  payload: items
});

export const sortASCActionCreator = (): sortItemsActionType => ({
  type: ActionsTypes.SORT_ASC,
});

export const sortDESCActionCreator = (): sortItemsActionType => ({
  type: ActionsTypes.SORT_DESC,
});

export const sortPOPActionCreator = (): sortItemsActionType => ({
  type: ActionsTypes.SORT_POP,
});