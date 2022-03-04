import { ActionsTypes } from '../../types/actionsTypes';

type authActionsTypes = ActionsTypes.AUTH;

type actionCreatorType<T> = (payload: T) => { type: authActionsTypes, payload?: T}

export const authActionCreator: actionCreatorType<boolean> = (isAuth) => ({
  type: ActionsTypes.AUTH,
  payload: isAuth,
})
