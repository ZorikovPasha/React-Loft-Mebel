import { IAccessTokenRegenRes, ILoginRes, ILoginSuccessfullRes } from '../../../server/src/auth/types'
import { IGetFurnitureRes, IGetFurnitureSuccessRes } from '../../../server/src/furniture/types'
import {
  IAddOrderRes,
  IAddOrderSuccessRes,
  IGetOrdersRes,
  IGetOrdersSuccessfullRes,
  IGetUSerDataRes,
  IGetUSerDataSuccessRes,
  ISuccessfullResponse,
  IThisReviewWasHelpfulRes,
  IThisReviewWasHelpfulSuccessRes
} from '../../../server/src/user/types'

export type LoginCredsType = {
  email: string
  password: string
}

export type OrderStatusType = 'CREATED' | 'WORKING' | 'COMPLETED' | 'CANCELED'

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

export interface ISuccessfullAccessTokenRegenResponse {
  token: string
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

export interface CreateUserDto {
  userName: string
  email: string
  password: string
}

export interface AddFavoriteFurnitureDto {
  id: number
}

export interface AddCartItemDto {
  productId: number
  quintity: number
  color: string
}

export interface RemoveCartItemDto {
  productId: number
  color: string
}

export interface EditOrderDto {
  orderId: number
}

export interface UserRequestDto {
  message: string
}

export const isGetOrdersResponseSuccessfull = (res: IGetOrdersRes): res is IGetOrdersSuccessfullRes => {
  if (typeof res === 'undefined') {
    return false
  }
  return Boolean(res.orders) && Array.isArray(res.orders)
}

export const isILogin400 = (data: ILoginRes | ILoginUser400): data is ILoginUser400 => {
  // @ts-expect-error this is okay here
  return data.statusCode === 400
}

export const isSuccessfullLoginResponse = (data: ILoginRes): data is ILoginSuccessfullRes => {
  if (!data) {
    return false
  }
  return typeof data.token === 'string' && Boolean(data.user)
}

export const isRes500 = <T>(data: I500Response | T): data is I500Response => {
  // @ts-expect-error this is okay here
  return data.statusCode === 500
}

export const isSuccessfullMakeOrderResponse = (dto: IAddOrderRes): dto is IAddOrderSuccessRes => {
  if (!dto) {
    return false
  }
  const property: keyof IAddOrderSuccessRes = 'order'
  return property in dto && typeof dto[property] !== 'undefined'
}

export const isSuccessfullResponse = (
  data: ISuccessfullResponse | Record<string, unknown> | undefined
): data is ISuccessfullResponse => {
  const property: keyof ISuccessfullResponse = 'success'
  if (!data) {
    return false
  }
  return property in data && data[property] === true
}

export const isResponseWithErrors = <T extends Record<keyof T, unknown>>(
  data: IErrorsResponse | IErrorResponse | T | undefined
): data is IErrorsResponse => {
  if (!data) {
    return false
  }
  return 'errors' in data
}

export const isSuccessfullNewAccessTokenResponse = (res: IAccessTokenRegenRes) => {
  if (!res) {
    return false
  }
  return res.token && typeof res.token === 'string'
}

export const isDataOfFurniture = (data: IGetFurnitureRes): data is IGetFurnitureSuccessRes => {
  if (typeof data !== 'object') {
    return false
  }

  if (data === null) {
    return false
  }
  return Array.isArray(data.all) && Array.isArray(data.filtered)
}

export const isReviewWasHelpfullSuccess = (res: IThisReviewWasHelpfulRes): res is IThisReviewWasHelpfulSuccessRes => {
  if (typeof res === 'undefined') {
    return false
  }

  const property: keyof IThisReviewWasHelpfulSuccessRes = 'wasHelpfull'
  return property in res
}

export const isSuccessfullGetUserResponse = (res: IGetUSerDataRes): res is IGetUSerDataSuccessRes => {
  if (typeof res === 'undefined') {
    return false
  }
  const property: keyof IGetUSerDataSuccessRes = 'user'
  return property in res
}
