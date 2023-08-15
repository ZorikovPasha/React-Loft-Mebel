import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios'
import { CartItemType, userFormValuesType } from '../types'
import {
  FormDataType,
  ICartItemsResponse,
  IErrorResponse,
  IErrorsResponse,
  IFurniture,
  IFurnitureResponse,
  IGetUserDataResponse,
  ILoginResponse,
  IResponseWithMessage,
  ISuccessfullResponse,
  LoginCredsType,
  SignUpCredsType
} from './types'

const apiConfig = {
  returnRejectedPromiseOnError: true,
  baseURL: import.meta.env.VITE_BACKEND,
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

class Axios {
  protected _axios: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    this._axios = axios.create(config)
  }
}

class Api extends Axios {
  constructor(config: AxiosRequestConfig) {
    super(config)
  }

  success = <T>(response: AxiosResponse<T>): T => {
    return response.data
  }

  error = <T>(error: AxiosError<T>): void => {
    throw error
  }

  get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return this._axios
      .get(url, config)
      .then(this.success)
      .catch((error: AxiosError<Error>) => {
        throw error
      })
  }
  post = <T, B>(url: string, data?: B, config?: AxiosRequestConfig): Promise<T> => {
    return this._axios
      .post(url, data, config)
      .then(this.success)
      .catch((error: AxiosError<Error>) => {
        return error?.response?.data
      })
  }
  put = <T, B>(url: string, data?: B): Promise<T> => {
    return this._axios
      .put(url, data)
      .then(this.success)
      .catch((error: AxiosError<Error>) => {
        return error?.response?.data
      })
  }
}

class UserApi extends Api {
  constructor(config: AxiosRequestConfig) {
    super(config)
    this._axios.interceptors.request.use(
      (config) => ({
        ...config,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }),
      (error) => console.log(error)
    )
  }
  setToken = (token: string): void => {
    localStorage.setItem('token', token)
  }

  register = (credentials: SignUpCredsType): Promise<IResponseWithMessage> => {
    return this.post('/user/register', credentials)
  }

  login = (credentials: LoginCredsType): Promise<ILoginResponse> => {
    return this.post('/user/login', credentials)
  }

  getFavorites = (): Promise<{ favorites: string[] }> => {
    return this.get('/private/favorites')
  }

  getCartItems = (): Promise<ICartItemsResponse> => {
    return this.get('/api/cart')
  }

  getUserData = (): Promise<IGetUserDataResponse> => {
    return this.get('/user')
  }

  getOrders = <T>(): Promise<T> => {
    return this.get('/api/orders')
  }

  getFurniture = (signal: AbortSignal): Promise<IFurnitureResponse> => {
    return this.get(`/api/furniture/`, { signal })
  }

  getOneFurniture = (id: string, signal: AbortSignal): Promise<IFurniture> => {
    return this.get(`/api/furniture/${id}`, { signal })
  }

  createFurniture = (dto: FormData): Promise<ISuccessfullResponse | IErrorsResponse | IErrorResponse> => {
    return this.post('/api/furniture/', dto, { headers: { 'Content-Type': 'multipart/form-data' } })
  }

  sendFavoriteItem = (id: number): Promise<unknown> => {
    return this.post('/private/favorite', { id })
  }

  addItemToCart = (cartItem: CartItemType): Promise<unknown> => {
    return this.post('/api/cart', cartItem)
  }

  removeCartItem = (id: number): Promise<unknown> => {
    return this.post('/private/removeCartItem', { id })
  }

  sendUserData = (userFormValues: userFormValuesType): Promise<IResponseWithMessage> => {
    return this.put('/user', userFormValues)
  }

  makeOrder = (): Promise<unknown> => {
    return this.post('/api/orders')
  }

  sendMessage = (formData: FormDataType): Promise<unknown> => {
    return this.post('/private/message', formData)
  }
}

export const UserApiClient = new UserApi(apiConfig)
