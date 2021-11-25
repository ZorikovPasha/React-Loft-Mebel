import { currentProductActionType } from '../types';

import { CONST } from '../types';

export type initialStateType = {
  id: number | null
}

const initialState = {
  id: null
}

const currentProductReducer = (state: initialStateType = initialState, action: currentProductActionType ) => {
  switch (action.type) {
    case CONST.CURRENT_PRODUCT:
      return {
        ...state,
        id: action.payload,
      }
    default:
      return state;
  };
};

export default currentProductReducer;