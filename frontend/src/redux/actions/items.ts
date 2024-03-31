import { Actions, fetchItemsActionType } from './types'
import { IProcessedFurniture } from '../../utils'

type actionCreatorType<T> = (payload: T) => fetchItemsActionType

export const setItemsActionCreator: actionCreatorType<IProcessedFurniture[]> = (items) => ({
  type: Actions.SET_PRODUCTS,
  payload: { items, isLoaded: true }
})

export type BumpActionType = {
  type: typeof Actions.BUMP_REVIEW_HELP_COUNT
  payload: { reviewId: number; productId: number }
}

export type DumpActionType = {
  type: typeof Actions.DUMP_REVIEW_HELP_COUNT
  payload: { reviewId: number; productId: number }
}

export const bumpReviewHelpCount = (productId: number, reviewId: number): BumpActionType => {
  return {
    type: Actions.BUMP_REVIEW_HELP_COUNT,
    payload: { reviewId, productId }
  }
}

export const dumpReviewHelpCount = (productId: number, reviewId: number): DumpActionType => {
  return {
    type: Actions.DUMP_REVIEW_HELP_COUNT,
    payload: { reviewId, productId }
  }
}
