import { NextFunction, Request, Response } from 'express'
import { LoggerService } from '../logger/logger.service'

type RolesType = 'BASIC' | 'EDITOR' | 'AUTHOR' | 'ADMIN'

interface IAppLocals {
  user:
    | {
        id: string
        name: string
        surname: string
        userName: string
        password: string
        email: string
        phone: string
        city: string | null
        street: string | null
        house: string | null
        apartment: string | null
        photo: Buffer | null
        role: RolesType
        emailConfirmed: boolean
        wantsToReceiveEmailUpdates: boolean
        createdAt: Date
        updatedAt: Date
        orders: string[]
        favorites: string[]
      }
    | undefined
}

export interface AppResponse extends Response {
  locals: IAppLocals
}

export interface IFurnitureDimension {
  width: number
  length: number
  height: number
}

export interface ICreateFurnitureDto {
  name?: string
  // type?: "coach" | "bed" | "table" | "chair" | "set" | "bedsideTables" | string
  type?: string
  priceOld?: string
  priceNew?: string
  colors?: string | undefined | null | unknown
  rating?: string
  sale?: string | null | undefined
  room?: string
  material?: string
  brand?: string
  dimensions: string | undefined | null | unknown
}

export interface IAddCartItemDto {
  productId?: number
  quintity?: number
  color?: string
}

export interface IRemoveCartItemDto {
  productId?: number
}

export type AppLocalsResponseType = Promise<void | Response<Record<string, string>, IAppLocals>>

export interface IAppControllerInterface {
  mappedValues: Record<string, string>
  logger: LoggerService

  getFilteredFurniture: (req: Request, res: Response, next: NextFunction) => void

  createFurniture: (
    req: Request<{}, {}, ICreateFurnitureDto>,
    res: Response,
    next: NextFunction
  ) => void

  getSingleFurniture: (
    req: Request<{}, {}, {}, { id?: string }>,
    res: Response,
    next: NextFunction
  ) => void

  addFavoriteItem: (
    req: Request<{}, {}, { id?: number }>,
    res: Response,
    next: NextFunction
  ) => void

  deleteFavouriteItem: (
    req: Request<{}, {}, { id?: number }>,
    res: Response,
    next: NextFunction
  ) => void

  getFavorites: (req: Request, res: AppResponse, next: NextFunction) => void

  getCartItems: (req: Request, res: AppResponse, next: NextFunction) => void

  addCartItem: (req: Request<{}, {}, IAddCartItemDto>, res: AppResponse, next: NextFunction) => void

  removeCartItem: (
    req: Request<{}, {}, IRemoveCartItemDto>,
    res: AppResponse,
    next: NextFunction
  ) => void

  getOrders: (req: Request, res: Response, next: NextFunction) => void

  addOrder: (req: Request, res: AppResponse, next: NextFunction) => void

  deleteOrder: (req: Request<{}, {}, { id: number }>, res: AppResponse, next: NextFunction) => void
}
