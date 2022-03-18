import { RootState } from "./store";

export const getProducts = (state: RootState) => state.items;
export const getFilteredProductsByName = (query: string) => (state: RootState) => state.items.items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

export const getFavorites = (state: RootState) => state.favorites;

export const getCartItems = (state: RootState) => state.cartItems.cartItems;
export const getQuintity = (state: RootState) => state.cartItems.quintity;
export const getTotalCost = (state: RootState) => state.cartItems.totalCost;
export const getCartItemsQuintity = (state: RootState) => state.cartItems.quintity;
export const getOrderStatus = (state: RootState) => state.cartItems.isOrderMade;
export const getOrders = (state: RootState) => state.cartItems.orders;
export const getCartLoadingState = (state: RootState) => state.cartItems.isLoaded;

export const getIsAuth = (state: RootState) => state.auth.isAuth;
export const getUserData = (state: RootState) => state.user;