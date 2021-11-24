import { ActionsTypes, ProductType } from '../types';

import { CONST } from '../types';

export type initialStateType = {
  items: ProductType[]
}

const initialState = {
  items: []
}

const itemsReducer = (state: initialStateType = initialState, action: ActionsTypes ) => {
  switch (action.type) {
    case CONST.FETCH_PRODUCTS:
      return {
        ...state,
        items: action.payload,
      }
    default:
      return state;
  };
};

export default itemsReducer;