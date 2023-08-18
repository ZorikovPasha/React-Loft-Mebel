import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getUserData } from '../../../redux/getters'

export const HeaderBagIcon: React.FC = () => {
  const { cart } = useSelector(getUserData)

  return (
    <Link
      to='/cart'
      className={`user-header__link user-header__link--hover ${cart.length ? 'user-header__link--dot' : ''}`}
    >
      <img
        src='/images/icons/bag.svg'
        alt='bag'
      />
    </Link>
  )
}
