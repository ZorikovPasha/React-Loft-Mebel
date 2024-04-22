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

export interface IAddFavouriteAction {
  type: typeof Actions.ADD_FAVORITE
  payload: { id: number }
}

export interface IRemoveFavouriteAction {
  type: typeof Actions.REMOVE_FAVORITE
  payload: { id: number }
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
  createdAt: Date | null
  updatedAt: Date | null
  reviews: {
    id: number
    helpfulForThisUser: boolean
  }[]
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
  reviews: [],
  favorites: [],
  orders: [],
  cart: [],
  createdAt: null,
  updatedAt: null
}

export const userReducer = (
  state = initialState,
  action:
    | userActionType
    | addProductToCartActionType
    | removeProductToCartActionType
    | editOrderActionType
    | IAddFavouriteAction
    | IRemoveFavouriteAction
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
      let newFavorites: number[] = [...state.favorites]

      action.payload.favorites?.forEach((id) => {
        if (state.favorites.includes(id)) {
          newFavorites = state.favorites.filter((f) => f !== id).concat(newFavorites)
        } else {
          newFavorites.push(id)
        }
      })

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

    case Actions.ADD_FAVORITE: {
      if (!state.favorites.includes(action.payload.id)) {
        return {
          ...state,
          favorites: [...state.favorites, action.payload.id]
        }
      } else {
        return state
      }
    }

    case Actions.REMOVE_FAVORITE: {
      return {
        ...state,
        favorites: state.favorites.filter((id) => id !== action.payload.id)
      }
    }

    default:
      return state
  }
}
