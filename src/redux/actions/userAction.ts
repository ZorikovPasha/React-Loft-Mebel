import { userFormValuesType } from "../../types";
import { ActionsTypes } from "../../types/actionsTypes";

type userActionsTypes = ActionsTypes.USER;

type actionCreatorType<T> = (payload?: T) => { type: userActionsTypes, payload?: T}


export const addUserDataActionCreator: actionCreatorType<userFormValuesType> = (userData) => ({
  type: ActionsTypes.USER,
  payload: userData
});