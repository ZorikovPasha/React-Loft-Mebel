export enum ActionsTypes {
  FETCH_PRODUCTS = "FETCH_PRODUCTS",
  FETCH_SLIDES = "FETCH_SLIDES",
  ADD_TO_FAVORITES = 'ADD_TO_FAVORITES',
  CART_ITEMS = "CART_ITEMS",
  QUINTITY = "QUINTITY",
  REMOVE_CART_ITEM = "REMOVE_CART_ITEM",
  CALC_TOTAL_COST = "CALC_TOTAL_COST",
  CURRENT_PRODUCT = "CURRENT_PRODUCT",
}

export type ProductType = {
  id: number;
  imageUrl: string;
  bigImageUrl: string;
  thumbsUrls: string[];
  name: string;
  type: {
    label: string,
    value: string
  },
  priceOld: number;
  priceNew: number;
  dimensions: { width: number, length: number, height: number };
  colors: string[];
  rating: number;
  sale: string;
  room: string,
  material: string,
  brand: string
}

export type SlideType = {
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
  price: number;
}

type ListItemType = {
  text: string;
  link: string;
};

export type ListsType = ListItemType[];

type mobMenuItemType = {
  imgLink: string;
  mobMenuItem: string;
  link: string;
};

export type BreadcrumbsLinkType = {
  name: string;
  href: string;
  isLink: boolean;
};

export type mobMenuType = {
  top: mobMenuItemType[];
  body: mobMenuItemType[];
};

export type submitValuesType = {
  brandsIds: string[], 
  colorsIds: string[], 
  material: string, 
  room: string, 
  type: string
}

export type fetchItemsActionType = {
  type: ActionsTypes.FETCH_PRODUCTS;
  payload: ProductType[];
};

export type fetchSlidesActionType = {
  type: ActionsTypes.FETCH_SLIDES;
  payload: SlideType[];
};

export type favoritesActionType = {
  type: ActionsTypes.ADD_TO_FAVORITES;
  payload: number;
};

export type cartItemsActionType = {
  type: ActionsTypes.CART_ITEMS | ActionsTypes.REMOVE_CART_ITEM;
  payload: CartItemType;
}

export type quintityActionType = {
  type: ActionsTypes.QUINTITY;
}

export type currentProductActionType = {
  type: ActionsTypes.CURRENT_PRODUCT;
  payload: number;
}

export interface IPageProps {
  isMobMenuOpen: boolean;
  setMobMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}