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

  console.log('id', id)

  const { favorites, isLoggedIn } = useSelector(getUserData)

  console.log('favorites', favorites)

  const onAddToFavoriteClick: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault()
    const payload = {
      favorites: [id]
    }

    dispatch(editUserActionCreator(payload))

    if (!isLoggedIn) {
      return
    }
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
