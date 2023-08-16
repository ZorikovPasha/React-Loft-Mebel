import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  // addtemsActionCreator,
  fetchingActionCreator,
  ordersActionCreator
} from '../redux/actions/cartItems'
import {
  addFavoritesActionCreator,
  loadingActionCreator,
  resetFavoritesActionCreator
} from '../redux/actions/favorites'
import { resetCartActionCreator } from '../redux/actions/cartItems'
// import { addUserDataActionCreator } from '../redux/actions/userAction'
import { UserApiClient } from '../api/'
import { OrderInfoType } from '../types'
import { loginUserActionCreator } from '../redux/actions/userAction'
import { getIsUserLoggedin } from '../redux/getters'

export const useAuth = async (): Promise<void> => {
  const dispatch = useDispatch()
  const isAuth = useSelector(getIsUserLoggedin)

  React.useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }

      UserApiClient.getUserData().then(() => {
        dispatch(loginUserActionCreator())
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
      UserApiClient.getFavorites().then((dto) => {
        dispatch(addFavoritesActionCreator(dto.items.map(({ furnitureId }) => furnitureId)))
        dispatch(loadingActionCreator(true))
      })

      dispatch(resetCartActionCreator())
      UserApiClient.getCartItems().then(() => {
        // dispatch(addtemsActionCreator(dto.items))
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
