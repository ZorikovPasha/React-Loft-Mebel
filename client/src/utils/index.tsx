import React from 'react'
import { IUserResponse } from '../api/types'

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

export const getTextInputErrorMessage = (val: string) => {
  return val.trim().length === 0 ? 'Required field' : ''
}

export const getEmailInputErrorMessage = (str: string) => {
  return str.trim().length === 0 ? 'Please enter your email' : validateEmail(str) ? '' : 'Email is incorrect'
}

export const getQueryParams = (paramName: string) => {
  if (typeof window !== `undefined`) {
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
          {positions.length > 1 && positions[idx + 1] && originalStr.slice(end, positions[idx + 1].start)}
        </React.Fragment>
      ))}
      {originalStr.slice(lastFoundEntryPositions.end, originalStr.length)}
    </>
  ) : (
    <>{originalStr}</>
  )
}

export const sanitizeUserRes = (userData: IUserResponse['user']) => {
  const processedOrders =
    userData.orders?.map((o) => ({
      id: o.id,
      userId: o.userId,
      name: o.name,
      status: o.status,
      createdAt: o.createdAt,
      updatedAt: o.updatedAt,
      items: o.items ?? []
    })) ?? []

  return {
    id: userData.id,
    isLoggedIn: true,
    name: userData.name ?? '',
    email: userData.email ?? '',
    surname: userData.surname ?? '',
    phone: userData.phone ?? '',
    city: userData.city ?? '',
    street: userData.street ?? '',
    house: userData.house ?? '',
    apartment: userData.apartment ?? '',
    image: userData.image
      ? {
          name: userData.image.name,
          url: import.meta.env.VITE_BACKEND + userData.image.url
        }
      : null,
    emailConfirmed: userData.emailConfirmed,
    decidedOnWantsToReceiveEmailUpdates: userData.decidedOnWantsToReceiveEmailUpdates,
    wantsToReceiveEmailUpdates: userData.wantsToReceiveEmailUpdates,
    createdAt: userData.createdAt,
    updatedAt: userData.updatedAt,
    favorites: userData.favorites ?? [],
    orders: processedOrders,
    cart: userData.cart ?? []
  }
}

export const splitPriceWithSpaces = (total: number) => {
  let totalToRender = ''
  let charsCount = total.toString().length

  while (charsCount > 3) {
    totalToRender = totalToRender + total.toString().slice(0, 2) + ' ' + total.toString().slice(charsCount - 3)
    charsCount = charsCount - 3
  }

  return totalToRender
}
