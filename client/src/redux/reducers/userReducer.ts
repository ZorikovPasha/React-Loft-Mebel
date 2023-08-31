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

export type editOrderActionType = {
  type: typeof Actions.EDIT_ORDER
  payload: IOrder
}

export interface ICartItem {
  id: number
  furnitureId: number
  quintity: number
  color: string
}

export interface IOrder {
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
  action: userActionType | addProductToCartActionType | removeProductToCartActionType | editOrderActionType
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
      let newFavorites: number[] = []

      action.payload.favorites?.map((next) => {
        newFavorites = state.favorites.includes(next)
          ? state.favorites.filter((f) => f !== next)
          : [...state.favorites, next]
      }, []) ?? []

      return {
        ...state,
        ...action.payload,
        ...(action.payload.favorites && { favorites: newFavorites })
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

    case Actions.EDIT_ORDER: {
      return {
        ...state,
        orders: state.orders.map((o) => (o.id === action.payload.id ? { ...o, ...action.payload } : o))
      }
    }

    default:
      return state
  }
}
