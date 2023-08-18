import { IFurniture } from '../api/types'
import { OrderInfoType } from '../types'
import { ICartItem } from './actions/cartItems'
import { IUserState } from './reducers/userReducer'
import { RootState } from './store'

export const getProducts = (state: RootState): IFurniture[] => state.items.items
export const getFilteredProductsByName =
  (query: string) =>
  (state: RootState): IFurniture[] => {
    return state.items.items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
  }

export const getCartItems = (state: RootState): ICartItem[] => state.cartItems.cartItems
export const getTotalCost = (state: RootState): number => state.cartItems.totalCost
export const getOrderStatus = (state: RootState): boolean => state.cartItems.isOrderMade
export const getOrders = (state: RootState): OrderInfoType[] => state.cartItems.orders
export const getCartLoadingState = (state: RootState): boolean => state.cartItems.isLoaded
export const getUserData = (state: RootState): IUserState => state.user
