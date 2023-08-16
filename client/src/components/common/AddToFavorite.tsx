import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getFavorites } from '../../redux/getters'
import { addFavoritesActionCreator, removeFavoritesActionCreator } from '../../redux/actions/favorites'
import { UserApiClient } from '../../api'
import { isSuccessFullResponse } from '../../api/types'

interface IProps {
  id: number
}

export const AddToFavorite: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch()

  const { favorites } = useSelector(getFavorites)

  const onAddToFavoriteClick: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault()
    dispatch(addFavoritesActionCreator([id]))
    UserApiClient.addFavoriteItem(id)
      .then((dto) => {
        if (isSuccessFullResponse(dto)) {
          return
        }
        removeFavoritesActionCreator([id])
      })
      .catch(() => removeFavoritesActionCreator([id]))
  }

  return (
    <button
      className={`shop__wish ${favorites.includes(id) ? 'active' : ''}`}
      onClick={onAddToFavoriteClick}
    >
      Add to favorites
    </button>
  )
}
