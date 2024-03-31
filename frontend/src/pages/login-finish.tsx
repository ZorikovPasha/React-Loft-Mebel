import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import React from 'react'

import { Loader } from '../components/common/Loader'
import { getQueryParams, sanitizeUserRes } from '../utils'
import { ROUTES } from '../utils/const'
import { UserApiClient } from '../api'
import { toggleSnackbarOpen } from '../redux/actions/errors'
import { loginUserActionCreator } from '../redux/actions/userAction'
import { isSuccessfullGetUserResponse } from '../api/types'

const LoginFinish = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  React.useEffect(() => {
    const accessToken = getQueryParams('accessToken')
    if (!accessToken) {
      router.push(ROUTES.Login)
    } else {
      UserApiClient.applyNewTokenAndReloadRequestInterceptor(accessToken)
      UserApiClient.getUserData()
        .then((res) => {
          if (isSuccessfullGetUserResponse(res)) {
            const payload = sanitizeUserRes(res.user)
            dispatch(loginUserActionCreator(payload))
            router.push({ pathname: ROUTES.Profile })
          } else {
            dispatch(toggleSnackbarOpen())
            router.push(ROUTES.Login)
          }
        })
        .catch(() => {
          dispatch(toggleSnackbarOpen())
          router.push(ROUTES.Login)
        })
    }
  }, [])

  return <Loader rootElClass='loader--fixed' />
}

export default LoginFinish
