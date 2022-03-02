import { favoritesActionType,  ActionsTypes } from "../../types/actionsTypes";

type stateType = {
  favorites: number[];
};

const initialState: stateType = {
  favorites: [],
};

export const favoritesReducer = (
  state = initialState, 
  action: favoritesActionType 
  ): stateType => {
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
    case ActionsTypes.ADD_TO_FAVORITES_MULT:
      return {
        ...state,
        favorites: action.payload
      }
    case ActionsTypes.RESET_FAVORITES:
      return {
        ...state,
        ...initialState,
      }
    default:
      return state;
  }
};

export default favoritesReducer;
