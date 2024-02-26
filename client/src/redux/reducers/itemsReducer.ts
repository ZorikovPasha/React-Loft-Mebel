import { IFurniture } from '../../api/types'
import { fetchItemsActionType, Actions } from '../actions/types'

export interface IProductsState {
  items: IFurniture[]
  isLoaded: boolean
  isError: boolean
  bool: boolean
}

const initialState: IProductsState = {
  items: [],
  isLoaded: false,
  isError: false,
  bool: false
}

export const itemsReducer = (state = initialState, action: fetchItemsActionType): IProductsState => {
  switch (action.type) {
    case Actions.SET_PRODUCTS:
      return {
        ...state,
        ...action.payload
      }
    case Actions.FORCE_RERENDER:
      return {
        ...state,
        bool: !state.bool
      }
    default:
      return state
  }
}
