import { IFurniture } from '../api/types'
import { IErrorsState } from './reducers/errors'
import { IUserState } from './reducers/userReducer'
import { RootState } from './store'

export const getProducts = (state: RootState): IFurniture[] => state.items.items
export const getFilteredProductsByName =
  (query: string) =>
  (state: RootState): IFurniture[] => {
    return state.items.items.filter((item) => item.name?.toLowerCase().includes(query.toLowerCase()))
  }

export const getUserData = (state: RootState): IUserState => state.user
export const getPathname = (state: RootState): string => state.pathname.pathname
export const getError = (state: RootState): IErrorsState => state.errors
export const getSearch = (state: RootState) => state.search
