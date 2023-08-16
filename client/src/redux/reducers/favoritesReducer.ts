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
      const itemsToAdd = action.payload.reduce((accum: number[], next) => {
        return accum.includes(next) ? accum : [...accum, next]
      }, [])

      return {
        ...state,
        favorites: itemsToAdd
      }
    }
    case ActionsTypes.REMOVE_FAVORITES: {
      const remaningItems = action.payload.reduce((accum: number[], next) => {
        return state.favorites.filter((f) => f !== next)
      }, [])
      return {
        ...state,
        favorites: remaningItems
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
