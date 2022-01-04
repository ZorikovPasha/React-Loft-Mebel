import { ActionsTypes, CartItemType, removeItemActionType } from "../../types";

export type stateType = {
  cartItems: CartItemType[],
  quintity: number,
  totalCost: number,
}

const initialState: stateType = {
  cartItems: [],
  quintity: 0,
  totalCost: 0,
};

const removeReducer = (state = initialState, action: removeItemActionType): stateType => {
  
  switch (action.type) {
    case ActionsTypes.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload)
      }
    default:
      return state;
  }
};

export default removeReducer;
