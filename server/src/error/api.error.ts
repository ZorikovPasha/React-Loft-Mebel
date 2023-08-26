export class ApiError {
  status: number
  message: string
  constructor(status: number, message: string) {
    this.status = status
    this.message = message
  }

  public static badRequest(message: string): ApiError {
    return new ApiError(400, message)
  }

  public static internal(error: Error): ApiError {
    return new ApiError(500, error.message)
  }

  public static notAuthorized(message: string): ApiError {
    return new ApiError(401, message)
  }
}
