import React, { FC, MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { HeaderSearchForm } from './HeaderSearchForm'
import { HeaderWishListIcon } from './HeaderWishListIcon'
import { HeaderBagIcon } from './HeaderBagIcon'
import { Const, ROUTES } from '../../../utils/const'
import { IHeaderProps } from './Header'
import { getPathname, getUserData } from '../../../redux/getters'

type ItemType = {
  name: string
  link: string
}

interface IHeaderMiddleProps extends IHeaderProps {
  items: ItemType[]
}

const HeaderMiddle: FC<IHeaderMiddleProps> = ({ isMobMenuOpen, setMobMenuOpen, items }) => {
  const { isLoggedIn, image } = useSelector(getUserData)
  const menuBtnRef = React.useRef(null)

  React.useEffect(() => {
    document.body.onclick = function (e: MouseEvent): void {
      if (isMobMenuOpen && !e.path?.includes(menuBtnRef.current)) {
        setMobMenuOpen(false)
        document.documentElement.classList.remove('lock')
      }
    }
  }, [])

  const onMobMenuBtnClick: MouseEventHandler<HTMLDivElement> = (): void => {
    setMobMenuOpen(true)
    document.documentElement.classList.add('lock')
  }

  const { location } = useHistory()
  let headerMiddleTall = false

  const pathname = useSelector(getPathname)

  const isLoginOrSignupPage = pathname === ROUTES.Login || pathname === ROUTES.Signup

  if (
    location.pathname === ROUTES.Contacts ||
    location.pathname === ROUTES.Catalog ||
    location.pathname === ROUTES.Product ||
    location.pathname === ROUTES.About
  ) {
    headerMiddleTall = true
  }

  return (
    <div className='header__mid'>
      <div
        className='menu-btn'
        onClick={onMobMenuBtnClick}
        ref={menuBtnRef}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Link
        to='/'
        className='logo'
      >
        <img
          src='/images/logo.svg'
          alt='logo'
        />
      </Link>

      {headerMiddleTall ? (
        <nav className='header__nav'>
          <ul className='header__list'>
            {items.map((item, idx) => (
              <li
                key={`${item.name}_${idx}`}
                className='header__list-item'
              >
                <Link
                  to={item.link}
                  className='header__list-link'
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
      <HeaderSearchForm inputSpec />
      <div className='header__connect'>
        <a
          className='header__phone header__phone--black'
          href='tel:89648999119'
        >
          {Const.phone}
        </a>
        <Link
          className='header__delivery header__delivery--black'
          to='/contacts'
        >
          Доставка
        </Link>
      </div>
      <div className='header__user user-header'>
        <HeaderWishListIcon />
        <HeaderBagIcon />
        <Link
          to={isLoggedIn ? '/profile' : '/login'}
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

export default HeaderMiddle
