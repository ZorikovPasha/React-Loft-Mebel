import React from 'react'
import { Link } from 'react-router-dom'

export const Footer: React.FC = () => {
  const footerLists = [
    [
      { name: 'Кухни', link: '/catalog?room=kitchens' },
      { name: 'Спальни', link: '/catalog?room=bedroom' },
      { name: 'Гостинные', link: '/catalog?room=living' }
    ],
    [
      { name: 'Прихожие', link: '/catalog?room=hall' },
      { name: 'Офисная мебель', link: '/catalog?room=office' },
      { name: 'Детская', link: '/catalog?room=children' }
    ],
    [
      { name: 'Шкафы', link: '/catalog/cabinets' },
      { name: 'Матрасы', link: '/catalog/mattresses' },
      { name: 'Мягкая мебель', link: '/catalog/upholstered' }
    ]
  ]

  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer__inner'>
          <div className='footer__main'>
            <div className='footer__column'>
              <p className='footer__title'>MENU</p>
              <div className='footer__box'>
                {footerLists.map((list) => (
                  <ul
                    className='footer__list'
                    key={list[0].link}
                  >
                    {list.map(({ link, name }) => (
                      <li
                        className='footer__list-item'
                        key={link}
                      >
                        <Link
                          to={link}
                          className='footer__list-link'
                        >
                          {name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
            <div className='footer__column footer__column--common'>
              <div className='footer__logo'>
                <img
                  src='/images/icons/footer-logo.svg'
                  alt='logo'
                />
              </div>
              <p className='footer__address'>г. Анапа, Анапское шоссе, 30 Ж/К Черное море</p>
            </div>
          </div>
          <div className='footer__bottom bottom-footer'>
            <div className='bottom-footer__left'>
              <Link
                to='/catalog/new'
                className='bottom-footer__text bottom-footer__text--promo'
              >
                Акция
              </Link>
              <Link
                to='/catalog/new'
                className='bottom-footer__text'
              >
                Новинки
              </Link>
            </div>
            <div className='bottom-footer__contacts'>
              <a
                className='bottom-footer__phone'
                href='tel:89648999119'
              >
                8 (964) 89 99 119
              </a>
              <a
                className='bottom-footer__link'
                href='#'
              >
                INSTAGRAM
              </a>
              <a
                className='bottom-footer__mail'
                href='mailto:mebel_loft_anapa@mail.ru'
              >
                mebel_loft_anapa@mail.ru
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
