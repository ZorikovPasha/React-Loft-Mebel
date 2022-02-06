import { fetchItemsActionType, ProductType, ActionsTypes, sortItemsActionType } from '../../types';
import { ascendingSort, descendingSort } from '../../utils';

export type stateType = {
  items: ProductType[],
  isLoaded: boolean,
}

const initialState: stateType = {
  items: [],
  isLoaded: false
}

const itemsReducer = (state = initialState, action: fetchItemsActionType | sortItemsActionType ): stateType => {
  switch (action.type) {
    case ActionsTypes.FETCH_PRODUCTS:
      return {
        ...state,
        isLoaded: true,
        items: action.payload,
      }
    case ActionsTypes.SORT_ASC:
      return {
        ...state,
        items: [...ascendingSort(state.items)],
      }
      case ActionsTypes.SORT_DESC:
        return {
          ...state,
          items: [...descendingSort(state.items, 'priceNew')],
        }
      case ActionsTypes.SORT_POP:
        return {
          ...state,
          items: [...descendingSort(state.items, 'rating')],
        }
  
    default:
      return state;
  };
};

export default itemsReducer;