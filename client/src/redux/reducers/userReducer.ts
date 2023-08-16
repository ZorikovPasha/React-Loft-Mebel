import { Actions } from '../../types/actionsTypes'

export type userActionType = {
  type: typeof Actions.LOGIN | typeof Actions.LOGOUT
  payload: IUserState
}

export interface IUserState {
  isLoggedIn: boolean
  name: string
  email: string
  surname: string
  phone: string
  city: string
  street: string
  house: string
  apartment: string
}

export const initialState: IUserState = {
  isLoggedIn: false,
  name: '',
  email: '',
  surname: '',
  phone: '',
  city: '',
  street: '',
  house: '',
  apartment: ''
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
