
export const CONST = {
  FETCH_PRODUCTS: "FETCH_PRODUCTS",
  FETCH_SLIDES: "FETCH_SLIDES",
  FAVORITES: "FAVORITES",
  CART_ITEMS: "CART_ITEMS",
  QUINTITY: "QUINTITY",
  REMOVE_CART_ITEM: "REMOVE_CART_ITEM",
  CALC_TOTAL_COST: "CALC_TOTAL_COST",
  CURRENT_PRODUCT: "CURRENT_PRODUCT"
}

export type ProductType = {
  id: number,
  imageUrl: string,
  bigImageUrl: string,
  thumbsUrls: string[],
  name: string,
  type: string,
  priceOld: string,
  priceNew: string,
  dimensions: { width: number, length: number, height: number },
  colors: string[],
  rating: number,
  sale: string
}

export type SlidesType = {
  title: string,
  subtitle: string,
  imageUrl: string
}

export type CartItemType = {
  id: number,
  colors: number[],
  quintity: number,
  dimensions: {
    width: number,
    length: number,
    height: number
  },
  price: string
}

export type fetchItemsActionType = {
  type: typeof CONST.FETCH_PRODUCTS,
  payload: []
};

export type fetchSlidesActionType = {
  type: typeof CONST.FETCH_SLIDES,
  payload: SlidesType[]
};

export type favoritesActionType = {
  type: typeof CONST.FAVORITES,
  payload: number
};

export type cartItemsActionType = {
  type: typeof CONST.CART_ITEMS,
  payload: CartItemType
}

export type quintityActionType = {
  type: typeof CONST.QUINTITY,
}

export type removeItemActionType = {
  type: typeof CONST.REMOVE_CART_ITEM,
  payload: number
}

export type currentProductActionType = {
  type: typeof CONST.CURRENT_PRODUCT,
  payload: number
}

export type ActionsTypes = fetchItemsActionType | fetchSlidesActionType | favoritesActionType | cartItemsActionType;
