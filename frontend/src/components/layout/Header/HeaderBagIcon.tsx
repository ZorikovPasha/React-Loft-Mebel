import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'

import { getUserData } from '../../../redux/getters'
import { ROUTES } from '../../../utils/const'
import { useRouter } from 'next/router'

export const HeaderBagIcon: React.FC = () => {
  const { cart } = useSelector(getUserData)

  const router = useRouter()

  const isCartPage = router.pathname === ROUTES.Cart

  return (
    <Link
      href='/cart'
      title='Go to cart'
    >
      <a className={`user-header__link user-header__link--mright ${cart.length ? 'user-header__link--dot' : ''}`}>
        <img
          src={isCartPage ? '/images/icons/bag-active.svg' : '/images/icons/bag.svg'}
          alt='bag'
        />
      </a>
    </Link>
  )
}
