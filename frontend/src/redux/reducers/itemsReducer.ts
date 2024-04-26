import { IProcessedFurniture } from '../../utils'
import { BumpActionType, DumpActionType } from '../actions/items'
import { fetchItemsActionType, Actions } from '../actions/types'

export interface IProductsState {
  items: IProcessedFurniture[]
  isLoaded: boolean
  isError: boolean
}

const initialState: IProductsState = {
  items: [],
  isLoaded: false,
  isError: false
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
    case Actions.BUMP_REVIEW_HELP_COUNT: {
      const newItems = state.items.map((product) => {
        if (product.id === action.payload.productId) {
          return {
            ...product,
            reviews: product.reviews.map((r) => {
              if (r.id === action.payload.reviewId) {
                return {
                  ...r,
                  usersFoundThisHelpful: r.usersFoundThisHelpful + 1
                }
              } else {
                return r
              }
            })
          }
        } else {
          return product
        }
      })

      return {
        ...state,
        items: newItems
      }
    }
    // -1 to reviews count
    case Actions.DUMP_REVIEW_HELP_COUNT: {
      const newItems = state.items.map((product) => {
        if (product.id === action.payload.productId) {
          return {
            ...product,
            reviews: product.reviews.map((r) => {
              if (r.id === action.payload.reviewId) {
                return {
                  ...r,
                  usersFoundThisHelpful: r.usersFoundThisHelpful <= 0 ? 0 : r.usersFoundThisHelpful - 1
                }
              } else {
                return r
              }
            })
          }
        } else {
          return product
        }
      })
      return {
        ...state,
        items: newItems
      }
    }
    default:
      return state
  }
}
