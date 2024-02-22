import React from 'react'
import { Link } from 'react-router-dom'

export type BreadcrumbsLinkType = {
  name: string
  href: string
  isLink: boolean
}

interface IBreadcrumbsProps {
  breadcrumbs: Array<BreadcrumbsLinkType>
}

export const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <div className='breadcrumbs'>
      <div className='container'>
        <ul className='breadcrumbs__list'>
          {breadcrumbs?.map((link, idx) => (
            <li
              className='breadcrumbs__item'
              key={link.name}
            >
              {idx === breadcrumbs.length - 1 ? (
                <Link
                  className='breadcrumbs__item-back'
                  to='/'
                >
                  <img
                    src='/images/icons/arrow-back.svg'
                    alt='back'
                  />
                </Link>
              ) : (
                ''
              )}
              {link.isLink ? (
                <Link
                  className='breadcrumbs__link'
                  to={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                <span className='breadcrumbs__link'>{link.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
