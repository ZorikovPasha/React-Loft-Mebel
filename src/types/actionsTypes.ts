import { ProductType, SlideType, CartItemType, userFormValuesType, OrderInfoType } from "./index";

export enum ActionsTypes {
  FETCH_PRODUCTS = "FETCH_PRODUCTS",
  FETCH_SLIDES = "FETCH_SLIDES",
  ADD_TO_FAVORITES = 'ADD_TO_FAVORITES',
  ADD_TO_FAVORITES_MULT = 'ADD_TO_FAVORITES_MULT',
  ADD_CART_ITEMS = "ADD_CART_ITEMS",
  ADD_SINGLE_ITEM ='ADD_SINGLE_ITEM',
  QUINTITY = "QUINTITY",
  REMOVE_CART_ITEM = "REMOVE_CART_ITEM",
  CALC_TOTAL_COST = "CALC_TOTAL_COST",
  CURRENT_PRODUCT = "CURRENT_PRODUCT",
  AUTH = "AUTH",
  USER = "USER",
  RESET_CART = "RESET_CART",
  RESET_FAVORITES = "RESET_FAVORITES",
  ORDER_STATUS = "ORDER_STATUS",
  SET_ORDERS = "SET_ORDERS",
}

export type fetchItemsActionType = {
  type: ActionsTypes.FETCH_PRODUCTS;
  payload: ProductType[];
};


export type favoritesActionType = {
  type: ActionsTypes.ADD_TO_FAVORITES;
  payload: number;
} | {
  type: ActionsTypes.ADD_TO_FAVORITES_MULT;
  payload: number[];
} | {
  type: ActionsTypes.RESET_FAVORITES;
};

export type ordersActionCreator = {
  type: ActionsTypes.SET_ORDERS,
  payload: OrderInfoType[]
};

export type cartItemsActionType = {
  type: ActionsTypes.ADD_SINGLE_ITEM | ActionsTypes.REMOVE_CART_ITEM | ActionsTypes.RESET_CART
  | ActionsTypes.ORDER_STATUS ;
  payload: CartItemType;
} | ordersActionCreator | { 
  type: ActionsTypes.ADD_CART_ITEMS, 
  payload: CartItemType[] };


export type authActionType = {
  type: ActionsTypes.AUTH;
  payload: boolean;
}

export type userActionType = {
  type: ActionsTypes.USER,
  payload: userFormValuesType,
};

