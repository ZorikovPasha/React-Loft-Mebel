import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios'
import {
  FormDataType,
  I500Response,
  ICartItemRequest,
  IErrorResponse,
  IErrorsResponse,
  IFurnitureResponse,
  ILoginUser400,
  ISuccessfullAccessTokenRegenResponse,
  IRegisterUser400,
  IRemoveCartItemDto,
  ISuccessfullLoginResponse,
  ISuccessfullMakeOrderResponse,
  ISuccessfullResponse,
  LoginCredsType,
  SignUpCredsType,
  isSuccessfullNewAccessTokenResponse,
  IOrdersResponse
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

const userApiConfig = {
  returnRejectedPromiseOnError: true,
  baseURL: import.meta.env.VITE_BACKEND,
  withCredentials: true,
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
    return response?.data
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
  getFurniture = (query: string, signal: AbortSignal): Promise<IFurnitureResponse> => {
    return this.get(`/api/furniture/${query}`, { signal })
  }

  createFurniture = (dto: FormData): Promise<ISuccessfullResponse | IErrorsResponse | IErrorResponse> => {
    return this.post('/api/furniture/', dto, { headers: { 'Content-Type': 'multipart/form-data' } })
  }
}

class UserApi extends Api {
  #accessToken: string = ''
  #requestInterceptor: number

  constructor(config: AxiosRequestConfig) {
    super(config)
    this.#requestInterceptor = this._axios.interceptors.request.use(
      (config) => ({
        ...config,
        headers: {
          Authorization: `Bearer ${this.#accessToken}`
        }
      }),
      (error) => Promise.reject(error)
    )

    this._axios.interceptors.response.use(
      (response) => {
        return response
      },
      async (error: AxiosError<Error>) => {
        const status = error?.response?.status
        const prevRequest = error.config
        console.log('prevRequest', prevRequest)
        if (status === 401 && !prevRequest.url?.includes('auth/refresh')) {
          const response = await this.getNewAccessToken()
          if (prevRequest.headers && isSuccessfullNewAccessTokenResponse(response)) {
            this.applyNewTokenAndReloadRequestInterceptor(response.token as string)
            if (prevRequest.method === 'get') {
              return this._axios.get(prevRequest.url as string, prevRequest.headers)
            } else if (prevRequest.method === 'post') {
              return this._axios.post(prevRequest.url as string, JSON.parse(prevRequest.data), prevRequest.headers)
            } else if (prevRequest.method === 'put') {
              return this._axios.put(prevRequest.url as string, JSON.parse(prevRequest.data), prevRequest.headers)
            } else if (prevRequest.method === 'delete') {
              return this._axios.delete(prevRequest.url as string, JSON.parse(prevRequest.data))
            } else {
              return Promise.reject(error)
            }
          }
        }
      }
    )
  }

  applyNewTokenAndReloadRequestInterceptor = (accessToken: string) => {
    this.#accessToken = accessToken
    this._axios.interceptors.request.eject(this.#requestInterceptor)
    this.#requestInterceptor = this._axios.interceptors.request.use((config) => ({
      ...config,
      headers: {
        Authorization: `Bearer ${this.#accessToken}`
      }
    }))
  }

  register = (credentials: SignUpCredsType): Promise<ISuccessfullResponse | IRegisterUser400 | I500Response> => {
    return this.post('/auth/register', credentials)
  }

  login = (credentials: LoginCredsType): Promise<ISuccessfullLoginResponse | ILoginUser400 | I500Response> => {
    return this.post('/auth/login', credentials)
  }

  getNewAccessToken = () => {
    return this.get<ISuccessfullAccessTokenRegenResponse | Record<string, unknown>>('/auth/refresh')
  }

  logout = async () => {
    await this.get<ISuccessfullResponse>('/auth/logout')
    this.applyNewTokenAndReloadRequestInterceptor('')
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

  getOrders = (): Promise<IOrdersResponse | IErrorResponse> => {
    return this.get('/user/orders')
  }

  makeOrder = (): Promise<ISuccessfullMakeOrderResponse | IErrorResponse> => {
    return this.post('/user/orders')
  }

  cancelOrder = (orderId: number): Promise<IErrorsResponse | IErrorResponse | ISuccessfullResponse> => {
    return this.put('/user/orders', { orderId })
  }

  sendMessage = (formData: FormDataType): Promise<ISuccessfullResponse | IErrorsResponse | IErrorResponse> => {
    return this.post('/user/request', formData)
  }

  sendReview = (formData: FormData): Promise<ISuccessfullResponse | IRegisterUser400 | I500Response> => {
    return this.post('/user/reviews', formData)
  }
}

export const UserApiClient = new UserApi(userApiConfig)
export const PublicApiClient = new PublicApi(apiConfig)
