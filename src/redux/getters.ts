import { RootState } from "./store";

export const getProducts = (state: RootState) => state.items.items;
export const getCartItems = (state: RootState) => state.cartItems.cartItems;
export const getQuintity = (state: RootState) => state.cartItems.quintity;
export const getTotalCost = (state: RootState) => state.cartItems.totalCost;
export const getFavorites = (state: RootState) => state.favorites.favorites;
export const getCartItemsQuintity = (state: RootState) => state.cartItems.quintity;
export const getIsAuth = (state: RootState) => state.auth.isAuth;
export const getUserData = (state: RootState) => state.user;
export const getOrderStatus = (state: RootState) => state.cartItems.isOrderMade;
export const getOrders = (state: RootState) => state.cartItems.orders;

