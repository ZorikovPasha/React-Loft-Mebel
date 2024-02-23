import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'

import { Actions, fetchItemsActionType } from './types'
import { IProductsState } from '../reducers/itemsReducer'
import { PublicApiClient } from '../../api'
import { IFurniture } from '../../api/types'
import { sanitizeFurnitureItem } from '../../utils'

export const fetchItemsThunkCreator = () // queryParams: string
: ThunkAction<void, IProductsState, unknown, fetchItemsActionType> => {
  return async (dispatch: Dispatch<fetchItemsActionType>) => {
    const controller = new AbortController()
    const furniture = await PublicApiClient.getFurniture('', controller.signal)
    dispatch(setItemsActionCreator(furniture.all.map(sanitizeFurnitureItem)))
  }
}

type actionCreatorType<T> = (payload: T) => fetchItemsActionType

export const setItemsActionCreator: actionCreatorType<IFurniture[]> = (items) => ({
  type: Actions.SET_PRODUCTS,
  payload: { items, isLoaded: true }
})

export const resetItemsActionCreator: actionCreatorType<IFurniture[]> = (items) => ({
  type: Actions.SET_PRODUCTS,
  payload: { items, isLoaded: false }
})
