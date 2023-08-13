import { favoritesActionType, ActionsTypes } from '../../types/actionsTypes'

export interface IfavoritesState {
  favorites: number[]
  isLoaded: boolean
}

const initialState: IfavoritesState = {
  favorites: [],
  isLoaded: false
}

export const favoritesReducer = (state = initialState, action: favoritesActionType): IfavoritesState => {
  switch (action.type) {
    case ActionsTypes.ADD_FAVORITES: {
      let tmpState = [...state.favorites]
      let tmpPayload = [...action.payload]
      action.payload.forEach((id) => {
        if (state.favorites.includes(id)) {
          tmpState = tmpState.filter((item) => item !== id)
          tmpPayload = tmpPayload.filter((item) => item !== id)
        }
      })
      return {
        ...state,
        favorites: [...tmpState, ...tmpPayload]
      }
    }
    case ActionsTypes.RESET_FAVORITES:
      return {
        ...state,
        ...initialState
      }
    case ActionsTypes.FAVORITES_LOADED:
      return {
        ...state,
        isLoaded: action.payload
      }
    default:
      return state
  }
}

export default favoritesReducer
