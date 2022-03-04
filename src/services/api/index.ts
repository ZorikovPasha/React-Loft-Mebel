import { ProductType, SlideType, mobMenuType, CartItemType,
   userFormValuesType, OrderInfoType } from "../../types";

const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://distracted-clarke-2debdf.netlify.app';



export class HttpClient {
  static async http<T>(request: string): Promise<T[]> {
    const response = await fetch(URL + request);
    return await response.json();
  };

  static async getFurnitureItems (queryParams: string) {
    try {
      return HttpClient.http<ProductType>('/api/furniture' + queryParams);
    } catch(err) {
      console.log(err);
    }
  };

  
  static async getOneFurniture (id: string) {
    try {
      const response = await fetch(URL + '/api/furniture', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ id })
      });
      return await response.json();
    } catch(err) {
      console.log(err);
    }
  };

  static async getSlidesItems() {
    try {
      return HttpClient.http<SlideType>('/api/slides');
    } catch(err) {
      console.log(err);
    }
  };

  static async getMobMenuItems() {
    try {
      return HttpClient.http<mobMenuType>('/api/mobMenu');
    } catch(err) {
      console.log(err);
    }
  };

  static async register (
    userName: string, 
    email: string, 
    password: string): Promise<{ message: string, status?: number }> {
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

  static async login (
    email: string, 
    password: string
    ): Promise<{ message: string, token?: string }> {
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

  static async sendFavoriteItem (id: number) {
    try {
      await fetch(URL + '/private/favorite', {
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
    }
  };

  static async getFAvorites() {
    try {
      const response = await fetch(URL + '/private/favorites', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
      })
      return response.json();
    } catch (e) {
      console.log(e);
    }
  };

  static async addItemToCart (cartItem: CartItemType) {
    try {
      const response = await fetch(URL + '/private/cartItem', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        method: 'POST',
        body: JSON.stringify(cartItem)
      })
      return response.json();
    } catch (e) {
      console.log(e);
    }
  }

  static async getCartItems () {
    try {
      const response = await fetch(URL + '/private/cartItems', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
      })
      return response.json();
    } catch (e) {
      console.log(e);
    }
  }

  static async checkAuth (token: string): Promise<{ message: string }> {
    try {
      const response = await fetch(URL + '/private/check', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
      })
  
      return response.json();
    } catch (e) {
      console.log(e);
      return { message: 'An error uccured during auth check...' }
    }
  };

  static async sendUserData(formValues: userFormValuesType) {
    try {
      const response = await fetch(URL + '/private/user', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        method: "POST",
        body: JSON.stringify(formValues)
      })
  
      return response.json();
    } catch (e) {
      console.log(e);
      return { message: 'An error uccured during auth check...' }
    }
  }

  static async getUserData() {
    try {
      const response = await fetch(URL + '/private/user', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  static async removeCartItem(id: number) {
    try {
      const response = await fetch(URL + '/private/removeCartItem', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        method: "POST",
        body: JSON.stringify({ id })
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  static async makeOrder(orderInfo: OrderInfoType[]) {
    try {
      const response = await fetch(URL + '/private/order', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        method: "POST",
        body: JSON.stringify({items: orderInfo})
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  static async getOrders() {
    try {
      const response = await fetch(URL + '/private/orders', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }
}
