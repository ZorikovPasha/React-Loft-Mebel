import React from 'react'
import HeaderMiddle from './HeaderMiddle'
import HeaderBottom from './HeaderBottom'
import HeaderTop from './HeaderTop'
import { ROUTES } from '../../../utils/const'
import { IHeaderProps } from '../../../types'
import { useHistory } from 'react-router-dom'

const Header: React.FC<IHeaderProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {
  const items = [
    { name: 'Главная', link: '/' },
    { name: 'О нас', link: 'about' },
    { name: 'Контакты', link: 'contacts' }
  ]

  const { location } = useHistory()
  let showHeaderTop = false

  if (location.pathname === ROUTES.Home) {
    showHeaderTop = true
  }

  return (
    <header className='header'>
      {showHeaderTop && <HeaderTop items={items} />}
      <div className='container'>
        <HeaderMiddle
          isMobMenuOpen={isMobMenuOpen}
          setMobMenuOpen={setMobMenuOpen}
          items={items}
        />
        <HeaderBottom />
      </div>
    </header>
  )
}

export default Header
