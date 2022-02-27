import { ProductType, SlideType, CartItemType } from "./index";

export enum ActionsTypes {
  FETCH_PRODUCTS = "FETCH_PRODUCTS",
  FETCH_SLIDES = "FETCH_SLIDES",
  ADD_TO_FAVORITES = 'ADD_TO_FAVORITES',
  CART_ITEMS = "CART_ITEMS",
  QUINTITY = "QUINTITY",
  REMOVE_CART_ITEM = "REMOVE_CART_ITEM",
  CALC_TOTAL_COST = "CALC_TOTAL_COST",
  CURRENT_PRODUCT = "CURRENT_PRODUCT",
  AUTH = "AUTH"
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
};

export type cartItemsActionType = {
  type: ActionsTypes.CART_ITEMS | ActionsTypes.REMOVE_CART_ITEM;
  payload: CartItemType;
}

export type quintityActionType = {
  type: ActionsTypes.QUINTITY;
}

export type currentProductActionType = {
  type: ActionsTypes.CURRENT_PRODUCT;
  payload: number;
}

export type authActionType = {
  type: ActionsTypes.AUTH;
  payload: boolean;
}

