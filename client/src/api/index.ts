import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios'
import {
  FormDataType,
  ICancelOrderResponse,
  ICartItemRequest,
  IErrorResponse,
  IErrorsResponse,
  IFurnitureResponse,
  IRemoveCartItemDto,
  ISuccessfullLoginResponse,
  ISuccessfullMakeOrderResponse,
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
  put = <T, B>(url: string, data: B, config?: AxiosRequestConfig): Promise<T> => {
    return this._axios
      .put(url, data, config)
      .then(this.success)
      .catch((error: AxiosError<Error>) => {
        return error?.response?.data
      })
  }
  delete = <T, B>(url: string, data?: B): Promise<T> => {
    return this._axios
      .delete(url, { data: data })
      .then(this.success)
      .catch((error: AxiosError<Error>) => {
        throw error
      })
  }
}

class PublicApi extends Api {
  getFurniture = (signal: AbortSignal): Promise<IFurnitureResponse> => {
    return this.get(`/api/furniture/`, { signal })
  }

  createFurniture = (dto: FormData): Promise<ISuccessfullResponse | IErrorsResponse | IErrorResponse> => {
    return this.post('/api/furniture/', dto, { headers: { 'Content-Type': 'multipart/form-data' } })
  }
}

class UserApi extends Api {
  constructor(config: AxiosRequestConfig) {
    super(config)
    this._axios.interceptors.request.use(
      (config) => ({
        ...config,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('loft_furniture_token')}`
        }
      }),
      (error) => console.log(error)
    )
  }

  register = (credentials: SignUpCredsType): Promise<ISuccessfullResponse | IErrorsResponse | IErrorResponse> => {
    return this.post('/user/register', credentials)
  }

  login = (credentials: LoginCredsType): Promise<IErrorResponse | IErrorsResponse | ISuccessfullLoginResponse> => {
    return this.post('/user/login', credentials)
  }

  getUserData = (): Promise<ISuccessfullLoginResponse | IErrorResponse> => {
    return this.get('/user')
  }

  addFavoriteItem = (id: number): Promise<ISuccessfullResponse | IErrorResponse> => {
    return this.post('/user/favorites', { id })
  }

  deleteFavoriteItem = (id: number): Promise<ISuccessfullResponse | IErrorResponse> => {
    return this.delete('/user/favorites', { id })
  }

  addItemToCart = (dto: ICartItemRequest): Promise<ISuccessfullResponse | IErrorResponse> => {
    return this.post('/user/cart', dto)
  }

  removeCartItem = (dto: IRemoveCartItemDto): Promise<ISuccessfullResponse | IErrorResponse> => {
    return this.delete('/user/cart', dto)
  }

  updateUserData = (formData: FormData): Promise<ISuccessfullResponse | IErrorsResponse | IErrorResponse> => {
    return this.put('/user', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  }

  makeOrder = (): Promise<ISuccessfullMakeOrderResponse | IErrorResponse> => {
    return this.post('/user/orders')
  }

  cancelOrder = (orderId: number): Promise<ICancelOrderResponse | IErrorResponse> => {
    return this.put('/user/orders', { orderId })
  }

  sendMessage = (formData: FormDataType): Promise<ISuccessfullResponse | IErrorsResponse | IErrorResponse> => {
    return this.post('/user/request', formData)
  }

  sendReview = (formData: FormData) => {
    return this.post('/user/reviews', formData)
  }
}

export const UserApiClient = new UserApi(apiConfig)
export const PublicApiClient = new PublicApi(apiConfig)
