import { Actions, pathnameActionType } from '../../types/actionsTypes'

export interface IPathnameState {
  pathname: string
}

const initialState: IPathnameState = {
  pathname: '/'
}

export const pathnameReducer = (state = initialState, action: pathnameActionType): IPathnameState => {
  switch (action.type) {
    case Actions.SET_PATHNAME:
      return {
        pathname: action.payload
      }
    default:
      return state
  }
}
