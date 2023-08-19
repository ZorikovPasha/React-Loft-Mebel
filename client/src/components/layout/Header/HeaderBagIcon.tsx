import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getPathname, getUserData } from '../../../redux/getters'
import { ROUTES } from '../../../utils/const'

export const HeaderBagIcon: React.FC = () => {
  const { cart } = useSelector(getUserData)

  const pathname = useSelector(getPathname)

  const isCartPage = pathname === ROUTES.Cart

  return (
    <Link
      to='/cart'
      className={`user-header__link user-header__link--hover ${cart.length ? 'user-header__link--dot' : ''}`}
    >
      <img
        src={isCartPage ? '/images/icons/bag-active.svg' : '/images/icons/bag.svg'}
        alt='bag'
      />
    </Link>
  )
}
