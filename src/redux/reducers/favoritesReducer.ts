import { favoritesActionType, ActionsTypes } from "../../types";

type stateType = {
  favorites: number[];
};

const initialState: stateType = {
  favorites: [],
};

export const favoritesReducer = (state = initialState, action: favoritesActionType): stateType => {
  switch (action.type) {
    case ActionsTypes.ADD_TO_FAVORITES:
      if (state.favorites.includes(action.payload)) {
        const arr = [...state.favorites].filter(item => item !== action.payload)
        return {
          ...state,
          favorites: arr
        }
      } else {
        return {
          ...state,
          favorites: [...state.favorites, action.payload]
        };
      }
    default:
      return state;
  }
};

export default favoritesReducer;
