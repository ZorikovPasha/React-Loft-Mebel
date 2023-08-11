import React from 'react'
import { useHistory } from 'react-router-dom'

import HeaderMiddle from './HeaderMiddle'
import HeaderBottom from './HeaderBottom'
import HeaderTop from './HeaderTop'
import { ROUTES } from '../../../utils/const'

export interface IHeaderProps {
  isMobMenuOpen: boolean
  setMobMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header: React.FC<IHeaderProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {
  const items = [
    { name: 'Главная', link: ROUTES.Home },
    { name: 'О нас', link: ROUTES.About },
    { name: 'Контакты', link: ROUTES.Contacts }
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
