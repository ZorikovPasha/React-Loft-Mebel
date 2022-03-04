import { authActionType, ActionsTypes } from "../../types/actionsTypes";


export const initialState = {
  isAuth: false,
};


const authReducer = (state = initialState, action: authActionType): typeof initialState => {
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