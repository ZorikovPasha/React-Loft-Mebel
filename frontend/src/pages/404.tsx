import Link from 'next/link'
import { ROUTES } from '../utils/const'

const Page404 = () => {
  return (
    <div className='page404 container flex items-center'>
      <p className='page404__404'>404</p>
      <p className='page404__heading'>Ooops! This page does not exist</p>
      <p>The page you are looking for might habe been removed had its name changed or is temporarily unavailable.</p>
      <Link href={ROUTES.Home}>
        <a className='page404__link'>Return to homepage</a>
      </Link>
    </div>
  )
}

export default Page404
