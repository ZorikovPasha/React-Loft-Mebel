import React, { FC, MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { HeaderSearchForm } from './HeaderSearchForm'
import { HeaderWishListIcon } from './HeaderWishListIcon'
import { HeaderBagIcon } from './HeaderBagIcon'
import { Const, ROUTES } from '../../../utils/const'
import { getIsAuth } from '../../../redux/getters'
import { IHeaderProps } from './Header'

type ItemType = {
  name: string
  link: string
}

interface IHeaderMiddleProps extends IHeaderProps {
  items: ItemType[]
}

const HeaderMiddle: FC<IHeaderMiddleProps> = ({ isMobMenuOpen, setMobMenuOpen, items }) => {
  const isAuth = useSelector(getIsAuth)

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

  if (
    location.pathname === ROUTES.Contacts ||
    location.pathname === ROUTES.Catalog ||
    location.pathname === ROUTES.Product ||
    location.pathname === ROUTES.About
  ) {
    headerMiddleTall = true
  }

  return (
    <>
      {headerMiddleTall ? (
        <div className='header__mid header__mid--taller'>
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
              to={isAuth ? '/profile' : '/login'}
              className='user-header__link'
            >
              <img
                src='/images/icons/profile.svg'
                alt='profile'
              />
            </Link>
          </div>
        </div>
      ) : (
        <div className='header__mid'>
          <div
            className='menu-btn'
            onClick={onMobMenuBtnClick}
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

          <HeaderSearchForm />
          <div className='header__connect header__connect--mid'>
            <a
              className='header__phone header__phone--black'
              href='tel:89648999119'
            >
              {Const.phone}
            </a>
            <Link
              to='/about'
              className='header__delivery header__delivery--black'
            >
              Доставка
            </Link>
          </div>
          <div className='header__user user-header'>
            <HeaderWishListIcon />
            <HeaderBagIcon />
            <Link
              to={isAuth ? '/profile' : '/login'}
              className='user-header__link user-header__link--hover'
            >
              <img
                src='/images/icons/profile.svg'
                alt='profile'
              />
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default HeaderMiddle
