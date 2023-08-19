import { Actions } from '../../types/actionsTypes'

export const setPathnameActionCreator = (path: string) => ({
  type: Actions.SET_PATHNAME,
  payload: path
})
