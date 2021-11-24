import { CONST, removeItemActionType } from "../types";
import { initialState } from "./cartItemsReducer";

const removeReducer = (state = initialState, action: removeItemActionType) => {
  
  switch (action.type) {
    case CONST.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item: any) => item.id !== action.payload)
      }
    default:
      return state;
  }
};

export default removeReducer;
