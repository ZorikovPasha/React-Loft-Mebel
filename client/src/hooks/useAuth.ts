import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { authActionCreator } from '../redux/actions/authAction'
import { addtemsActionCreator, fetchingActionCreator, ordersActionCreator } from '../redux/actions/cartItems'
import { addFavoritesActionCreator, loadingActionCreator, resetFavoritesActionCreator } from '../redux/actions/favorites'
import { resetCartActionCreator } from '../redux/actions/cartItems'
import { addUserDataActionCreator } from '../redux/actions/userAction'
import { getIsAuth } from '../redux/getters'
import { UserApiClient } from '../api/'
import { CartItemType, OrderInfoType, userFormValuesType } from '../types'

export const useAuth = async () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(getIsAuth)

  React.useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (!token) return

      const { message } = await UserApiClient.checkAuth()
      if (message === 'Token is valid') {
        dispatch(authActionCreator(true))
      }
    }

    checkAuth()
  }, [])

  React.useEffect(() => {
    if (!isAuth) return
    const getData = async () => {
      dispatch(resetFavoritesActionCreator())
      let favoritesData: { favorites: string[] | number[] } = await UserApiClient.getFavorites()
      favoritesData.favorites = favoritesData.favorites.map((id) => Number(id))
      dispatch(addFavoritesActionCreator(favoritesData.favorites))
      dispatch(loadingActionCreator(true))

      dispatch(resetCartActionCreator())
      const cartItems = await UserApiClient.getCartItems<{ items: CartItemType[] }>()
      dispatch(addtemsActionCreator(cartItems.items))
      dispatch(fetchingActionCreator(true))

      const userData = await UserApiClient.getUserData<userFormValuesType>()
      dispatch(addUserDataActionCreator(userData))

      const orders = await UserApiClient.getOrders<{ orders: OrderInfoType[] }>()
      dispatch(ordersActionCreator(orders.orders))
    }
    getData()
  }, [isAuth])
}
