import { userFormValuesType } from "../../types";
import { ActionsTypes, userActionType } from "../../types/actionsTypes";

export const addUserDataActionCreator = (userData: userFormValuesType): userActionType => ({
  type: ActionsTypes.USER,
  payload: userData
});