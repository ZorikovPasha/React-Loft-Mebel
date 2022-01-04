import { currentProductActionType, ActionsTypes } from '../../types';

export type stateType = {
  id: number | null
}

const initialState: stateType = {
  id: null
}

const currentProductReducer = (state = initialState, action: currentProductActionType ): stateType => {
  switch (action.type) {
    case ActionsTypes.CURRENT_PRODUCT:
      return {
        ...state,
        id: action.payload,
      }
    default:
      return state;
  };
};

export default currentProductReducer;