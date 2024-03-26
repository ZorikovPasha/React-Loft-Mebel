import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Loader } from '../components/common/Loader'
import { getQueryParams, sanitizeUserRes } from '../utils'
import { ROUTES } from '../utils/const'
import { UserApiClient } from '../api'
import { toggleSnackbarOpen } from '../redux/actions/errors'
import { loginUserActionCreator } from '../redux/actions/userAction'
import { isSuccessfullGetUserResponse } from '../api/types'

const LoginFinish: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const accessToken = getQueryParams('accessToken')

  if (!accessToken) {
    history.push({ pathname: ROUTES.Login })
  } else {
    UserApiClient.applyNewTokenAndReloadRequestInterceptor(accessToken)
    UserApiClient.getUserData()
      .then((res) => {
        console.log('res', res)
        console.log('isSuccessfullLoginResponse(res)', isSuccessfullGetUserResponse(res))

        if (isSuccessfullGetUserResponse(res)) {
          const payload = sanitizeUserRes(res.user)
          dispatch(loginUserActionCreator(payload))
          history.push({ pathname: ROUTES.Profile })
        } else {
          dispatch(toggleSnackbarOpen())
          history.push({ pathname: ROUTES.Login })
        }
      })
      .catch((eror) => {
        console.log('eror', eror)

        dispatch(toggleSnackbarOpen())
        history.push({ pathname: ROUTES.Login })
      })
  }

  return <Loader rootElClass='loader--fixed' />
}

export default LoginFinish
