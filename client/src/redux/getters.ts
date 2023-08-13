import { CartItemType, OrderInfoType, ProductType, userFormValuesType } from '../types'
import { IfavoritesState } from './reducers/favoritesReducer'
import { IProductsState } from './reducers/itemsReducer'
import { RootState } from './store'

export const getProducts = (state: RootState): IProductsState => state.items
export const getFilteredProductsByName =
  (query: string) =>
  (state: RootState): ProductType[] => {
    return state.items.items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
  }

export const getFavorites = (state: RootState): IfavoritesState => state.favorites

export const getCartItems = (state: RootState): CartItemType[] => state.cartItems.cartItems
export const getQuintity = (state: RootState): number => state.cartItems.quintity
export const getTotalCost = (state: RootState): number => state.cartItems.totalCost
export const getCartItemsQuintity = (state: RootState): number => state.cartItems.quintity
export const getOrderStatus = (state: RootState): boolean => state.cartItems.isOrderMade
export const getOrders = (state: RootState): OrderInfoType[] => state.cartItems.orders
export const getCartLoadingState = (state: RootState): boolean => state.cartItems.isLoaded

export const getIsAuth = (state: RootState): boolean => state.auth.isAuth
export const getUserData = (state: RootState): userFormValuesType => state.user
