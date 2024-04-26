import { RootState } from './store'

export const getFilteredProductsByName = (query: string) => (state: RootState) => {
  return state.items.items.filter((item) => item.name?.toLowerCase().includes(query.toLowerCase()))
}

export const getProductById = (id: number) => (state: RootState) => {
  return state.items.items.find((item) => item.id === id)
}

export const getUserData = (state: RootState) => state.user
export const getError = (state: RootState) => state.errors
