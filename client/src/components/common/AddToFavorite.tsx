import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUserData } from '../../redux/getters'
import { UserApiClient } from '../../api'
import { isSuccessfullResponse } from '../../api/types'
import { editUserActionCreator } from '../../redux/actions/userAction'
import { toggleSnackbarOpen } from '../../redux/actions/errors'
import { Button } from './Button'

interface IProps {
  id: number
}

export const AddToFavorite: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch()

  const { favorites, isLoggedIn } = useSelector(getUserData)

  const onAddToFavoriteClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()

    if (!isLoggedIn) {
      return dispatch(toggleSnackbarOpen('You are not logged in. Please login.', 'warning'))
    }

    const payload = {
      favorites: [id]
    }

    if (favorites.includes(id)) {
      try {
        const response = await UserApiClient.deleteFavoriteItem(id)
        if (!isSuccessfullResponse(response)) {
          return dispatch(toggleSnackbarOpen())
        }

        dispatch(editUserActionCreator(payload))
      } catch (error) {
        dispatch(toggleSnackbarOpen())
      }
    } else {
      try {
        const response = await UserApiClient.addFavoriteItem(id)
        if (!isSuccessfullResponse(response)) {
          return dispatch(toggleSnackbarOpen())
        }

        dispatch(editUserActionCreator(payload))
      } catch (error) {
        dispatch(toggleSnackbarOpen())
      }
    }
  }

  return (
    <Button
      title='Add to favorites'
      type='button'
      className='shop__wish'
      onClick={onAddToFavoriteClick}
    >
      <img
        src={favorites.includes(id) ? '/images/icons/wished.svg' : '/images/icons/wish.svg'}
        alt=''
      />
    </Button>
  )
}
