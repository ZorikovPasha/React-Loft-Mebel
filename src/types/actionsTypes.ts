import { ProductType, SlideType, CartItemType, userFormValuesType } from "./index";

export enum ActionsTypes {
  FETCH_PRODUCTS = "FETCH_PRODUCTS",
  FETCH_SLIDES = "FETCH_SLIDES",
  ADD_TO_FAVORITES = 'ADD_TO_FAVORITES',
  ADD_TO_FAVORITES_MULT = 'ADD_TO_FAVORITES_MULT',
  CART_ITEMS = "CART_ITEMS",
  QUINTITY = "QUINTITY",
  REMOVE_CART_ITEM = "REMOVE_CART_ITEM",
  CALC_TOTAL_COST = "CALC_TOTAL_COST",
  CURRENT_PRODUCT = "CURRENT_PRODUCT",
  AUTH = "AUTH",
  USER = "USER",
  RESET_CART = "RESET_CART",
  RESET_FAVORITES = "RESET_FAVORITES",
}

export type fetchItemsActionType = {
  type: ActionsTypes.FETCH_PRODUCTS;
  payload: ProductType[];
};

export type fetchSlidesActionType = {
  type: ActionsTypes.FETCH_SLIDES;
  payload: SlideType[];
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


export type favoritesMultActionType = {
  type: ActionsTypes.ADD_TO_FAVORITES_MULT;
  payload: number[];
};

export type cartItemsActionType = {
  type: ActionsTypes.CART_ITEMS | ActionsTypes.REMOVE_CART_ITEM | ActionsTypes.RESET_CART;
  payload: CartItemType;
}

export type quintityActionType = {
  type: ActionsTypes.QUINTITY;
}

export type authActionType = {
  type: ActionsTypes.AUTH;
  payload: boolean;
}

export type userActionType = {
  type: ActionsTypes.USER,
  payload: userFormValuesType,
};

