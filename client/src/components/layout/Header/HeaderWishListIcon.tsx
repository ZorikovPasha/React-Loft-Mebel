import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getUserData } from '../../../redux/getters'

export const HeaderWishListIcon: React.FC = () => {
  const { favorites } = useSelector(getUserData)

  return (
    <Link
      to='/favorites'
      className={`user-header__link user-header__link--hover ${favorites.length ? 'user-header__link--dot' : ''}`}
    >
      <img
        src='/images/icons/wishlist.svg'
        alt='wishlist'
      />
    </Link>
  )
}
