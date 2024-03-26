interface ISuccessfullResponse {
  success: true
}

export interface IOrder {
  id: number
  userId: string
  name: string
  status: string | null
  items: {
    id: number
    furnitureId: number
    orderId: number
    quintity: number
    color: string
  }[]
  createdAt: Date
  updatedAt: Date
}

export interface IReviewUserFoundHelpfull {
  id: number
  helpfulForThisUser: boolean
}

export interface ICollectedUserData {
  id: string
  name: string
  userName: string
  surname: string | null
  email: string
  phone: string | null
  city: string | null
  street: string | null
  house: string | null
  apartment: string | null
  image: {
    id: number
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    hash: string
    ext: string
    size: number
    url: string
    mime: string
    provider: string
    createdAt: Date
    updatedAt: Date
  } | null
  role: string
  emailConfirmed: boolean
  decidedOnWantsToReceiveEmailUpdates: boolean
  wantsToReceiveEmailUpdates: boolean
  reviews: IReviewUserFoundHelpfull[]
  favorites: number[]
  orders: IOrder[]
  cart: {
    id: number
    furnitureId: number
    cartId: number
    quintity: number
    color: string
  }[]
  createdAt: Date
  updatedAt: Date
}

export type ILogoutRes = ISuccessfullResponse | Record<string, unknown> | undefined

export type IAccessTokenRegenRes = { token: string } | Record<string, unknown> | undefined

export type ILoginSuccessfullRes = {
  token: string
  user: ICollectedUserData
}

export type ILoginRes = ILoginSuccessfullRes | Record<string, unknown> | undefined

export type IRegisterRes = ISuccessfullResponse | Record<string, unknown> | undefined
