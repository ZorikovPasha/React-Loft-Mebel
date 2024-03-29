import { ICollectedUserData } from '../auth/types'

export interface ISuccessfullResponse {
  success: true
}

export type IGetOrdersSuccessfullRes = {
  orders: ({
    id: number
    userId: string
    name: string
    status: string | null
    createdAt: Date
    updatedAt: Date
  } & {
    items: {
      id: number
      furnitureId: number
      orderId: number
      quintity: number
      color: string
    }[]
  })[]
}

export type IUpdateUserRes = ISuccessfullResponse | Record<string, unknown> | undefined

export type IAddFavoriteItemRes = ISuccessfullResponse | Record<string, unknown> | undefined

export type IDeleteFavouriteItemRes = ISuccessfullResponse | Record<string, unknown> | undefined

export type IAddCartItemRes = ISuccessfullResponse | Record<string, unknown> | undefined

export type IRemoveCartItemRes = ISuccessfullResponse | Record<string, unknown> | undefined

export type IGetOrdersRes = IGetOrdersSuccessfullRes | Record<string, unknown> | undefined

export type IAddOrderSuccessRes = {
  order: {
    id: number
    userId: string
    name: string
    status: string | null
    createdAt: Date
    updatedAt: Date
  } & {
    items: {
      id: number
      furnitureId: number
      orderId: number
      quintity: number
      color: string
    }[]
  }
}

export type IAddOrderRes = IAddOrderSuccessRes | Record<string, unknown> | undefined

export type ICancelOrderRes = ISuccessfullResponse | Record<string, unknown> | undefined

export type IMakeRequestRes = ISuccessfullResponse | Record<string, unknown> | undefined

export type IMakeReviewRes = ISuccessfullResponse | Record<string, unknown> | undefined

export interface IThisReviewWasHelpfulSuccessRes {
  wasHelpfull: boolean
}

export type IThisReviewWasHelpfulRes =
  | IThisReviewWasHelpfulSuccessRes
  | {
      statusCode: number
      message: string
    }
  | undefined

export interface IGetUSerDataSuccessRes {
  user: ICollectedUserData
}

export type IGetUSerDataRes =
  | IGetUSerDataSuccessRes
  | {
      statusCode: number
      message: string
    }
  | undefined
