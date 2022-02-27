import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';

import { ActionsTypes, fetchItemsActionType, ProductType } from '../../types';
import { stateType } from '../reducers/itemsReducer';

import { getFurnitureItems } from '../../api';

export const fetchItemsThunkCreator = (queryParams: string): ThunkAction<void, stateType, unknown, fetchItemsActionType> => {
  return async (dispatch: Dispatch<fetchItemsActionType>) => {
    const furniture = await getFurnitureItems(queryParams);
    
    if (furniture) {
      dispatch(fetchItemsActionCreator(furniture));
    }
  }
}

const fetchItemsActionCreator = (items: Array<ProductType>): fetchItemsActionType => ({
  type: ActionsTypes.FETCH_PRODUCTS,
  payload: items
});
