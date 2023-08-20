import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'

import { Actions, fetchItemsActionType } from '../../types/actionsTypes'
import { IProductsState } from '../reducers/itemsReducer'
import { UserApiClient } from '../../api'
import { IFurniture } from '../../api/types'

export const fetchItemsThunkCreator = () // queryParams: string
: ThunkAction<void, IProductsState, unknown, fetchItemsActionType> => {
  return async (dispatch: Dispatch<fetchItemsActionType>) => {
    const controller = new AbortController()
    const furniture = await UserApiClient.getFurniture(controller.signal)
    dispatch(setItemsActionCreator(furniture.items))
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
