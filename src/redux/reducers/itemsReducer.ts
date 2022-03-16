import { ProductType} from '../../types';
import { fetchItemsActionType, ActionsTypes } from '../../types/actionsTypes';

export type stateType = {
  items: ProductType[],
  isLoaded: boolean,
  isError: boolean,
}

const initialState: stateType = {
  items: [],
  isLoaded: false,
  isError: false,
}

const itemsReducer = (state = initialState, action: fetchItemsActionType ): stateType => {
  switch (action.type) {
    case ActionsTypes.SET_PRODUCTS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  };
};

export default itemsReducer;