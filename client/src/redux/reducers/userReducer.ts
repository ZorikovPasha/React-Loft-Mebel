import { OrderStatusType } from '../../api/types'
import { Actions } from '../actions/types'

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
  status: OrderStatusType | null
  createdAt: Date
  updatedAt: Date
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
  decidedOnWantsToReceiveEmailUpdates: boolean
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
  decidedOnWantsToReceiveEmailUpdates: false,
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
          return state.favorites.includes(next) ? accum.filter((f) => f !== next) : accum.concat(next)
        }, []) ?? []
      return {
        ...state,
        ...action.payload,
        favorites: state.favorites.concat(newFavorites),
        isLoggedIn: true
      }
    }

    case Actions.EDIT_USER_DATA: {
      let newFavorites: number[] = []

      action.payload.favorites?.forEach((next) => {
        if (state.favorites.includes(next)) {
          newFavorites = state.favorites.filter((f) => f !== next)
        } else {
          newFavorites.push(next)
        }
      }) ?? []

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
        cart: candidate ? state.cart : state.cart.concat(payload)
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
        orders: state.orders.map((o) => (o.id === action.payload.id ? Object.assign(o, action.payload) : o))
      }
    }

    default:
      return state
  }
}
