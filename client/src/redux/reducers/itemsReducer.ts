import { IProcessedFurniture } from '../../utils'
import { BumpActionType, DumpActionType } from '../actions/items'
import { fetchItemsActionType, Actions } from '../actions/types'

export interface IProductsState {
  items: IProcessedFurniture[]
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

export const itemsReducer = (
  state = initialState,
  action: fetchItemsActionType | BumpActionType | DumpActionType
): IProductsState => {
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
    case Actions.BUMP_REVIEW_HELP_COUNT: {
      const newItems = state.items.slice()
      const reviewedProduct = newItems.find((item) => item.id === action.payload.productId)
      const review = reviewedProduct?.reviews.find((r) => r.id === action.payload.reviewId)

      if (!review) {
        return state
      }

      review.usersFoundThisHelpful = review.usersFoundThisHelpful + 1
      return {
        ...state,
        items: newItems
      }
    }
    case Actions.DUMP_REVIEW_HELP_COUNT: {
      const newItems = state.items.slice()
      const reviewedProduct = newItems.find((item) => item.id === action.payload.productId)
      const review = reviewedProduct?.reviews.find((r) => r.id === action.payload.reviewId)

      if (!review) {
        return state
      }

      if (review.usersFoundThisHelpful === 0) {
        return state
      }
      review.usersFoundThisHelpful = review.usersFoundThisHelpful - 1
      return {
        ...state,
        items: newItems
      }
    }
    default:
      return state
  }
}
