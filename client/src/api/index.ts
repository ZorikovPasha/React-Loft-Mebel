import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios'
import { CartItemType, userFormValuesType, OrderInfoType } from '../types'

export const apiConfig = {
  returnRejectedPromiseOnError: true,
  baseURL: import.meta.env.VITE_BACKEND,
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

type SignUpCredsType = {
  userName: string
  email: string
  password: string
}

type LoginCredsType = Omit<SignUpCredsType, 'userName'>

export type formDataType = Omit<SignUpCredsType, 'password'> & { message: string }

export class Axios {
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
  post = <T, B>(url: string, data?: B): Promise<T> => {
    return this._axios
      .post(url, data)
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

  register = (credentials: SignUpCredsType): Promise<{ message: string; status: number }> => {
    return this.post('/auth/register', credentials)
  }

  login = (credentials: LoginCredsType): Promise<{ token?: string; message?: string }> => {
    return this.post('/auth/login', credentials)
  }

  checkAuth = (): Promise<{ token?: string; message?: string }> => {
    return this.get('/private/check')
  }

  getFavorites = (): Promise<{ favorites: string[] }> => {
    return this.get('/private/favorites')
  }

  getCartItems = <T>(): Promise<T> => {
    return this.get('/private/cartItems')
  }

  getUserData = <T>(): Promise<T> => {
    return this.get('/private/user')
  }

  getOrders = <T>(): Promise<T> => {
    return this.get('/private/orders')
  }

  getOneFurniture = <T>(id: string, signal: AbortSignal): Promise<T> => {
    return this.get(`/api/furniture/${id}`, { signal })
  }

  sendFavoriteItem = (id: number): Promise<unknown> => {
    return this.post('/private/favorite', { id })
  }

  addItemToCart = (cartItem: CartItemType): Promise<unknown> => {
    return this.post('/private/cartItem', cartItem)
  }

  removeCartItem = (id: number): Promise<unknown> => {
    return this.post('/private/removeCartItem', { id })
  }

  sendUserData = (userFormValues: userFormValuesType): Promise<unknown> => {
    return this.post('/private/user', userFormValues)
  }

  makeOrder = (orderInfo: OrderInfoType[]): Promise<unknown> => {
    return this.post('/private/order', { items: orderInfo })
  }

  sendMessage = (formData: formDataType): Promise<unknown> => {
    return this.post('/private/message', formData)
  }
}

export const ApiClient = new Api(apiConfig)
export const UserApiClient = new UserApi(apiConfig)
