import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUserData } from '../../redux/getters'
import { UserApiClient } from '../../api'
import { isSuccessfullResponse } from '../../api/types'
import { editUserActionCreator } from '../../redux/actions/userAction'

interface IProps {
  id: number
}

export const AddToFavorite: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch()

  const { favorites } = useSelector(getUserData)

  const onAddToFavoriteClick: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault()
    const payload = {
      favorites: [id]
    }
    dispatch(editUserActionCreator(payload))
    UserApiClient.addFavoriteItem(id)
      .then((dto) => {
        if (isSuccessfullResponse(dto)) {
          return
        }
        const payload = {
          favorites: [id]
        }
        editUserActionCreator(payload)
      })
      .catch(() => editUserActionCreator(payload))
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
