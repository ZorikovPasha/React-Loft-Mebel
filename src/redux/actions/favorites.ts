import { ActionsTypes } from '../../types/actionsTypes';

type favoritesActionsTypes = ActionsTypes.ADD_TO_FAVORITES | ActionsTypes.ADD_TO_FAVORITES_MULT | ActionsTypes.RESET_FAVORITES;

type actionCreatorType<T> = (payload?: T) => { type: favoritesActionsTypes, payload?: T}

export const addFavoriteActionCreator:actionCreatorType<number>  = (payload) => ({
  type: ActionsTypes.ADD_TO_FAVORITES,
  payload: payload
});


export const addMultipleFavoritesActionCreator:actionCreatorType<number[]> = (payload ) => ({
  type: ActionsTypes.ADD_TO_FAVORITES_MULT,
  payload: payload
});

export const resetFavoritesActionCreator: actionCreatorType<null> = () => ({
  type: ActionsTypes.RESET_FAVORITES,
});