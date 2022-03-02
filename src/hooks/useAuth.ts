import React from "react";
import { useDispatch } from "react-redux";

import { authActionCreator } from "../redux/actions/authAction";
import { cartItemsActionCreator } from "../redux/actions/cartItems";
import { addMultipleFavoritesActionCreator } from '../redux/actions/favorites';
import { resetCartActionCreator } from "../redux/actions/removeItem";
import { addUserDataActionCreator } from "../redux/actions/userAction";
import { HttpClient } from "../services/api/";
import { CartItemType } from "../types";

export const useAuth = async () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getDavorites = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const { message } = await HttpClient.checkAuth(token);
    
        if (message === "Token is valid") {
          dispatch(authActionCreator(true));
          const favoritesData: { favorites: string[] } = await HttpClient.getFAvorites();
          dispatch(addMultipleFavoritesActionCreator(favoritesData.favorites?.map(id => Number(id))));

          dispatch(resetCartActionCreator());

          const cartItems = await HttpClient.getCartItems();
          cartItems.items.forEach((item: CartItemType) => {
            dispatch(cartItemsActionCreator(item));
          });

          const userData = await HttpClient.getUserData();
          dispatch(addUserDataActionCreator(userData));
        }
      }
    };

    getDavorites();
  }, [])
  
};