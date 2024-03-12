import { RootState } from './store'

export const getProducts = (state: RootState) => state.items.items
export const getFilteredProductsByName = (query: string) => (state: RootState) => {
  return state.items.items.filter((item) => item.name?.toLowerCase().includes(query.toLowerCase()))
}

export const getProductsBool = (state: RootState) => state.items.bool
export const getUserData = (state: RootState) => state.user
export const getPathname = (state: RootState) => state.pathname.pathname
export const getError = (state: RootState) => state.errors
export const getSearch = (state: RootState) => state.search
