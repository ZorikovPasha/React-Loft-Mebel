import { Actions } from '../../types/actionsTypes'

type favoritesActionsTypes =
  | typeof Actions.ADD_FAVORITES
  | typeof Actions.RESET_FAVORITES
  | typeof Actions.FAVORITES_LOADED
  | typeof Actions.REMOVE_FAVORITES

type actionCreatorType<T> = (payload?: T) => { type: favoritesActionsTypes; payload?: T }

export const addFavoritesActionCreator: actionCreatorType<number[]> = (items) => ({
  type: Actions.ADD_FAVORITES,
  payload: items
})

export const removeFavoritesActionCreator: actionCreatorType<number[]> = (items) => ({
  type: Actions.REMOVE_FAVORITES,
  payload: items
})

export const resetFavoritesActionCreator: actionCreatorType<null> = () => ({
  type: Actions.RESET_FAVORITES
})

export const loadingActionCreator: actionCreatorType<boolean> = (bool) => ({
  type: Actions.FAVORITES_LOADED,
  payload: bool
})
