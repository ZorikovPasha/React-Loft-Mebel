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

export interface ISuccessfullResponse {
  success: boolean
}

export interface IRegisterUser400 {
  // <- this coud be actually general 400 for many requests
  message: string | string[]
  error: 'Bad Request' // <- can convert this to string too
  statusCode: 400
}

export interface I500Response {
  statusCode: 500
  message: 'Internal server error'
}

// login

export interface ILoginUser400 {
  statusCode: 400
  message: string
}

export interface I401Response {
  message: 'Unauthorized'
  statusCode: 401
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
    surname: string | null
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
    decidedOnWantsToReceiveEmailUpdates: boolean
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

export interface IImage {
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
}

export interface IReviewRes {
  id: number | null
  text: string | null
  score: number | null
  furnitureId: number | null
  user: {
    userName: string | undefined
    image: IImage | null
    id: string
  } | null
  attachedPictures: (IImage | null)[] | null
  createdAt: Date
  updatedAt: Date
}

export interface IReview {
  id: number | null
  text: string | null
  score: number | null
  furnitureId: number | null
  user: {
    userName: string | null
    image: IImage | null
    id: string | null
  } | null
  attachedPictures: IImage[]
  createdAt: Date
  updatedAt: Date
}

export interface IFurniture {
  id: number | null
  imageId: number | null
  name: string | null
  type: string | null
  priceOld: string | null
  priceNew: string | null
  colors: string[]
  rating: string | null
  sale: boolean
  room: string | null
  material: string | null
  brand: string | null
  image: IImage | null
  description: string | null
  specs: string | null
  dimensions: {
    id: number
    furnitureId: number
    width: number
    length: number
    height: number
  }[]
  reviews: IReview[]
}

export interface IFurnitureItemRes {
  id: number
  imageId: number | null
  name: string | null
  type: string | null
  priceOld: string | null
  priceNew: string | null
  colors: string[] | null
  rating: string | null
  sale: boolean | null
  room: string | null
  material: string | null
  brand: string | null
  image: IImage | null
  description: string | null
  specs: string | null
  dimensions:
    | {
        id: number
        furnitureId: number
        width: number
        length: number
        height: number
      }[]
    | null
  reviews: IReviewRes[] | null
}

export interface IFurnitureResponse {
  filtered: IFurnitureItemRes[]
  all: IFurnitureItemRes[]
}

export interface IErrorsResponse {
  errors:
    | {
        field: string
        message: string
      }[]
    | null
}

export interface IErrorResponse {
  message: string
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

export const isILogin400 = (data: ISuccessfullLoginResponse | ILoginUser400 | I500Response): data is ILoginUser400 => {
  // @ts-expect-error this is okay here
  return data.statusCode === 400
}

export const isSuccessfullLoginResponse = <T>(
  data: ISuccessfullLoginResponse | T
): data is ISuccessfullLoginResponse => {
  // @ts-expect-error this is okay here
  return typeof data.token === 'string' && Boolean(data.user)
}

export const isRegisterUser200 = <T>(data: ISuccessfullResponse | T): data is ISuccessfullResponse => {
  // @ts-expect-error this is okay here
  return data.success
}

export const isRes200 = <T>(data: ISuccessfullResponse | T): data is ISuccessfullResponse => {
  // @ts-expect-error this is okay here
  return data.success == true
}

export const isRes500 = <T>(data: I500Response | T): data is I500Response => {
  // @ts-expect-error this is okay here
  return data.statusCode === 500
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
  data: IErrorsResponse | IErrorResponse | ISuccessfullResponse
): data is ISuccessfullResponse => {
  const property: keyof ISuccessfullResponse = 'success'
  return property in data && data.success === true
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
