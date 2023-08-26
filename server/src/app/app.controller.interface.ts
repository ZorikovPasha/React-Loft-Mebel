import { NextFunction, Request, Response } from 'express'

export interface IFurnitureDimension {
  width: number
  length: number
  height: number
}

export interface ICreateFurnitureDto {
  name?: string
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
