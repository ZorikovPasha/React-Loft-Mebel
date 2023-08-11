import { NextFunction, Request, Response } from 'express'

export interface IRequestBody {
  userName?: string
  email?: string
  password?: string
}

export interface ILoginRequestBody {
  email?: string
  password?: string
}

export interface IUpdateUserDto {
  name: string | undefined | null
  surname: string | undefined | null
  email: string | undefined | null
  phone: string | undefined | null
  city: string | undefined | null
  street: string | undefined | null
  house: string | undefined | null
  apartment: string | undefined | null
  photo: string | undefined | null
  emailConfirmed: boolean | undefined | null
  wantsToReceiveEmailUpdates: boolean | undefined | null
}

// interface IValidationError {
//   value: string | number | undefined
//   msg: string | undefined
//   param: string
//   location: "body" | string
// }

// interface IValidationResult {
//   formatter: () => void
//   errors: IValidationError[]
// }

export type ResponseType = Promise<void | Response<Record<string, string>, Record<string, unknown>>>

export interface IUserController {
  register: (
    req: Request<{}, {}, IRequestBody>,
    res: Response,
    next: NextFunction
  ) => Promise<void | Response>

  login: (req: Request<{}, {}, ILoginRequestBody>, res: Response, next: NextFunction) => void

  updateUserData: (req: Request<{}, {}, IUpdateUserDto>, res: Response, next: NextFunction) => void

  getUserData: (req: Request, res: Response, next: NextFunction) => void
}
