import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUserData } from '../../redux/getters'
import { UserApiClient } from '../../api'
import { isSuccessfullResponse } from '../../api/types'
import { editUserActionCreator } from '../../redux/actions/userAction'
import { toggleSnackbarOpen } from '../../redux/actions/errors'

interface IProps {
  id: number
}

export const AddToFavorite: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch()

  const { favorites, isLoggedIn } = useSelector(getUserData)

  const onAddToFavoriteClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()

    if (!isLoggedIn) {
      return dispatch(toggleSnackbarOpen('You are not logged in. Please login.', 'warning'))
    }

    UserApiClient.addFavoriteItem(id)
      .then((dto) => {
        if (!isSuccessfullResponse(dto)) {
          return dispatch(toggleSnackbarOpen())
        }

        const payload = {
          favorites: [id]
        }

        dispatch(editUserActionCreator(payload))
      })
      .catch(() => {
        dispatch(toggleSnackbarOpen())
      })
  }

  return (
    <button
      className='shop__wish'
      onClick={onAddToFavoriteClick}
    >
      <img
        src={favorites.includes(id) ? '/images/icons/wished.svg' : '/images/icons/wish.svg'}
        alt=''
      />
    </button>
  )
}
