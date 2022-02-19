import { RootState } from "./store";

export const getCurrentProductId = (state: RootState) => state.currentProduct.id;
export const getProducts = (state: RootState) => state.items.items;
export const getIsLoaded = (state: RootState) => state.items.isLoaded;
export const getCartItems = (state: RootState) => state.cartItems.cartItems;
export const getQuintity = (state: RootState) => state.cartItems.quintity;
export const getTotalCost = (state: RootState) => state.cartItems.totalCost;
export const getFavorites = (state: RootState) => state.favorites.favorites;
export const getCartItemsQuintity = (state: RootState) => state.cartItems.quintity;

