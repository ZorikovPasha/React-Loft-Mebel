import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'

import { Actions, fetchItemsActionType } from './types'
import { IProductsState } from '../reducers/itemsReducer'
import { PublicApiClient } from '../../api'
import { isDataOfFurniture } from '../../api/types'
import { IProcessedFurniture, sanitizeFurnitureItem } from '../../utils'

export const fetchItemsThunkCreator = () // queryParams: string
: ThunkAction<void, IProductsState, unknown, fetchItemsActionType> => {
  return async (dispatch: Dispatch<fetchItemsActionType>) => {
    const controller = new AbortController()
    const furniture = await PublicApiClient.getFurniture('', controller.signal)
    if (isDataOfFurniture(furniture)) {
      dispatch(setItemsActionCreator(furniture.all.map(sanitizeFurnitureItem)))
    }
  }
}

type actionCreatorType<T> = (payload: T) => fetchItemsActionType

export const setItemsActionCreator: actionCreatorType<IProcessedFurniture[]> = (items) => ({
  type: Actions.SET_PRODUCTS,
  payload: { items, isLoaded: true }
})

export const resetItemsActionCreator: actionCreatorType<IProcessedFurniture[]> = (items) => ({
  type: Actions.SET_PRODUCTS,
  payload: { items, isLoaded: false }
})

export const triggerCatalogRerender = () => ({
  type: Actions.FORCE_RERENDER
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
