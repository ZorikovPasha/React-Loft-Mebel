import { IFurniture } from '../../api/types'
import { fetchItemsActionType, Actions } from '../../types/actionsTypes'

export interface IProductsState {
  items: IFurniture[]
  isLoaded: boolean
  isError: boolean
}

const initialState: IProductsState = {
  items: [],
  isLoaded: false,
  isError: false
}

const itemsReducer = (state = initialState, action: fetchItemsActionType): IProductsState => {
  switch (action.type) {
    case Actions.SET_PRODUCTS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default itemsReducer
