import { favoritesActionType, ActionsTypes } from '../../types/actionsTypes'

type stateType = {
  favorites: number[]
  isLoaded: boolean
}

const initialState: stateType = {
  favorites: [],
  isLoaded: false
}

export const favoritesReducer = (state = initialState, action: favoritesActionType): stateType => {
  switch (action.type) {
    case ActionsTypes.ADD_FAVORITES:
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
