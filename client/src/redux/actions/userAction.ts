import { Actions } from '../../types/actionsTypes'
import {
  ICartItem,
  IOrder,
  IUserState,
  addProductToCartActionType,
  editOrderActionType,
  removeProductToCartActionType,
  userActionType
} from '../reducers/userReducer'

export const loginUserActionCreator = (userData: Partial<IUserState>): userActionType => ({
  type: Actions.LOGIN,
  payload: userData
})

export const editUserActionCreator = (userData: Partial<IUserState>): userActionType => ({
  type: Actions.EDIT_USER_DATA,
  payload: userData
})

export const logoutUserActionCreator = () => ({
  type: Actions.LOGOUT,
  payload: {}
})

export const addProductToCartActionCreator = (payload: ICartItem): addProductToCartActionType => ({
  type: Actions.ADD_CART_ITEM,
  payload: payload
})

export const removeProductFromCartActionCreator = (payload: ICartItem): removeProductToCartActionType => ({
  type: Actions.REMOVE_CART_ITEM,
  payload: payload
})

export const editOrderActionCreator = (payload: IOrder): editOrderActionType => ({
  type: Actions.EDIT_ORDER,
  payload: payload
})
