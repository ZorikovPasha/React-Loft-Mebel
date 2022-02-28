import { ProductType, SlideType, mobMenuType } from "../../types";

const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://distracted-clarke-2debdf.netlify.app';

const http = async <T>(request: string): Promise<T[]> => {
  const response = await fetch(URL + request);
  return await response.json();
};

export const getFurnitureItems = (queryParams: string) => {
  try {
    return http<ProductType>('/api/furniture' + queryParams);
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

export const register = async (
  userName: string, 
  email: string, 
  password: string): Promise<{ message: string, status?: number }> => {
  try {
    const response = await fetch(URL + '/auth/register', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ userName, email, password })
    })

    return response.json()
  } catch (e) {
    console.log(e);
    return { message: 'An error uccured...' }
  }
};

export const login = async (
  email: string, 
  password: string
  ): Promise<{ message: string, token?: string }> => {
  try {
    const response = await fetch(URL + '/auth/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ email, password })
    })

    return response.json()
  } catch (e) {
    console.log(e);
    return { message: 'An error uccured...' }
  }
};

export const sendFavoriteItem = async (id: number) => {
  try {
    const response = await fetch(URL + '/private/favorite', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      method: 'POST',
      body: JSON.stringify({ id })
    })
  } catch (e) {
    console.log(e);
    return { message: 'An error uccured...' }
  }
};
