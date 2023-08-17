interface IFurnitureDimension {
  width: string
  length: string
  height: string
}

export interface ICreateFurnitureDto {
  name: string
  type: string
  priceOld: string
  priceNew: string
  colors: string[]
  rating: string
  sale: boolean
  room: string
  material: string
  brand: string
  dimensions: IFurnitureDimension[]
}

export interface SignUpCredsType {
  userName: string
  email: string
  password: string
}

export type LoginCredsType = Omit<SignUpCredsType, 'userName'>

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

export interface IUserResponse {
  user: {
    id: string
    name: string
    surname: string
    userName: string
    email: string
    phone: string
    city: string
    street: string
    house: string
    apartment: string
    image: {
      alternativeText: string
      caption: string
      createdAt: Date
      data: {
        type: 'Buffer'
        data: Buffer
      }
      ext: string
      hash: string
      height: number
      id: number
      mime: string
      name: string
      provider: 'database'
      size: number
      updatedAt: Date
      url: string
      width: number
    } | null
    role: string
    emailConfirmed: boolean
    wantsToReceiveEmailUpdates: boolean
    createdAt: Date
    updatedAt: Date
    favorites: number[] | never[] | null
    orders: IOrder[] | never[] | null
    cart: ICartItem[] | never[] | null
  }
}

export interface ISuccessfullLoginResponse extends IUserResponse {
  token: string
}

export type FormDataType = Omit<SignUpCredsType, 'password'> & { message: string }

export interface IFurniture {
  id: number
  imageId: number
  name: string
  type: string
  priceOld: string
  priceNew: string
  colors: string[]
  rating: string
  sale: boolean
  room: string
  material: string
  brand: string
  image: {
    id: number
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    hash: string
    ext: string
    size: number
    url: string
    mime: string
    provider: string
    createdAt: string
    updatedAt: string
  } | null
  dimensions: {
    id: number
    furnitureId: number
    width: number
    length: number
    height: number
  } | null
}

export interface IFurnitureResponse {
  items: IFurniture[]
}

export interface IErrorsResponse {
  errors:
    | {
        field: string | null
        message: string | null
      }[]
    | null
}

export interface IErrorResponse {
  message: string
}

export interface ISuccessfullResponse {
  success: boolean
}

export const isSuccessfullResponse = (
  data: IErrorsResponse | IErrorResponse | ISuccessfullResponse
): data is ISuccessfullResponse => {
  const property: keyof ISuccessfullResponse = 'success'
  return property in data
}

export const isSuccessfullLoginResponse = (
  data: IErrorsResponse | IErrorResponse | ISuccessfullLoginResponse
): data is ISuccessfullLoginResponse => {
  const property: keyof ISuccessfullLoginResponse = 'token'
  return property in data
}

export const isSuccessfullGetUserResponse = (
  data: IErrorsResponse | IErrorResponse | IUserResponse
): data is IUserResponse => {
  const property: keyof IUserResponse = 'user'
  return property in data
}

export const isResponseWithErrors = <T extends Record<keyof T, unknown>>(
  data: IErrorsResponse | IErrorResponse | T
): data is IErrorsResponse => {
  return 'errors' in data
}

export const isStringPropertyname = (obj: Record<string, unknown>, key: string): key is keyof typeof obj => {
  return key in obj
}

export interface ICartItemsResponse {
  items: {
    id: number
    furnitureId: number
    cartId: number
    quintity: number
  }[]
}

export interface IFavoritesResponse {
  items: {
    id: number
    userId: string
    furnitureId: number
  }[]
}

export interface ICartItemRequest {
  quintity: number
  productId: number
}
