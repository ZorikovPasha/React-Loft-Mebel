import React from 'react';
import { useDispatch } from "react-redux";
import { ThunkAction } from 'redux-thunk';

import { fetchItemsActionType } from '../types/actionsTypes';
import { stateType } from '../redux/reducers/itemsReducer';
import { useHistory } from 'react-router-dom';

export const useLoading = (
  thunkCreator: (queryParams: string) => ThunkAction<void, stateType, unknown, fetchItemsActionType>, 
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  queryParams: string,
  ) => {
    const dispatch = useDispatch();
    const history = useHistory();

    console.log(queryParams);
    

    React.useEffect(() => {
      setState(true);
      dispatch(thunkCreator(queryParams));
      setState(false);
    }, [history.location.search]);
};