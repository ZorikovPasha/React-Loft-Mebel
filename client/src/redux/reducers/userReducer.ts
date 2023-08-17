import { Actions } from '../../types/actionsTypes'

export type userActionType = {
  type: typeof Actions.LOGIN | typeof Actions.LOGOUT
  payload: Partial<IUserState>
}

type OrderStatusType = 'CREATED' | 'WORKING' | 'COMPLETED' | 'CANCELED'

interface ICartItem {
  id: number
  furnitureId: number
  cartId: number
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
  favorites: number[] | never[]
  orders: IOrder[] | never[]
  cart: ICartItem[] | never[]
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
    case Actions.LOGIN:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true
      }
    case Actions.LOGOUT:
      return initialState
    default:
      return state
  }
}

export default userReducer
