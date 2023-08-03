export type CartItemDto = {
  id: number
  colors?: string[]
  quintity?: number
  dimensions?: {
    width: number
    length: number
    height: number
  }
  price?: string
}
