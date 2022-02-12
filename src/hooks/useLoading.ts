import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ThunkAction } from 'redux-thunk';

import { fetchItemsActionType } from '../types';
import { getIsLoaded } from "../redux/getters";
import { stateType } from '../redux/reducers/itemsReducer';

export const useLoading = (
  actionCreator: () => ThunkAction<void, stateType, unknown, fetchItemsActionType>, 
  setState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {

  const areItemsLoaded = useSelector(getIsLoaded);

  const dispatch = useDispatch();

  React.useState(() => {

    if (areItemsLoaded) {
      return;
    }

    setState(true);
    dispatch(actionCreator());
    setState(false);
  });
};