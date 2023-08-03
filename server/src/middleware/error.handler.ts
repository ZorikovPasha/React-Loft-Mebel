import { Request, Response } from 'express'
import { ApiError } from '../error/api.error.js'

export const errorHandler = (err: ApiError, req: Request, res: Response) => {
  return res.status(err.status).json({ message: err.message })
}
