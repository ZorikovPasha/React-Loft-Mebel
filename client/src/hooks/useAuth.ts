import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { UserApiClient } from '../api/'
import { loginUserActionCreator, logoutUserActionCreator } from '../redux/actions/userAction'
import { getUserData } from '../redux/getters'
import { isSuccessfullGetUserResponse } from '../api/types'
import { getQueryParams, sanitizeUserRes } from '../utils'

export const useAuth = async (): Promise<void> => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(getUserData)

  React.useEffect(() => {
    const newToken = getQueryParams('token')
    if (typeof newToken === 'string') {
      localStorage.setItem('loft_furniture_token', newToken)
    }

    const token = localStorage.getItem('loft_furniture_token')
    if (!token) {
      return
    }

    UserApiClient.getUserData().then((data) => {
      if (!isSuccessfullGetUserResponse(data)) {
        return
      }

      const payload = sanitizeUserRes(data.user)
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
