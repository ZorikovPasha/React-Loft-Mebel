import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios'
import { LoginCredsType, isSuccessfullNewAccessTokenResponse } from './types'
import {
  IAddCartItemRes,
  IAddFavoriteItemRes,
  IAddOrderRes,
  ICancelOrderRes,
  IDeleteFavouriteItemRes,
  IGetOrdersRes,
  IMakeRequestRes,
  IMakeReviewRes,
  IRemoveCartItemRes,
  IUpdateUserRes
} from '../../../server/src/user/types'
import { ICreateFurniture, IGetFurnitureRes } from '../../../server/src/furniture/types'
import { IAccessTokenRegenRes, ILoginRes, ILogoutRes, IRegisterRes } from '../../../server/src/auth/types'
import {
  CreateUserDto,
  AddFavoriteFurnitureDto,
  AddCartItemDto,
  RemoveCartItemDto,
  EditOrderDto,
  UserRequestDto
} from '../../../server/src/user/dto/create-user.dto'

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
  getFurniture = (query: string, signal: AbortSignal): Promise<IGetFurnitureRes> => {
    return this.get(`/api/furniture/${query}`, { signal })
  }

  createFurniture = (dto: FormData): Promise<ICreateFurniture> => {
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
          if (prevRequest.headers && response && isSuccessfullNewAccessTokenResponse(response)) {
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

  register = (credentials: CreateUserDto): Promise<IRegisterRes> => {
    return this.post('/auth/register', credentials)
  }

  login = (credentials: LoginCredsType): Promise<ILoginRes> => {
    return this.post('/auth/login', credentials)
  }

  getNewAccessToken = () => {
    return this.get<IAccessTokenRegenRes>('/auth/refresh')
  }

  logout = async () => {
    await this.get<ILogoutRes>('/auth/logout')
    this.applyNewTokenAndReloadRequestInterceptor('')
  }

  updateUserData = (formData: FormData): Promise<IUpdateUserRes> => {
    return this.put('/user', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  }

  addFavoriteItem = (id: number) => {
    return this.post<IAddFavoriteItemRes, AddFavoriteFurnitureDto>('/user/favorites', { id })
  }

  deleteFavoriteItem = (id: number) => {
    return this.delete<IDeleteFavouriteItemRes, AddFavoriteFurnitureDto>('/user/favorites', { id })
  }

  addItemToCart = (dto: AddCartItemDto): Promise<IAddCartItemRes> => {
    return this.post('/user/cart', dto)
  }

  removeCartItem = (dto: RemoveCartItemDto): Promise<IRemoveCartItemRes> => {
    return this.delete('/user/cart', dto)
  }

  getOrders = (): Promise<IGetOrdersRes> => {
    return this.get('/user/orders')
  }

  makeOrder = (): Promise<IAddOrderRes> => {
    return this.post('/user/orders')
  }

  cancelOrder = (orderId: number): Promise<ICancelOrderRes> => {
    return this.put<ICancelOrderRes, EditOrderDto>('/user/orders', { orderId })
  }

  sendMessage = (formData: UserRequestDto) => {
    return this.post<IMakeRequestRes, UserRequestDto>('/user/request', formData)
  }

  sendReview = (formData: FormData): Promise<IMakeReviewRes> => {
    return this.post('/user/reviews', formData)
  }
}

export const UserApiClient = new UserApi(userApiConfig)
export const PublicApiClient = new PublicApi(apiConfig)
