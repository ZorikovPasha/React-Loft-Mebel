import React from 'react'
import { IOrder } from '../redux/reducers/userReducer'
import { IFurnitureItemRes, IImage, IReviewRes } from '../../../server/src/furniture/types'
import { ILoginSuccessfullRes } from '../../../server/src/auth/types'

export const validateEmail = (email: string): boolean => {
  return email.trim().length > 4 && email.includes('@') && email.includes('.')
}

export const validateTextInput = (str: string): boolean => {
  return str.trim().length > 0
}

export const validatePassword = (str: string): boolean => {
  return str.trim().length > 5 && str.trim() !== '1234'
}

export const getPasswordFieldErrorMessage = (str: string): string => {
  if (str.trim().length === 0) {
    return 'Please enter your paassword'
  }

  if (str.trim().length < 7) {
    return 'Password length should be more than 6 characters'
  }

  if (str.trim() !== '1234') {
    return 'Password is too simple'
  }

  return ''
}

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getTextInputErrorMessage = (val: string, name = 'Name') => {
  return val.trim().length === 0 ? 'Required field' : `Please enter your ${name}`
}

export const getEmailInputErrorMessage = (str: string) => {
  return str.trim().length === 0 ? 'Please enter your email' : validateEmail(str) ? '' : 'Email is incorrect'
}

export const getQueryParams = (paramName: string) => {
  if (typeof window !== 'undefined') {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    return params[paramName]
  }
}

export const formatStr = (str = '') => str.toLowerCase().split('-').join(' ')

type breakStringType = (originalStr: string, query: string) => React.ReactElement

type queryPositionsInText = {
  start: number
  end: number
}

export const breakString: breakStringType = (originalStr = '', query = '') => {
  const positions: queryPositionsInText[] = []
  const formattedText = formatStr(originalStr)
  const formattedQuery = formatStr(query)

  // прохожится по тексту и побуквенно и сравнивает с запросом, запоминая начало и конец в тексте
  for (let i = 0; i < formattedText.length; i++) {
    if (formattedQuery.split('').every((_, idx) => formattedText[i + idx] === formattedQuery[idx])) {
      positions.push({
        start: i,
        end: i + formattedQuery.length
      })
    }
  }

  const firstFoundEntryPositions = positions[0]
  const lastFoundEntryPositions = positions[positions.length - 1]
  return firstFoundEntryPositions && lastFoundEntryPositions && formattedQuery !== '' ? (
    <>
      {originalStr.slice(0, firstFoundEntryPositions.start)}
      {positions.map(({ start, end }, idx) => (
        <React.Fragment key={start}>
          <span className='highlight'>{originalStr.slice(start, end)}</span>
          {positions.length > 1 && positions[idx + 1] && originalStr.slice(end, positions[idx + 1]?.start)}
        </React.Fragment>
      ))}
      {originalStr.slice(lastFoundEntryPositions.end, originalStr.length)}
    </>
  ) : (
    <>{originalStr}</>
  )
}

export const sanitizeUserRes = (userData: ILoginSuccessfullRes['user']) => {
  const processedOrders: IOrder[] = []
  if (userData.orders) {
    userData.orders.forEach((o) => {
      processedOrders.push({
        id: o.id,
        userId: o.userId,
        name: o.name,
        status:
          o.status === 'CREATED' || o.status === 'WORKING' || o.status === 'COMPLETED' || o.status === 'CANCELED'
            ? o.status
            : null,
        createdAt: o.createdAt,
        updatedAt: o.updatedAt,
        items: Array.isArray(o.items) ? o.items : []
      })
    })
  }

  return {
    id: userData.id,
    isLoggedIn: true,
    name: userData.name ?? '',
    email: userData.email ?? '',
    surname: userData.surname ?? '',
    userName: userData.userName ?? '',
    phone: userData.phone ?? '',
    city: userData.city ?? '',
    street: userData.street ?? '',
    house: userData.house ?? '',
    apartment: userData.apartment ?? '',
    image: userData.image
      ? {
          name: userData.image.name,
          url: process.env.NEXT_PUBLIC_BACKEND + userData.image.url
        }
      : null,
    emailConfirmed: userData.emailConfirmed,
    decidedOnWantsToReceiveEmailUpdates: userData.decidedOnWantsToReceiveEmailUpdates,
    wantsToReceiveEmailUpdates: userData.wantsToReceiveEmailUpdates,
    createdAt: userData.createdAt,
    updatedAt: userData.updatedAt,
    // reviews user found helpfull
    reviews: userData.reviews,
    favorites: userData.favorites ?? [],
    orders: processedOrders,
    cart: userData.cart ?? []
  }
}

export const splitPriceWithSpaces = (total: number) => {
  let totalToRender = ''
  let charsCount = total.toString().length

  if (charsCount < 4) {
    return total.toString()
  }

  while (charsCount > 3) {
    totalToRender = totalToRender + total.toString().slice(0, 1) + ' ' + total.toString().slice(charsCount - 3)
    charsCount = charsCount - 3
  }

  return totalToRender
}

export interface IProcessedFurniture {
  id: number
  imageId: number | null
  name: string | null
  type: string | null
  priceOld: string | null
  priceNew: string | null
  colors: string[]
  rating: string | null
  sale: boolean
  room: string | null
  material: string | null
  brand: string | null
  image: IImage | null
  description: string | null
  specs: string | null
  dimensions: {
    id: number
    furnitureId: number
    width: number
    length: number
    height: number
  }[]
  reviews: IProcessedReview[]
}

export interface IProcessedReview {
  id: number | null
  text: string | null
  score: number | null
  furnitureId: number | null
  user: {
    userName: string | null
    image: IImage | null
    id: string | null
  } | null
  attachedPictures: IImage[]
  usersFoundThisHelpful: number
  createdAt: Date
  updatedAt: Date
}

export const sanitizeFurnitureItem = (furniture: IFurnitureItemRes): IProcessedFurniture => {
  const sanitizeReviews = (review: IReviewRes): IProcessedReview => {
    const filteredAttachments: IImage[] = []
    review.attachedPictures?.forEach((picture) => {
      if (picture) {
        filteredAttachments.push(picture)
      }
    })
    return {
      id: typeof review.id === 'number' ? review.id : null,
      text: typeof review.text === 'string' ? review.text : null,
      score: typeof review.score === 'number' ? review.score : null,
      furnitureId: typeof review.furnitureId === 'number' ? review.furnitureId : null,
      user: review.user
        ? {
            userName: typeof review.user.userName === 'string' ? review.user.userName : null,
            image: review.user.image,
            id: typeof review.user.id === 'string' ? review.user.id : null
          }
        : null,
      attachedPictures: filteredAttachments,
      usersFoundThisHelpful: review.usersFoundThisHelpful,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt
    }
  }
  return {
    id: furniture.id,
    imageId: typeof furniture.imageId === 'number' ? furniture.imageId : null,
    name: typeof furniture.name === 'string' ? furniture.name : null,
    type: typeof furniture.type === 'string' ? furniture.type : null,
    priceOld: typeof furniture.priceOld === 'string' ? furniture.priceOld : null,
    priceNew: typeof furniture.priceNew === 'string' ? furniture.priceNew : null,
    colors: furniture.colors ?? [],
    rating: typeof furniture.rating === 'string' ? furniture.rating : null,
    sale: typeof furniture.sale === 'boolean' ? furniture.sale : false,
    room: typeof furniture.room === 'string' ? furniture.room : null,
    material: typeof furniture.material === 'string' ? furniture.material : null,
    brand: typeof furniture.brand === 'string' ? furniture.brand : null,
    image: furniture.image,
    description: typeof furniture.description === 'string' ? furniture.description : null,
    specs: typeof furniture.specs === 'string' ? furniture.specs : null,
    dimensions: furniture.dimensions ?? [],
    reviews: furniture.reviews ? furniture.reviews.map(sanitizeReviews) : []
  }
}

export const disableReactDevTools = () => {
  const hasWindowObject = typeof window !== 'undefined' && window.document
  if (!hasWindowObject) {
    return
  }

  const isObject = (obj: unknown) => {
    const type = typeof obj
    return type === 'function' || (type === 'object' && !!obj)
  }

  // Ensure the React Developer Tools global hook exists
  if (!isObject(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
    return
  }

  if (!window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    return
  }

  // Replace all global hook properties with a no-op function or a null value
  for (const prop in window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    if (prop === 'renderers') {
      // prevents console error when dev tools try to iterate of renderers
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = new Map()
      continue
    }
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] =
      typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] === 'function' ? Function.prototype : null
  }
}

interface IProps {
  src: string
  width: number
  quality?: number
}

export const backendImagesLoader = ({ src, width, quality }: IProps) => {
  return process.env.NEXT_PUBLIC_BACKEND + src + `?w=${width}&q=${quality || 80}`
}
