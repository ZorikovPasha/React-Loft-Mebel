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

interface SignUpCredsType {
  userName: string
  email: string
  password: string
}

type LoginCredsType = Omit<SignUpCredsType, 'userName'>

interface IRegisterResponse {
  message: 'User has been registered'
}

interface ILoginResponse {
  token: string
  message?: string
}

interface IUpdateUserResponse {
  message: 'Data successfully was written'
}

interface IGetUserDataResponse {
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

  register = (credentials: SignUpCredsType): Promise<IRegisterResponse> => {
    return this.post('/user/register', credentials)
  }

  login = (credentials: LoginCredsType): Promise<ILoginResponse> => {
    return this.post('/user/login', credentials)
  }

  getFavorites = (): Promise<{ favorites: string[] }> => {
    return this.get('/private/favorites')
  }

  getCartItems = <T>(): Promise<T> => {
    return this.get('/private/cartItems')
  }

  getUserData = (): Promise<IGetUserDataResponse> => {
    return this.get('/user')
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

  sendUserData = (userFormValues: userFormValuesType): Promise<IUpdateUserResponse> => {
    return this.put('/user', userFormValues)
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