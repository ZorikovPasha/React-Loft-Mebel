import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/const'

interface IMobMenuProps {
  isMobMenuOpen: Boolean
  setMobMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MobMenu: React.FC<IMobMenuProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {
  const mobMenu = {
    top: [
      {
        name: 'Главная',
        link: ROUTES.Home,
        imgLink: '/images/mob-menu/home.svg'
      },
      {
        name: 'О нас',
        link: ROUTES.About,
        imgLink: '/images/mob-menu/info.svg'
      },
      {
        name: 'Контакты',
        link: ROUTES.Contacts,
        imgLink: '/images/mob-menu/contacts.svg'
      }
    ],
    body: [
      {
        name: 'Кухни',
        link: '/catalog/kitchens',
        imgLink: '/images/mob-menu/kitchen.svg'
      },
      {
        name: 'Спальни',
        link: '/catalog/bedroom',
        imgLink: '/images/mob-menu/bedroom.svg'
      },
      {
        name: 'Гостинные',
        link: '/catalog/living',
        imgLink: '/images/mob-menu/livingroom.svg'
      },
      {
        name: 'Прихожие',
        link: '/catalog/hall',
        imgLink: '/images/mob-menu/closet.svg'
      },
      {
        name: 'Офисная мебель',
        link: '/catalog/office',
        imgLink: '/images/mob-menu/office.svg'
      },
      {
        name: 'Детская',
        link: '/catalog/children',
        imgLink: '/images/mob-menu/children.svg'
      },
      {
        name: 'Акция',
        link: '/catalog/new',
        imgLink: '/images/mob-menu/promo.svg'
      },
      {
        name: 'Новинки',
        link: '/catalog/new',
        imgLink: '/images/mob-menu/new.svg'
      },
      {
        name: 'Матрасы',
        link: '/catalog/mattresses',
        imgLink: '/images/mob-menu/mattress.svg'
      },
      {
        name: 'Мягкая мебель',
        link: '/catalog/upholstered',
        imgLink: '/images/mob-menu/armchair.svg'
      },
      {
        name: 'Шкафы',
        link: '/catalog/cabinets',
        imgLink: '/images/mob-menu/cupboard.svg'
      }
    ]
  }
  const onMobMenuItemClick: React.MouseEventHandler<HTMLAnchorElement> = (): void => {
    setMobMenuOpen(false)
    document.documentElement.classList.remove('lock')
  }

  const onMobMenuCloseClick: React.MouseEventHandler<HTMLButtonElement> = (): void => {
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
          {mobMenu.top.map(({ name, link, imgLink }) => (
            <li
              className='mob-menu__list-item'
              key={name}
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
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <p className='mob-menu__subtitle'>Категории</p>
        <ul className='mob-menu__list'>
          {mobMenu.body.map(({ name, link, imgLink }) => (
            <li
              className='mob-menu__list-item'
              key={name}
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
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
