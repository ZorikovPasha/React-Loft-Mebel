import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { authActionCreator } from "../redux/actions/authAction";
import { addtemsActionCreator, ordersActionCreator } from "../redux/actions/cartItems";
import { addMultipleFavoritesActionCreator } from '../redux/actions/favorites';
import { resetCartActionCreator } from "../redux/actions/removeItem";
import { addUserDataActionCreator } from "../redux/actions/userAction";
import { getIsAuth } from "../redux/getters";
import { HttpClient } from "../services/api/";

export const useAuth = async () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);

  React.useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      const { message } = await HttpClient.checkAuth(token);
      if (message === "Token is valid") {
        dispatch(authActionCreator(true));
      }
    };

    checkAuth();
  }, []);

  React.useEffect(() => {
    if (!isAuth) return;
    const getData = async () => {
      let favoritesData: { favorites: string[] | number[] } = await HttpClient.getFAvorites();
      favoritesData.favorites = favoritesData.favorites.map(id => Number(id))
      dispatch(addMultipleFavoritesActionCreator(favoritesData.favorites));

      dispatch(resetCartActionCreator());
      const cartItems = await HttpClient.getCartItems();

      dispatch(addtemsActionCreator(cartItems.items));

      const userData = await HttpClient.getUserData();
      dispatch(addUserDataActionCreator(userData));

      const orders = await HttpClient.getOrders();
      dispatch(ordersActionCreator(orders.orders));
    };
    getData();
  }, [isAuth])
  
};