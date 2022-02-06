import { ProductType, SlideItemsType, mobMenuType } from "../types";

const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://distracted-clarke-2debdf.netlify.app';

const http = async (request: string) => {
  try {
    const response = await fetch(URL + request);
    const body = await response.json();
    return body;
  } catch (err) {
    console.log(err);
  }
};

export const getFurnitureItems = (): Promise<ProductType[]> => {
  return http('/api/furniture');
};

export const getSlidesItems = (): Promise<SlideItemsType> => {
  return http('/api/slides');
};

export const getMobMenuItems = (): Promise<mobMenuType[]> => {
  return http('/api/mobMenu');
};
