import { IFurniture } from '../api/types'
import { OrderInfoType } from '../types'
import { ICartItem } from './actions/cartItems'
import { IfavoritesState } from './reducers/favoritesReducer'
import { IUserState } from './reducers/userReducer'
import { RootState } from './store'

export const getProducts = (state: RootState): IFurniture[] => state.items.items
export const getFilteredProductsByName =
  (query: string) =>
  (state: RootState): IFurniture[] => {
    return state.items.items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
  }

export const getFavorites = (state: RootState): IfavoritesState => state.favorites
export const getCartItems = (state: RootState): ICartItem[] => state.cartItems.cartItems
export const getQuintity = (state: RootState): number => state.cartItems.quintity
export const getTotalCost = (state: RootState): number => state.cartItems.totalCost
export const getCartItemsQuintity = (state: RootState): number => state.cartItems.quintity
export const getOrderStatus = (state: RootState): boolean => state.cartItems.isOrderMade
export const getOrders = (state: RootState): OrderInfoType[] => state.cartItems.orders
export const getCartLoadingState = (state: RootState): boolean => state.cartItems.isLoaded
export const getIsUserLoggedin = (state: RootState): boolean => state.user.isLoggedIn
export const getUserData = (state: RootState): IUserState => state.user
