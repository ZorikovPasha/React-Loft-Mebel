import isEqual from 'lodash.isequal'

import { cartItemsActionType, ActionsTypes } from '../../types/actionsTypes'
import { OrderInfoType } from '../../types'
import { ICartItem } from '../actions/cartItems'

export interface ICartState {
  cartItems: ICartItem[]
  quintity: number
  totalCost: number
  isOrderMade: boolean
  orders: OrderInfoType[]
  isLoaded: boolean
}

const initialState: ICartState = {
  cartItems: [],
  quintity: 0,
  totalCost: 0,
  isOrderMade: false,
  orders: [],
  isLoaded: false
}

const cartItemsReducer = (state = initialState, action: cartItemsActionType): ICartState => {
  switch (action.type) {
    case ActionsTypes.REMOVE_CART_ITEM: {
      const remainingCartItems = state.cartItems.filter((item) => item.id !== action.payload.id)
      const productsLeft = remainingCartItems.reduce((accum, next) => accum + next.quintity, 0)

      const totalCost = remainingCartItems.reduce((partialCost, item) => {
        return partialCost + item.quintity * item.price
      }, 0)

      return {
        ...state,
        cartItems: remainingCartItems,
        quintity: productsLeft,
        totalCost
      }
    }

    case ActionsTypes.RESET_CART:
      return {
        ...initialState,
        isLoaded: true,
        quintity: 0,
        totalCost: 0,
        orders: state.orders
      }
    case ActionsTypes.ORDER_STATUS:
      return {
        ...state,
        isOrderMade: action.payload
      }
    case ActionsTypes.SET_ORDERS:
      return {
        ...state,
        orders: action.payload
      }
    case ActionsTypes.ADD_CART_ITEMS: {
      const buff: ICartItem[] = []

      if (state.cartItems.length) {
        action.payload.forEach((cartItem) => {
          state.cartItems.forEach((item) => {
            if (isEqual({ ...item, quintity: 1 }, { ...cartItem, quintity: 1 })) {
              item.quintity += 1
            } else {
              buff.push(cartItem)
            }
          })
        })
        if (buff.length) {
          return {
            ...state,
            cartItems: [...state.cartItems, ...buff],
            quintity: [...state.cartItems, ...buff].reduce((accum, a) => accum + a.quintity, 0),
            totalCost: [...state.cartItems, ...buff].reduce(
              (partialCost, item) => partialCost + item.quintity * item.price,
              0
            )
          }
        } else {
          return {
            ...state,
            quintity: state.cartItems.reduce((accum, obj) => accum + obj.quintity, 0),
            totalCost: state.cartItems.reduce((accum, obj) => accum + obj.quintity * obj.price, 0)
          }
        }
      } else {
        return {
          ...state,
          cartItems: action.payload,
          quintity: action.payload.length,
          totalCost: action.payload.reduce((accum, item) => accum + item.price, 0)
        }
      }
    }
    case ActionsTypes.CART_LOADING:
      return {
        ...state,
        isLoaded: action.payload
      }
    default:
      return state
  }
}

export default cartItemsReducer
