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

  const { favorites, isLoggedIn } = useSelector(getUserData)

  const onAddToFavoriteClick: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault()

    if (!isLoggedIn) {
      return
    }
    UserApiClient.addFavoriteItem(id)
      .then((dto) => {
        if (!isSuccessfullResponse(dto)) {
          return window.alert('Something went wrong!(')
        }

        const payload = {
          favorites: [id]
        }

        dispatch(editUserActionCreator(payload))
      })
      .catch(() => {
        window.alert('Something went wrong!(')
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
