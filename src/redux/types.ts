
export const CONST = {
  FETCH_PRODUCTS: "FETCH_PRODUCTS",
  FETCH_SLIDES: "FETCH_SLIDES"
}

export type SlidesType = {
  title: string,
  subtitle: string,
  imageUrl: string
}

export type fetchItemsActionCreatorType = {
  type: typeof CONST.FETCH_PRODUCTS,
  payload: []
};

export type fetchSlidesActionCreatorType = {
  type: typeof CONST.FETCH_SLIDES,
  payload: SlidesType[]
};

export type ActionsTypes = fetchItemsActionCreatorType | fetchSlidesActionCreatorType;
