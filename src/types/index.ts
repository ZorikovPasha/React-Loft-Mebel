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
  colors: string[];
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
export interface IHeaderProps {
  isMobMenuOpen: boolean;
  setMobMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}