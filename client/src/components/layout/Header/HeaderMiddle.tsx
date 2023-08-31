import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Search } from './Search'
import { HeaderWishListIcon } from './HeaderWishListIcon'
import { HeaderBagIcon } from './HeaderBagIcon'
import { Const, ROUTES, SCREEN_SIZES } from '../../../utils/const'
import { IHeaderProps } from './Header'
import { getPathname, getUserData } from '../../../redux/getters'
import { useScreenSize } from '../../../hooks/useScreenSize'

type ItemType = {
  name: string
  link: string
}

interface IHeaderMiddleProps extends IHeaderProps {
  items: ItemType[]
}

export const HeaderMiddle: React.FC<IHeaderMiddleProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {
  const { isLoggedIn, image } = useSelector(getUserData)
  const menuBtnRef = React.useRef(null)

  const isNotMobile = useScreenSize(SCREEN_SIZES.tablet)

  React.useEffect(() => {
    document.body.onclick = function (e: MouseEvent): void {
      if (isMobMenuOpen && !e.path?.includes(menuBtnRef.current)) {
        setMobMenuOpen(false)
        document.documentElement.classList.remove('lock')
      }
    }
  }, [])

  const onMobMenuBtnClick = (): void => {
    setMobMenuOpen(true)
    document.documentElement.classList.add('lock')
  }

  const pathname = useSelector(getPathname)

  const isLoginOrSignupPage = pathname === ROUTES.Login || pathname === ROUTES.Signup

  return (
    <div className='header__mid'>
      <button
        type='button'
        className='header__menu-btn'
        onClick={onMobMenuBtnClick}
        ref={menuBtnRef}
      >
        <div></div>
        <div></div>
        <div></div>
      </button>
      <Link
        to='/'
        className='header__logo'
      >
        <img
          src={isNotMobile ? '/images/logo.svg' : '/images/icons/footer-logo.svg'}
          alt='logo'
        />
      </Link>

      <Search />
      <div className='header__connect'>
        <a
          className='header__phone header__phone--black'
          href='tel:89648999119'
        >
          {Const.phone}
        </a>
      </div>
      <div className='flex justify-between items-center'>
        <HeaderWishListIcon />
        <HeaderBagIcon />
        <Link
          to={isLoggedIn ? ROUTES.Profile : ROUTES.Login}
          className='user-header__link user-header__link--profile user-header__link--hover'
        >
          {isLoggedIn && image ? (
            <img
              className='user-header__picture'
              src={image.url}
              alt='profile'
            />
          ) : (
            <img
              src={isLoginOrSignupPage ? '/images/icons/profile-icon.svg' : '/images/icons/profile.svg'}
              alt=''
            />
          )}
        </Link>
      </div>
    </div>
  )
}
