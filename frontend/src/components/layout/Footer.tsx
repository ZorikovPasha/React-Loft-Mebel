import React from 'react'
import Link from 'next/link'
import { ROUTES } from '../../utils/const'

export const Footer: React.FC = () => {
  const footerLists = [
    [
      { name: 'Kithens', link: '/catalog?room=kitchen' },
      { name: 'Bedrooms', link: '/catalog?room=bedroom' },
      { name: 'Living rooms', link: '/catalog?room=living' }
    ],
    [
      { name: 'Halls', link: '/catalog?room=hall' },
      { name: 'Office', link: '/catalog?room=office' },
      { name: 'Chidren', link: '/catalog?room=children' }
    ]
  ]

  return (
    <footer className='footer mt-30'>
      <div className='container'>
        <div className='footer__inner'>
          <div className='footer__main'>
            <div className='footer__column'>
              <p className='footer__title'>MENU</p>
              <div className='footer__box'>
                {footerLists.map((list) => (
                  <ul
                    className='footer__list'
                    key={list[0]?.link}
                  >
                    {list.map(({ link, name }) => (
                      <li
                        className='footer__list-item'
                        key={link}
                      >
                        <Link href={link}>
                          <a className='footer__list-link'>{name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ))}
                <ul className='footer__list'>
                  <li className='footer__list-item'>
                    <Link href={ROUTES.About}>
                      <a className='footer__list-link'>About us</a>
                    </Link>
                  </li>
                  <li className='footer__list-item'>
                    <Link href={ROUTES.Contacts}>
                      <a className='footer__list-link'>Contacts</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className='footer__column footer__column--common'>
              <div className='footer__logo'>
                <img
                  src='/images/icons/footer-logo.svg'
                  alt='logo'
                />
              </div>
              <p className='footer__address'>4550 W Pico Blvd unit d-101, Los Angeles, CA 90019, United States</p>
            </div>
          </div>
          <div className='footer__bottom bottom-footer'>
            <div className='bottom-footer__left'>
              <Link href='/catalog?sale=1'>
                <a className='bottom-footer__text bottom-footer__text--promo'>Sale</a>
              </Link>
            </div>
            <div className='bottom-footer__contacts'>
              <a
                className='bottom-footer__link'
                href='#'
              >
                INSTAGRAM
              </a>
              <a
                className='bottom-footer__mail'
                href='mailto:mebel_loft_la@gmail.com'
              >
                mebel_loft_la@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
