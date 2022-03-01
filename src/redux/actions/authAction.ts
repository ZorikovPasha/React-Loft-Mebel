import { ActionsTypes, authActionType } from '../../types/actionsTypes';

export const authActionCreator = (isAuth: boolean): authActionType => ({
  type: ActionsTypes.AUTH,
  payload: isAuth,
})
