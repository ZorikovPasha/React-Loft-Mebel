import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import { logoutUserActionCreator } from '../redux/actions/userAction'
import { getUserData } from '../redux/getters'
import { UserApiClient } from '../api'

export const useAuth = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(getUserData)

  React.useEffect(() => {
    if (isLoggedIn) {
      return
    }

    UserApiClient.logout().catch((error) => {
      console.log('error', error)
    })
    dispatch(logoutUserActionCreator())
    router.push('/')
  }, [isLoggedIn])
}
