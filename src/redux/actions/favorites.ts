import { favoritesActionType, ActionsTypes } from '../../types/actionsTypes';

export const favoritesActionCreator = (favorites: number): favoritesActionType => ({
  type: ActionsTypes.ADD_TO_FAVORITES,
  payload: favorites
});
