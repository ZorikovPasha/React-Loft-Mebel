import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Search } from './Search'
import { HeaderWishListIcon } from './HeaderWishListIcon'
import { HeaderBagIcon } from './HeaderBagIcon'
import { Const, ROUTES, SCREEN_SIZES } from '../../../utils/const'
import { IHeaderProps } from './Header'
import { getPathname, getUserData } from '../../../redux/getters'
import { useScreenSize } from '../../../hooks/useScreenSize'
import { logoutUserActionCreator } from '../../../redux/actions/userAction'
import { Button } from '../../common/Button'

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

  const dispatch = useDispatch()
  const history = useHistory()
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

  const isLoginOrProfilePage = pathname === ROUTES.Login || pathname === ROUTES.Profile

  const onLogout = () => {
    localStorage.removeItem('loft_furniture_token')
    localStorage.removeItem('decidedOnRecieveingEmails')
    dispatch(logoutUserActionCreator())
    history.push({ pathname: '/' })
  }

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
        {isNotMobile && <HeaderWishListIcon />}
        {isNotMobile && <HeaderBagIcon />}

        <div className={isLoggedIn ? 'header__mobile-list-wrap' : ''}>
          <Link
            to={isLoggedIn ? ROUTES.Profile : ROUTES.Login}
            className='user-header__link user-header__link--hover'
          >
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
          </Link>

          <div className='header__mobile-list'>
            <ul className='header__mobile-list-inner flex flex-col'>
              <li className='header__mobile-list-item'>
                <Link
                  to={ROUTES.Favorites}
                  className='header__mobile-list-link'
                >
                  <img
                    src='/images/icons/wishlist.svg'
                    alt='wishlist'
                  />
                  Your favorites
                </Link>
              </li>
              <li className='header__mobile-list-item'>
                <Link
                  to={ROUTES.Cart}
                  className='header__mobile-list-link'
                >
                  <img
                    src='/images/icons/bag.svg'
                    alt='bag'
                  />
                  Your cart
                </Link>
              </li>

              <li>
                <Button
                  className='profile__logout'
                  type='button'
                  title='Log out'
                  onClick={onLogout}
                >
                  <>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9'
                        stroke='#D41367'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M16 17L21 12L16 7'
                        stroke='#D41367'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M21 12H9'
                        stroke='#D41367'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    Log out
                  </>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
