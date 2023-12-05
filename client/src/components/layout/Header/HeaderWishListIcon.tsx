import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getPathname, getUserData } from '../../../redux/getters'
import { ROUTES } from '../../../utils/const'

export const HeaderWishListIcon: React.FC = () => {
  const { favorites } = useSelector(getUserData)
  const pathname = useSelector(getPathname)

  const isFavoritesPage = pathname === ROUTES.Favorites

  return (
    <Link
      to='/favorites'
      className={`user-header__link user-header__link--mright ${favorites.length ? 'user-header__link--dot' : ''}`}
      title='Go to your favorites'
    >
      <img
        src={isFavoritesPage ? '/images/icons/wishlist-icon-active.svg' : '/images/icons/wishlist.svg'}
        alt='wishlist'
      />
    </Link>
  )
}
