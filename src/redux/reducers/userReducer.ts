import { userFormValuesType } from "../../types";
import { ActionsTypes, userActionType } from "../../types/actionsTypes";

export const initFormValues = {
  name: '',
  email: '',
  surname: '',
  phone: '',
  city: '',
  street: '',
  house: '',
  apartment: '',
};

const userReducer = (state = initFormValues, action: userActionType): userFormValuesType => {
  switch (action.type) {
    case ActionsTypes.USER: 
      return {
        ...state,
        ...action.payload
      }
    default:
      return {
        ...state
      }
  }
};

export default userReducer;