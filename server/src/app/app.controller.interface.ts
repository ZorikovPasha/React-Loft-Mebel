import { NextFunction, Request, Response } from 'express'

export interface IFurnitureDimension {
  width: number
  length: number
  height: number
}

export interface ICreateFurnitureDto {
  name: string | unknown | undefined
  type: string | unknown | undefined
  priceOld: string | unknown | undefined
  priceNew: string | unknown | undefined
  colors: string | undefined | null | unknown
  rating: string | unknown | undefined
  sale: string | null | undefined
  room: string | unknown | undefined
  material: string | unknown | undefined
  brand: string | unknown | undefined
  dimensions: string | undefined | null | unknown
}

export interface IAppControllerInterface {
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

  deleteFurniture: (
    req: Request<{ id?: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => void
}
