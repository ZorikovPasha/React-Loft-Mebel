import { favoritesActionType, ActionsTypes } from '../../types';

export const favoritesActionCreator = (favorites: number): favoritesActionType => ({
  type: ActionsTypes.FAVORITES,
  payload: favorites
});