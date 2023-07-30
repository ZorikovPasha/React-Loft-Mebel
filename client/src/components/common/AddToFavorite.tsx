import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getFavorites } from '../../redux/getters'
import { addFavoritesActionCreator } from '../../redux/actions/favorites'
import { UserApiClient } from '../../api'

interface IProps {
  id: number
}

export const AddToFavorite: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch()

  const { favorites } = useSelector(getFavorites)

  const onAddToFavoriteClick: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault()
    dispatch(addFavoritesActionCreator([id]))
    UserApiClient.sendFavoriteItem(id)
  }

  return (
    <button
      className={`shop__wish ${favorites.includes(id) ? 'active' : ''}`}
      onClick={onAddToFavoriteClick}
    >
      Добавить в желаемое
    </button>
  )
}
