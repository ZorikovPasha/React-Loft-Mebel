import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ThunkAction } from 'redux-thunk';
import { useHistory } from 'react-router-dom';

import { fetchItemsActionType } from '../types';
import { getIsLoaded } from "../redux/getters";
import { stateType } from '../redux/reducers/itemsReducer';

export const useLoading = (
  thunkCreator: (queryParams: string) => ThunkAction<void, stateType, unknown, fetchItemsActionType>, 
  setState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {

    const history = useHistory();
    console.log('history', history);
    
    const areItemsLoaded = useSelector(getIsLoaded);

    const dispatch = useDispatch();


    // React.useEffect(() => {
    //   history.push({
    //     pathname: '',
    //     search: `?room=${}&material=${}&type=${}&page=${}`
    //   });
    // }, []);

    React.useState(() => {
      if (areItemsLoaded) {
        return;
      }

      setState(true);
      dispatch(thunkCreator(''));
      setState(false);
    });
};