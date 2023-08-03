import { Response } from 'express'

export class ApiError {
  status: number
  message: string
  constructor(status: number, message: string) {
    this.status = status
    this.message = message
  }

  public static badRequest(message: string) {
    return new ApiError(400, message)
  }

  public static internal(error: Error) {
    return new ApiError(500, error.message)
  }

  public static default(res: Response) {
    return res.status(500).json({ message: 'An error occured' })
  }

  public static notAuthorized(res: Response, message: string) {
    return res.status(401).json({ message })
  }
}
