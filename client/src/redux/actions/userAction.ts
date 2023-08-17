import { Actions } from '../../types/actionsTypes'
import { IUserState, userActionType } from '../reducers/userReducer'

export const loginUserActionCreator = (userData: Partial<IUserState>): userActionType => ({
  type: Actions.LOGIN,
  payload: userData
})

export const logoutUserActionCreator = () => ({
  type: Actions.LOGOUT,
  payload: {}
})
