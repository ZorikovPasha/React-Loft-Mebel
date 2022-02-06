import { ProductType, SlideItemsType, mobMenuType } from "../types";

const http = async (request: string) => {
  try {
    const response = await fetch('http://localhost:5000' + request);
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
