import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { authActionCreator } from '../redux/actions/authAction'
import { addtemsActionCreator, fetchingActionCreator, ordersActionCreator } from '../redux/actions/cartItems'
import {
  addFavoritesActionCreator,
  loadingActionCreator,
  resetFavoritesActionCreator
} from '../redux/actions/favorites'
import { resetCartActionCreator } from '../redux/actions/cartItems'
// import { addUserDataActionCreator } from '../redux/actions/userAction'
import { getIsAuth } from '../redux/getters'
import { UserApiClient } from '../api/'
import { CartItemType, OrderInfoType } from '../types'

export const useAuth = async (): Promise<void> => {
  const dispatch = useDispatch()
  const isAuth = useSelector(getIsAuth)

  React.useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }

      UserApiClient.getUserData().then(() => {
        dispatch(authActionCreator(true))
      })
    }

    checkAuth()
  }, [])

  React.useEffect(() => {
    if (!isAuth) {
      return
    }

    const getData = async (): Promise<void> => {
      dispatch(resetFavoritesActionCreator())
      UserApiClient.getFavorites().then((favoriteItems) => {
        dispatch(addFavoritesActionCreator(favoriteItems.favorites.map((id) => Number(id))))
        dispatch(loadingActionCreator(true))
      })

      dispatch(resetCartActionCreator())
      UserApiClient.getCartItems<{ items: CartItemType[] }>().then((items) => {
        dispatch(addtemsActionCreator(items.items))
        dispatch(fetchingActionCreator(true))
      })

      // UserApiClient.getUserData().then((userData) => {
      // dispatch(addUserDataActionCreator(userData))
      // })

      UserApiClient.getOrders<{ orders: OrderInfoType[] }>().then((orders) => {
        dispatch(ordersActionCreator(orders.orders))
      })
    }
    getData()
  }, [isAuth])
}
