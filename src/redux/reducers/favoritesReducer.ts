import { CONST } from "../types";
import { favoritesActionType } from "../types";

type initialStateType = {
  favorites: number[];
};

const initialState: initialStateType = {
  favorites: [],
};

export const favoritesReducer = (state = initialState, action: favoritesActionType) => {
  switch (action.type) {
    case CONST.FAVORITES:
      if (state.favorites.includes(action.payload)) {
        const arr = [...state.favorites].filter(item => item !== action.payload)
        return {
          ...state,
          favorites: arr
        }
      } else {
        return {
          ...state,
          favorites: state.favorites.length 
            ? [...state.favorites, action.payload] 
            : [...state.favorites, action.payload],
        };
      }
    default:
      return state;
  }
};

export default favoritesReducer;
