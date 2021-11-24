import { CONST } from '../types';

import { favoritesActionType } from '../types';

export const favoritesActionCreator = (favorites: number): favoritesActionType => ({
  type: CONST.FAVORITES,
  payload: favorites
})