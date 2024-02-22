import { Actions, IPathnameAction } from '../actions/types'

export interface IPathnameState {
  pathname: string
}

const initialState: IPathnameState = {
  pathname: '/'
}

export const pathnameReducer = (state = initialState, action: IPathnameAction): IPathnameState => {
  switch (action.type) {
    case Actions.SET_PATHNAME:
      return {
        pathname: action.payload
      }
    default:
      return state
  }
}
