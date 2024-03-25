interface ISuccessfullResponse {
  success: true
}

export type ICreateFurniture = ISuccessfullResponse | Record<string, unknown> | undefined

export interface IImage {
  id: number
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  hash: string
  ext: string
  size: number
  url: string
  mime: string
  provider: 'database' | string
  createdAt: Date
  updatedAt: Date
}

export interface IReviewRes {
  id: number | null
  text: string | null
  score: number | null
  furnitureId: number | null
  user: {
    userName: string | null
    image: IImage | null
    id: string
  } | null
  attachedPictures: IImage[] | null
  usersFoundThisHelpful: number
  createdAt: Date
  updatedAt: Date
}

export interface IFurnitureItemRes {
  id: number
  imageId: number | null
  name: string | null
  type: string | null
  priceOld: string | null
  priceNew: string | null
  colors: string[] | null
  rating: string | null
  sale: boolean | null
  room: string | null
  material: string | null
  brand: string | null
  image: IImage | null
  description: string | null
  specs: string | null
  dimensions:
    | {
        id: number
        furnitureId: number
        width: number
        length: number
        height: number
      }[]
    | null
  reviews: IReviewRes[] | null
}

export type IGetFurnitureSuccessRes = {
  filtered: IFurnitureItemRes[]
  all: IFurnitureItemRes[]
}

export type IGetFurnitureRes = IGetFurnitureSuccessRes | Record<string, unknown> | undefined
