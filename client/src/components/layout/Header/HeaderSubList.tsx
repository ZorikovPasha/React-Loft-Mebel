import React from 'react'
import { Link } from 'react-router-dom'

export type ListsType = {
  text: string
  link: string
}[]

interface IHeaderSubList {
  items: ListsType
  parentDir: string
  rootElClass?: string
}

const HeaderSubList: React.FC<IHeaderSubList> = ({ items, parentDir, rootElClass }) => {
  return (
    <ul className={`sub-list ${rootElClass}`}>
      {items &&
        items.map(({ link, text }) => (
          <li
            key={link}
            className='sub-list__item'
          >
            <Link
              to={`${parentDir}`}
              className='sub-list__link'
            >
              {text}
            </Link>
          </li>
        ))}
    </ul>
  )
}

export default HeaderSubList
