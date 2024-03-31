import React from 'react'
import Link from 'next/link'

import { ROUTES } from '../../utils/const'
import { Button } from '../common/Button'

interface IMobMenuProps {
  isMobMenuOpen: boolean
  setMobMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MobMenu: React.FC<IMobMenuProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {
  const mobMenu = {
    top: [
      {
        name: 'Home',
        link: ROUTES.Home,
        imgLink: '/images/mob-menu/home.svg'
      },
      {
        name: 'About us',
        link: ROUTES.About,
        imgLink: '/images/mob-menu/info.svg'
      },
      {
        name: 'Contacts',
        link: ROUTES.Contacts,
        imgLink: '/images/mob-menu/contacts.svg'
      }
    ],
    body: [
      {
        name: 'Kitchens',
        link: '/catalog?room=kitchen',
        imgLink: '/images/mob-menu/kitchen.svg'
      },
      {
        name: 'Bedrooms',
        link: '/catalog?room=bedroom',
        imgLink: '/images/mob-menu/bedroom.svg'
      },
      {
        name: 'Living rooms',
        link: '/catalog?room=living',
        imgLink: '/images/mob-menu/livingroom.svg'
      },
      {
        name: 'Halls',
        link: '/catalog?room=hall',
        imgLink: '/images/mob-menu/closet.svg'
      },
      {
        name: 'Office',
        link: '/catalog?room=office',
        imgLink: '/images/mob-menu/office.svg'
      },
      {
        name: 'Children',
        link: '/catalog?room=children',
        imgLink: '/images/mob-menu/children.svg'
      }
    ]
  }
  const onMobMenuItemClick: React.MouseEventHandler<HTMLAnchorElement> = (): void => {
    setMobMenuOpen(false)
    document.body.classList.remove('lock')
  }

  const onMobMenuCloseClick: React.MouseEventHandler<HTMLButtonElement> = (): void => {
    setMobMenuOpen(false)
    document.body.classList.remove('lock')
  }

  return (
    <div className={`mob-menu ${isMobMenuOpen ? 'opened' : ''}`}>
      <div className={`mob-menu__body ${isMobMenuOpen ? 'opened' : ''}`}>
        <div className='mob-menu__top'>
          <h5 className='mob-menu__title'>Menu</h5>
          <Button
            title='Close mobile menu'
            type='button'
            className='mob-menu__close'
            onClick={onMobMenuCloseClick}
          >
            <img
              src='/images/mob-menu/close.svg'
              alt=''
            />
          </Button>
        </div>
        <ul className='mob-menu__list'>
          {mobMenu.top.map(({ name, link, imgLink }) => (
            <li
              className='mob-menu__list-item'
              key={name}
            >
              <Link href={link}>
                <a
                  className='mob-menu__link'
                  onClick={onMobMenuItemClick}
                >
                  <span>
                    <img
                      src={imgLink}
                      alt=''
                    />
                  </span>
                  {name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <p className='mob-menu__subtitle'>Categories</p>
        <ul className='mob-menu__list'>
          {mobMenu.body.map(({ name, link, imgLink }) => (
            <li
              className='mob-menu__list-item'
              key={name}
            >
              <Link href={link}>
                <a
                  className='mob-menu__link'
                  onClick={onMobMenuItemClick}
                >
                  <span>
                    <img
                      src={imgLink}
                      alt=''
                    />
                  </span>
                  {name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
