import { authActionType, ActionsTypes } from "../../types/actionsTypes";


export const initialState = {
  isAuth: false,
};

type stateType = typeof initialState;


const authReducer = (state: stateType = initialState, action: authActionType): stateType => {
  switch (action.type) {
    case ActionsTypes.AUTH:
      return {
        ...state,
        isAuth: action.payload,
      };
    default:
      return state;

  }
};

export default authReducer;