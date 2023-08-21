import { OrderStatusType } from '../../api/types'
import { Actions } from '../../types/actionsTypes'

export type userActionType = {
  type: typeof Actions.LOGIN | typeof Actions.LOGOUT | typeof Actions.EDIT_USER_DATA | typeof Actions.ADD_CART_ITEM
  payload: Partial<IUserState>
}

export type addProductToCartActionType = {
  type: typeof Actions.ADD_CART_ITEM
  payload: ICartItem
}

export type removeProductToCartActionType = {
  type: typeof Actions.REMOVE_CART_ITEM
  payload: ICartItem
}

export interface ICartItem {
  id: number
  furnitureId: number
  quintity: number
  color: string
}

interface IOrder {
  id: number
  userId: string
  name: string
  status: OrderStatusType
  createdAt: string
  updatedAt: string
  items: {
    id: number
    furnitureId: number
    orderId: number
    quintity: number
    color: string
  }[]
}

export interface IUserState {
  id: string
  isLoggedIn: boolean
  name: string
  email: string
  surname: string
  phone: string
  city: string
  street: string
  house: string
  apartment: string
  image: {
    name: string
    url: string
  } | null
  emailConfirmed: boolean
  wantsToReceiveEmailUpdates: boolean
  createdAt?: Date
  updatedAt?: Date
  favorites: number[]
  orders: IOrder[]
  cart: ICartItem[]
}

export const initialState: IUserState = {
  id: '',
  isLoggedIn: false,
  name: '',
  email: '',
  surname: '',
  phone: '',
  city: '',
  street: '',
  house: '',
  apartment: '',
  image: null,
  emailConfirmed: false,
  wantsToReceiveEmailUpdates: false,
  favorites: [],
  orders: [],
  cart: []
}

export const userReducer = (
  state = initialState,
  action: userActionType | addProductToCartActionType | removeProductToCartActionType
): IUserState => {
  switch (action.type) {
    case Actions.LOGIN: {
      const newFavorites =
        action.payload.favorites?.reduce((accum: number[], next) => {
          return state.favorites.includes(next) ? accum.filter((f) => f !== next) : [...accum, next]
        }, []) ?? []
      return {
        ...state,
        ...action.payload,
        favorites: [...state.favorites, ...newFavorites],
        isLoggedIn: true
      }
    }
    case Actions.EDIT_USER_DATA: {
      const newFavorites =
        action.payload.favorites?.reduce((accum: number[], next) => {
          return state.favorites.includes(next) ? state.favorites.filter((f) => f !== next) : [...state.favorites, next]
        }, []) ?? []

      const newItems: ICartItem[] = []
      let rest: ICartItem[] = []
      action.payload.cart?.forEach((item) => {
        const candidate = state.cart.find((i) => i.furnitureId === item.furnitureId)
        if (candidate) {
          rest = state.cart.filter((i) => i.furnitureId !== item.furnitureId)
        } else {
          rest.push(item)
        }
      })
      return {
        ...state,
        ...action.payload,
        ...(action.payload.favorites && { favorites: newFavorites }),
        ...(action.payload.cart && { cart: [...rest, ...newItems] })
      }
    }
    case Actions.LOGOUT:
      return initialState
    case Actions.ADD_CART_ITEM: {
      const payload = action.payload as ICartItem
      const candidate = state.cart.find((item) => {
        return item.furnitureId === payload.furnitureId && item.color === payload.color
      })

      if (candidate) {
        candidate.quintity = candidate.quintity + payload.quintity
      }
      return {
        ...state,
        cart: candidate ? state.cart : [...state.cart, payload]
      }
    }
    case Actions.REMOVE_CART_ITEM: {
      const filteredProducts = state.cart.filter((p) => {
        return p.furnitureId !== action.payload.furnitureId ? true : p.color !== action.payload.color
      })
      return {
        ...state,
        cart: filteredProducts
      }
    }
    default:
      return state
  }
}
