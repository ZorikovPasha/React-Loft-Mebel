import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../utils/const'

export const Page404: React.FC = () => {
  return (
    <div className='page404 container flex items-center'>
      <p className='page404__404'>404</p>
      <p className='page404__heading'>Ooops! This page does not exist</p>
      <p>The page you are looking for might habe been removed had its name changed or is temporarily unavailable.</p>
      <Link
        className='page404__link'
        to={ROUTES.Home}
      >
        Return to homepage
      </Link>
    </div>
  )
}
