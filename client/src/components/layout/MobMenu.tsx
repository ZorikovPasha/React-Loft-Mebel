import React, { FC, MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'

interface IMobMenuProps {
  isMobMenuOpen: Boolean
  setMobMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MobMenu: FC<IMobMenuProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {
  const mobmenu = {
    top: [],
    body: []
  }
  const onMobMenuItemClick: React.MouseEventHandler<HTMLAnchorElement> = (): void => {
    setMobMenuOpen(false)
    document.documentElement.classList.remove('lock')
  }

  const onMobMenuCloseClick: MouseEventHandler<HTMLButtonElement> = (): void => {
    setMobMenuOpen(false)
    document.documentElement.classList.remove('lock')
  }

  return (
    <div className={`mob-menu ${isMobMenuOpen ? 'opened' : ''}`}>
      <div className={`mob-menu__body ${isMobMenuOpen ? 'opened' : ''}`}>
        <div className='mob-menu__top'>
          <h5 className='mob-menu__title'>Меню</h5>
          <button
            className='mob-menu__close'
            onClick={onMobMenuCloseClick}
          />
        </div>
        <ul className='mob-menu__list'>
          {mobMenu?.top.map(({ mobMenuItem, link, imgLink }) => (
            <li
              className='mob-menu__list-item'
              key={mobMenuItem}
            >
              <Link
                to={link}
                className='mob-menu__link'
                onClick={onMobMenuItemClick}
              >
                <span>
                  <img
                    src={imgLink}
                    alt=''
                  />
                </span>
                {mobMenuItem}
              </Link>
            </li>
          ))}
        </ul>
        <p className='mob-menu__subtitle'>Категории</p>
        <ul className='mob-menu__list'>
          {mobMenu &&
            mobMenu?.body.map(({ mobMenuItem, link, imgLink }) => (
              <li
                className='mob-menu__list-item'
                key={mobMenuItem}
              >
                <Link
                  to={link}
                  className='mob-menu__link'
                  onClick={onMobMenuItemClick}
                >
                  <span>
                    <img
                      src={imgLink}
                      alt=''
                    />
                  </span>
                  {mobMenuItem}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default MobMenu
