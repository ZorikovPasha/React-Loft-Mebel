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
import { isSuccessfullLoginResponse } from '../api/types'

export const useAuth = async (): Promise<void> => {
  const dispatch = useDispatch()
  const isAuth = useSelector(getIsUserLoggedin)

  React.useEffect(() => {
    const token = localStorage.getItem('loft_furniture_token')
    if (!token) {
      return
    }

    UserApiClient.getUserData().then((data) => {
      if (!isSuccessfullLoginResponse(data)) {
        return
      }

      dispatch(
        loginUserActionCreator({
          id: data.user.id,
          isLoggedIn: true,
          name: data.user.name,
          email: data.user.email,
          surname: data.user.surname,
          phone: data.user.phone,
          city: data.user.city,
          street: data.user.street,
          house: data.user.house,
          apartment: data.user.apartment,
          image: data.user.image,
          emailConfirmed: data.user.emailConfirmed,
          wantsToReceiveEmailUpdates: data.user.wantsToReceiveEmailUpdates,
          createdAt: data.user.createdAt,
          updatedAt: data.user.updatedAt,
          favorites: data.user.favorites,
          orders: data.user.orders,
          cart: data.user.cart
        })
      )
    })
  }, [])

  React.useEffect(() => {
    if (!isAuth) {
      return
    }

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

    UserApiClient.getOrders<{ orders: OrderInfoType[] }>().then((orders) => {
      dispatch(ordersActionCreator(orders.orders))
    })
  }, [isAuth])
}
