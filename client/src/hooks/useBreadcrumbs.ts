import { useHistory } from 'react-router'
import { BreadcrumbsLinkType } from '../components/common/Breadcrumbs'

const matchingPoints = [
  { link: 'catalog', name: 'Catalog' },
  { link: 'promo', name: 'Sale' },
  { link: 'cart', name: 'Cart' },
  { link: 'products', name: 'Products' },
  { link: 'favorites', name: 'Favorites' },
  { link: 'contacts', name: 'Contacts' },
  { link: 'about', name: 'About us' },
  { link: 'profile', name: 'Profile' },
  { link: 'login', name: 'Login' },
  { link: 'signup', name: 'Sign up' }
]

export const useBreadcrumbs = (): BreadcrumbsLinkType[] => {
  const router = useHistory()
  const points = router.location.pathname.split('/')

  const buffer: Array<BreadcrumbsLinkType> = []

  points.forEach((point, idx) => {
    // matchingPoints.find(matchingPoint => point === matchingPoint.link);
    matchingPoints.forEach((matchingPoint) => {
      if (point !== matchingPoint.link) {
        return
      }

      const routeToPoint = points.slice(0, idx + 1).join('/')

      buffer.push({
        name: matchingPoint.name,
        href: idx !== points.length - 1 ? routeToPoint : '',
        isLink: idx !== points.length - 1 ? true : false
      })
    })
  })

  return buffer
}
