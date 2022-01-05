export enum ActionsTypes {
  FETCH_PRODUCTS = "FETCH_PRODUCTS",
  FETCH_SLIDES = "FETCH_SLIDES",
  FAVORITES = "FAVORITES",
  CART_ITEMS = "CART_ITEMS",
  QUINTITY = "QUINTITY",
  REMOVE_CART_ITEM = "REMOVE_CART_ITEM",
  CALC_TOTAL_COST = "CALC_TOTAL_COST",
  CURRENT_PRODUCT = "CURRENT_PRODUCT"
}

export type ProductType = {
  id: number;
  imageUrl: string;
  bigImageUrl: string;
  thumbsUrls: string[];
  name: string;
  type: string;
  priceOld: string;
  priceNew: string;
  dimensions: { width: number, length: number, height: number };
  colors: string[];
  rating: number;
  sale: string;
}

export type SlidesType = {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export type CartItemType = {
  id: number;
  colors: number[];
  quintity: number;
  dimensions: {
    width: number;
    length: number;
    height: number;
  };
  price: string;
}

export type ListsType = Array<string[]>;

type mobMenuItemType = {
  imgLink: string;
  mobMenuItem: string;
};

export type mobMenuType = {
  top: Array<mobMenuItemType>;
  body: Array<mobMenuItemType>;
};

export type fetchItemsActionType = {
  type: ActionsTypes.FETCH_PRODUCTS;
  payload: ProductType[];
};

export type fetchSlidesActionType = {
  type: ActionsTypes.FETCH_SLIDES;
  payload: SlidesType[];
};

export type favoritesActionType = {
  type: ActionsTypes.FAVORITES;
  payload: number;
};

export type cartItemsActionType = {
  type: ActionsTypes.CART_ITEMS;
  payload: CartItemType;
}

export type quintityActionType = {
  type: ActionsTypes.QUINTITY;
}

export type removeItemActionType = {
  type: ActionsTypes.REMOVE_CART_ITEM;
  payload: number;
}

export type currentProductActionType = {
  type: ActionsTypes.CURRENT_PRODUCT;
  payload: number;
}
