import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUserData } from '../redux/getters'
import { logUserOut } from '../utils'

export const useAuth = async (): Promise<void> => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(getUserData)

  React.useEffect(() => {
    if (isLoggedIn) {
      return
    }

    logUserOut(dispatch)
  }, [isLoggedIn])
}
