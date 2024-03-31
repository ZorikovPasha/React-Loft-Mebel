import { useSelector } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getUserData } from '../../../redux/getters'
import { ROUTES } from '../../../utils/const'

export const HeaderWishListIcon = () => {
  const { favorites } = useSelector(getUserData)
  const router = useRouter()
  const isFavoritesPage = router.pathname === ROUTES.Favorites

  return (
    <Link
      href='/favorites'
      title='Go to your favorites'
    >
      <a className={`user-header__link user-header__link--mright ${favorites.length ? 'user-header__link--dot' : ''}`}>
        <img
          src={isFavoritesPage ? '/images/icons/wishlist-icon-active.svg' : '/images/icons/wishlist.svg'}
          alt='wishlist'
        />
      </a>
    </Link>
  )
}
