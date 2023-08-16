import { ActionsTypes } from '../../types/actionsTypes'

type favoritesActionsTypes =
  | ActionsTypes.ADD_FAVORITES
  | ActionsTypes.RESET_FAVORITES
  | ActionsTypes.FAVORITES_LOADED
  | ActionsTypes.REMOVE_FAVORITES

type actionCreatorType<T> = (payload?: T) => { type: favoritesActionsTypes; payload?: T }

export const addFavoritesActionCreator: actionCreatorType<number[]> = (items) => ({
  type: ActionsTypes.ADD_FAVORITES,
  payload: items
})

export const removeFavoritesActionCreator: actionCreatorType<number[]> = (items) => ({
  type: ActionsTypes.REMOVE_FAVORITES,
  payload: items
})

export const resetFavoritesActionCreator: actionCreatorType<null> = () => ({
  type: ActionsTypes.RESET_FAVORITES
})

export const loadingActionCreator: actionCreatorType<boolean> = (bool) => ({
  type: ActionsTypes.FAVORITES_LOADED,
  payload: bool
})
