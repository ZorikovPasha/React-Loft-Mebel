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

export interface ILoginResponse {
  token: string
  message?: string
}

export interface IResponseWithMessage {
  message: string
}

export interface IGetUserDataResponse {
  name: string | undefined
  surname: string | undefined
  userName: string | undefined
  email: string | undefined
  phone: string | undefined
  city: string | undefined
  street: string | undefined
  house: string | undefined
  apartment: string | undefined
  emailConfirmed: boolean | undefined
  createdAt: string | undefined
}

export type FormDataType = Omit<SignUpCredsType, 'password'> & { message: string }

export interface IFurniture {
  id: number
  imageId: number
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
  image: {
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
  } | null
  dimensions: {
    id: number
    furnitureId: number
    width: number
    length: number
    height: number
  } | null
}

export interface IFurnitureResponse {
  items: IFurniture[]
}

export interface IErrorsResponse {
  errors: {
    field: string
    message: string
  }[]
}

export interface IErrorResponse {
  message: string
}

export interface ISuccessfullResponse {
  success: boolean
}

export const isSuccessFullResponse = (
  data: IErrorsResponse | IErrorResponse | ISuccessfullResponse
): data is ISuccessfullResponse => {
  return 'success' in data
}

export const isResponseWithErrors = (
  data: IErrorsResponse | IErrorResponse | ISuccessfullResponse
): data is IErrorsResponse => {
  return 'errors' in data
}

export const isStringPropertyname = (obj: Record<string, unknown>, key: string): key is keyof typeof obj => {
  return key in obj
}

export interface ICartItemsResponse {
  items: {
    id: number
    furnitureId: number
    cartId: number
    quintity: number
  }[]
}
