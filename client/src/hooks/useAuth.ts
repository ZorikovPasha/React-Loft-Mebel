import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { UserApiClient } from '../api/'
import { loginUserActionCreator, logoutUserActionCreator } from '../redux/actions/userAction'
import { getUserData } from '../redux/getters'
import { isSuccessfullGetUserResponse } from '../api/types'

export const useAuth = async (): Promise<void> => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(getUserData)

  React.useEffect(() => {
    const token = localStorage.getItem('loft_furniture_token')
    if (!token) {
      return
    }

    UserApiClient.getUserData().then((data) => {
      if (!isSuccessfullGetUserResponse(data)) {
        return
      }

      const {
        id,
        name,
        email,
        surname,
        phone,
        city,
        street,
        house,
        apartment,
        orders,
        image,
        emailConfirmed,
        favorites,
        wantsToReceiveEmailUpdates,
        cart,
        updatedAt,
        createdAt
      } = data.user

      const processedOrders =
        orders?.map((o) => ({
          id: o.id,
          userId: o.userId,
          name: o.name,
          status: o.status,
          createdAt: o.createdAt,
          updatedAt: o.updatedAt,
          items: o.items ?? []
        })) ?? []
      const payload = {
        id: id,
        isLoggedIn: true,
        name: name,
        email: email,
        surname: surname,
        phone: phone,
        city: city,
        street: street,
        house: house,
        apartment: apartment,
        image: image
          ? {
              name: image.name,
              url: `http://localhost:5000${image.url}`
            }
          : null,
        emailConfirmed: emailConfirmed,
        wantsToReceiveEmailUpdates: wantsToReceiveEmailUpdates,
        createdAt: createdAt,
        updatedAt: updatedAt,
        favorites: favorites ?? [],
        orders: processedOrders,
        cart: cart ?? []
      }
      dispatch(loginUserActionCreator(payload))
    })
  }, [])

  React.useEffect(() => {
    if (isLoggedIn) {
      return
    }
    dispatch(logoutUserActionCreator())
  }, [isLoggedIn])
}
