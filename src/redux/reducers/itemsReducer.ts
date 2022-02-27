import { fetchItemsActionType, ProductType, ActionsTypes } from '../../types';

export type stateType = {
  items: ProductType[],
}

const initialState: stateType = {
  items: [],
}

const itemsReducer = (state = initialState, action: fetchItemsActionType ): stateType => {
  switch (action.type) {
    case ActionsTypes.FETCH_PRODUCTS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  };
};

export default itemsReducer;