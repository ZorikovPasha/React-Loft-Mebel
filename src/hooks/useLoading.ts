import React from 'react';
import { useDispatch } from "react-redux";
import { ThunkAction } from 'redux-thunk';

import { fetchItemsActionType } from '../types';
import { stateType } from '../redux/reducers/itemsReducer';

export const useLoading = (
  thunkCreator: (queryParams: string) => ThunkAction<void, stateType, unknown, fetchItemsActionType>, 
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  queryParams: string
  ) => {
    const dispatch = useDispatch();

    React.useState(() => {
      setState(true);
      dispatch(thunkCreator(queryParams));
      setState(false);
    });
};