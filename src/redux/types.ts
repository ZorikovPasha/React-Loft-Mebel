
export const CONST = {
  FETCH_PRODUCTS: "FETCH_PRODUCTS",
  FETCH_SLIDES: "FETCH_SLIDES",
  FAVORITES: "FAVORITES",
}

export type SlidesType = {
  title: string,
  subtitle: string,
  imageUrl: string
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


export type ActionsTypes = fetchItemsActionType | fetchSlidesActionType | favoritesActionType;
