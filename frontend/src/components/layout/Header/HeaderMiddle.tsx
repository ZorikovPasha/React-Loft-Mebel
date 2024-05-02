import React from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Link from 'next/link'

import { Search } from './Search'
import { HeaderWishListIcon } from './HeaderWishListIcon'
import { HeaderBagIcon } from './HeaderBagIcon'
import { Const, ROUTES, SCREEN_SIZES } from '../../../utils/const'
import { IHeaderProps } from './Header'
import { getUserData } from '../../../redux/getters'
import { useScreenSize } from '../../../hooks/useScreenSize'

type ItemType = {
  name: string
  link: string
}

interface IHeaderMiddleProps extends IHeaderProps {
  items: ItemType[]
}

export const HeaderMiddle: React.FC<IHeaderMiddleProps> = ({ isMobMenuOpen, setMobMenuOpen, search, setSearch }) => {
  const { isLoggedIn, image } = useSelector(getUserData)
  const menuBtnRef = React.useRef(null)

  const router = useRouter()
  const isNotMobile = useScreenSize(SCREEN_SIZES.tablet)

  React.useEffect(() => {
    document.body.onclick = function (e: MouseEvent): void {
      if (isMobMenuOpen && !e.path?.includes(menuBtnRef.current)) {
        setMobMenuOpen(false)
        document.body.classList.remove('lock')
      }
    }
  }, [])

  const isLoginOrProfilePage = router.pathname === ROUTES.Login || router.pathname === ROUTES.Profile

  const onMobMenuBtnClick = () => {
    setMobMenuOpen(true)
    document.body.classList.add('lock')
  }

  return (
    <div className='header__mid'>
      <button
        ref={menuBtnRef}
        type='button'
        className='header__menu-btn'
        onClick={onMobMenuBtnClick}
      >
        <span />
        <span />
        <span />
      </button>
      <Link href='/'>
        <a className='header__logo'>
          <img
            src={isNotMobile ? '/images/logo.svg' : '/images/icons/footer-logo.svg'}
            alt='logo'
          />
        </a>
      </Link>

      <Search
        state={search}
        setSearch={setSearch}
      />
      <div className='header__connect'>
        <a
          className='header__phone header__phone--black'
          href='tel:89648999119'
        >
          {Const.phone}
        </a>
      </div>
      <div className='flex justify-between items-center'>
        {isLoggedIn && <HeaderWishListIcon />}
        {isLoggedIn && <HeaderBagIcon />}

        <div className={`flex items-center justify-center ${isLoggedIn ? 'header__mobile-list-wrap' : ''}`}>
          <Link
            href={isLoggedIn ? ROUTES.Profile : ROUTES.Login}
            title='Profile'
          >
            <a className='user-header__link user-header__link--profile'>
              {isLoggedIn && image ? (
                <img
                  className='user-header__picture'
                  src={image.url}
                  alt='profile'
                />
              ) : (
                <img
                  src={isLoginOrProfilePage ? '/images/icons/profile-icon.svg' : '/images/icons/profile.svg'}
                  alt=''
                />
              )}
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
