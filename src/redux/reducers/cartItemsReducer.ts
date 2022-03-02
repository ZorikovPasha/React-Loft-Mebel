import _ from "lodash";

import { cartItemsActionType, ActionsTypes } from "../../types/actionsTypes";
import { CartItemType } from "../../types";

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

const cartItemsReducer = (state = initialState, action: cartItemsActionType): stateType => {
  switch (action.type) {
    case ActionsTypes.CART_ITEMS:
      let isEqual = false;
      const obj = {
        quintity: 1
      }
      state.cartItems.length &&
        state.cartItems.forEach((item: CartItemType) => {
          if ( _.isEqual({ ...item, ...obj},  { ...action.payload, ...obj }) ) {
            item.quintity += 1;
            isEqual = true;
          }
      });
      if (isEqual) {
        return {
          ...state,
          quintity: state.cartItems.reduce((partialSum, obj: CartItemType) => partialSum + obj.quintity, 0),
          totalCost: state.cartItems.reduce((partialCost, obj: CartItemType) => partialCost + obj.quintity * obj.price, 0)
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
          quintity: [...state.cartItems, action.payload].reduce((partialSum, a: CartItemType) => partialSum + a.quintity, 0),
          totalCost: [...state.cartItems, action.payload].reduce((partialCost, item) => partialCost + item.quintity * item.price, 0)
        };
      }
    case ActionsTypes.REMOVE_CART_ITEM:
      const remainingCartItems = state.cartItems.filter((item: CartItemType) => item.id !== action.payload.id);
      const remainingQuintity = state.cartItems.filter((item: CartItemType) => item.id !== action.payload.id).reduce((partialSum, a: CartItemType) => partialSum + a.quintity, 0);

      return {
        ...state,
        cartItems: remainingCartItems,
        quintity: remainingQuintity,
        totalCost: remainingCartItems.reduce((partialCost, item: CartItemType) => partialCost + item.quintity * item.price, 0)
      }
    case ActionsTypes.RESET_CART:
      return {
        ...state,
        ...initialState,
      }
    default:
      return state;
  }
};

export default cartItemsReducer;