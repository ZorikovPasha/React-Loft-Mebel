import { IFurniture } from '../api/types'
import { IUserState } from './reducers/userReducer'
import { RootState } from './store'

export const getProducts = (state: RootState): IFurniture[] => state.items.items
export const getFilteredProductsByName =
  (query: string) =>
  (state: RootState): IFurniture[] => {
    return state.items.items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
  }

export const getUserData = (state: RootState): IUserState => state.user
export const getPathname = (state: RootState): string => state.pathname.pathname
