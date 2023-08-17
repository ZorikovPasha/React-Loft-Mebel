import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { resetCartActionCreator } from '../redux/actions/cartItems'
import { UserApiClient } from '../api/'
import { loginUserActionCreator, logoutUserActionCreator } from '../redux/actions/userAction'
import { getUserData } from '../redux/getters'
import { isSuccessfullLoginResponse } from '../api/types'

export const useAuth = async (): Promise<void> => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(getUserData)

  React.useEffect(() => {
    const token = localStorage.getItem('loft_furniture_token')
    if (!token) {
      return
    }

    console.log('further')

    UserApiClient.getUserData().then((data) => {
      if (!isSuccessfullLoginResponse(data)) {
        return
      }
      console.log('2')

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
          favorites: data.user.favorites ?? [],
          orders: data.user.orders ?? [],
          cart: data.user.cart ?? []
        })
      )
    })
  }, [])

  React.useEffect(() => {
    if (isLoggedIn) {
      return
    }
    dispatch(logoutUserActionCreator())
    dispatch(resetCartActionCreator())
  }, [isLoggedIn])
}
