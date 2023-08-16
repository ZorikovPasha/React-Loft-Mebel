import { Actions } from '../../types/actionsTypes'
import { IUserState } from '../reducers/userReducer'

export const loginUserActionCreator = (userData: IUserState) => ({
  type: Actions.LOGIN,
  payload: userData
})

export const logoutUserActionCreator = () => ({
  type: Actions.LOGOUT,
  payload: {}
})
