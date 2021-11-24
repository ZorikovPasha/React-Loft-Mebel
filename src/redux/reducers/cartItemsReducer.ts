import lodash from "lodash";

import { cartItemsActionType, CartItemType } from "../types";
import { CONST } from "../types";

export type initialStateType = {
  cartItems: [],
  quintity: number,
}

export const initialState = {
  cartItems: [],
  quintity: 0,
  totalCost: 0
};

const cartItemsReducer = (state = initialState, action: (cartItemsActionType)) => {
  switch (action.type) {
    case CONST.CART_ITEMS:
      let isEqual = false;
      const obj = {
        quintity: 1
      }
      state.cartItems.length &&
        state.cartItems.map((item: any) => {
          if ( lodash.isEqual({ ...item, ...obj},  { ...action.payload, ...obj }) ) {
            item.quintity += 1;
            isEqual = true;
          }
      });
      if (isEqual) {
        return {
          ...state,
          quintity: state.cartItems.reduce((partialSum, obj: any) => partialSum + obj.quintity, 0),
          totalCost: state.cartItems.reduce((partialCost, obj: CartItemType) => partialCost + obj.quintity * Number(obj.price.split(' ').join('')), 0)
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
          quintity: [...state.cartItems, action.payload].reduce((partialSum, a: any) => partialSum + a.quintity, 0),
          totalCost: [...state.cartItems, action.payload].reduce((partialCost, item) => partialCost + item.quintity * Number(item.price.split(' ').join('')), 0)
        };
      }
      case CONST.REMOVE_CART_ITEM:
        const remainingCartItems = state.cartItems.filter((item: any) => item.id !== action.payload);
        const remainingQuintity = state.cartItems.filter((item: any) => item.id !== action.payload).reduce((partialSum, a: any) => partialSum + a.quintity, 0);

        return {
          ...state,
          cartItems: remainingCartItems,
          quintity: remainingQuintity,
          totalCost: remainingCartItems.reduce((partialCost, item: CartItemType) => partialCost + item.quintity * Number(item.price.split(' ').join('')), 0)
        }
    default:
      return state;
  }
};

export default cartItemsReducer;