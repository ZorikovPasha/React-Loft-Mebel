import { Actions } from '../../types/actionsTypes'

export type userActionType = {
  type: typeof Actions.LOGIN | typeof Actions.LOGOUT | typeof Actions.EDIT_USER_DATA
  payload: Partial<IUserState>
}

type OrderStatusType = 'CREATED' | 'WORKING' | 'COMPLETED' | 'CANCELED'

interface ICartItem {
  id: number
  furnitureId: number
  quintity: number
}

interface IOrder {
  id: number
  userId: string
  name: string
  status: OrderStatusType
  createdAt: Date
  updatedAt: Date
  items: {
    id: number
    furnitureId: number
    orderId: number
    quintity: number
  }
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

const userReducer = (state = initialState, action: userActionType): IUserState => {
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

      console.log('newFavorites', newFavorites)

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
        favorites: newFavorites,
        cart: [...rest, ...newItems]
      }
    }
    case Actions.LOGOUT:
      return initialState
    default:
      return state
  }
}

export default userReducer
