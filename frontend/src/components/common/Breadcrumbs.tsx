import React from 'react'
import Link from 'next/link'

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
                <Link href='/'>
                  <a className='breadcrumbs__item-back'>
                    <img
                      src='/images/icons/arrow-back.svg'
                      alt='back'
                    />
                  </a>
                </Link>
              ) : (
                ''
              )}
              {link.isLink ? (
                <Link href={link.href}>
                  <a className='breadcrumbs__link'>{link.name}</a>
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
