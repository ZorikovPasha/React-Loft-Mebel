import { ProductType, SlideType, mobMenuType } from "../types";

const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://distracted-clarke-2debdf.netlify.app';

const http = async <T>(request: string): Promise<T[]> => {
  const response = await fetch(URL + request);
  return await response.json();
};

export const getFurnitureItems = () => {
  try {
    return http<ProductType>('/api/furniture');
  } catch(err) {
    console.log(err);
  }
};

export const getSlidesItems = () => {
  try {
    return http<SlideType>('/api/slides');
  } catch(err) {
    console.log(err);
  }
};

export const getMobMenuItems = () => {
  try {
    return http<mobMenuType>('/api/mobMenu');
  } catch(err) {
    console.log(err);
  }
};
