import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'

import { ActionsTypes, fetchItemsActionType } from '../../types/actionsTypes'
import { ProductType } from '../../types'
import { stateType } from '../reducers/itemsReducer'

import { ApiClient } from '../../api'

export const fetchItemsThunkCreator = (
  queryParams: string
): ThunkAction<void, stateType, unknown, fetchItemsActionType> => {
  return async (dispatch: Dispatch<fetchItemsActionType>) => {
    const furniture = await ApiClient.get<ProductType[]>('/api/furniture' + queryParams)
    dispatch(setItemsActionCreator(furniture))
  }
}

type actionCreatorType<T> = (payload: T) => fetchItemsActionType

export const setItemsActionCreator: actionCreatorType<ProductType[]> = (items) => ({
  type: ActionsTypes.SET_PRODUCTS,
  payload: { items, isLoaded: true }
})

export const resetItemsActionCreator: actionCreatorType<ProductType[]> = (items) => ({
  type: ActionsTypes.SET_PRODUCTS,
  payload: { items, isLoaded: false }
})
