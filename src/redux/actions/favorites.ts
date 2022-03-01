import { ActionsTypes } from '../../types/actionsTypes';

export const addFavoriteActionCreator = (favorites: number) => ({
  type: ActionsTypes.ADD_TO_FAVORITES,
  payload: favorites
});


export const addMultipleFavoritesActionCreator = (favorites: number[]) => ({
  type: ActionsTypes.ADD_TO_FAVORITES_MULT,
  payload: favorites
});

export const resetFavoritesActionCreator = () => ({
  type: ActionsTypes.RESET_FAVORITES,
});