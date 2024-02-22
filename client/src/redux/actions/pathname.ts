import { Actions } from './types'

export const setPathnameActionCreator = (path: string) => ({
  type: Actions.SET_PATHNAME,
  payload: path
})
