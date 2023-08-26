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

export type OrderStatusType = 'CREATED' | 'WORKING' | 'COMPLETED' | 'CANCELED'

interface ICartItemResponse {
  id: number
  furnitureId: number
  cartId: number
  quintity: number
  color: string
}

interface IOrderResponse {
  id: number
  userId: string
  name: string
  status: OrderStatusType
  createdAt: string
  updatedAt: string
  items:
    | {
        id: number
        furnitureId: number
        orderId: number
        quintity: number
        color: string
      }[]
    | null
    | undefined
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
    orders: IOrderResponse[] | never[] | null
    cart: ICartItemResponse[] | never[] | null
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
  dimensions:
    | {
        id: number
        furnitureId: number
        width: number
        length: number
        height: number
      }[]
    | null
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

export interface ICartItemRequest {
  quintity: number
  productId: number
  color: string
}

export interface ISuccessfullMakeOrderResponse {
  order: {
    items:
      | {
          id: number
          furnitureId: number
          orderId: number
          quintity: number
          color: string
        }[]
      | null
    id: number
    name: string
    createdAt: string
    updatedAt: string
    status: OrderStatusType
    userId: string
  }
}

export interface ICancelOrderResponse {
  id: number
  userId: string
  name: string
  status: 'CANCELED' | string
  createdAt: Date
  updatedAt: Date
}

export interface IRemoveCartItemDto {
  productId: number
  color: string
}

export const isSuccessfullMakeOrderResponse = (
  dto: ISuccessfullMakeOrderResponse | IErrorResponse
): dto is ISuccessfullMakeOrderResponse => {
  const propertyName: keyof ISuccessfullMakeOrderResponse = 'order'
  return propertyName in dto
}

export const isSuccessfullResponse = (
  data: IErrorsResponse | IErrorResponse | ISuccessfullResponse
): data is ISuccessfullResponse => {
  const property: keyof ISuccessfullResponse = 'success'
  return property in data
}

export const isSuccessfullCancelOrderResponse = (
  data: IErrorsResponse | IErrorResponse | ICancelOrderResponse
): data is ICancelOrderResponse => {
  const property: keyof ICancelOrderResponse = 'status'
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
