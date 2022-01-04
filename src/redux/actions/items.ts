import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';

import { ActionsTypes, fetchItemsActionType } from '../../types';
import { stateType } from '../reducers/itemsReducer';
import { fetchItemsThunk } from '../../api';

export const fetchItemsThunkCreator = (): ThunkAction<void, stateType, unknown, fetchItemsActionType> => {
  return (dispatch: Dispatch<fetchItemsActionType>) => {
    fetchItemsThunk('furniture', dispatch, fetchItemsActionCreator )
  }
}

const fetchItemsActionCreator = (items: []): fetchItemsActionType => ({
  type: ActionsTypes.FETCH_PRODUCTS,
  payload: items
});