import { ActionsTypes } from '../types';

import { CONST } from '../types';

export type initialStateType = {
  slides: Object[]
};

const initialState = {
  slides: []
}

const slidesReducer = (state: initialStateType = initialState, action: ActionsTypes ) => {
  switch (action.type) {
    case CONST.FETCH_SLIDES:
      return {
        ...state,
        slides: action.payload,
      }
    default:
      return state;
  };
};

export default slidesReducer;