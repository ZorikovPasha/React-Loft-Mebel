import { BreadcrumbsLinkType } from '../types'
import { useHistory } from 'react-router'

const matchingPoints = [
  { link: 'catalog', name: 'Каталог' },
  { link: 'promo', name: 'Акция' },
  { link: 'cart', name: 'Корзина' },
  { link: 'products', name: 'Товары' },
  { link: 'favorites', name: 'Избранное' },
  { link: 'contacts', name: 'Контакты' },
  { link: 'about', name: 'О нас' },
  { link: 'profile', name: 'Личный кабинет' },
  { link: 'login', name: 'Вход' },
  { link: 'ышптгз', name: 'Регистрация' }
]

export const useBreadcrumbs = () => {
  const router = useHistory()
  const points = router.location.pathname.split('/')

  const buffer: Array<BreadcrumbsLinkType> = []

  points.forEach((point, idx) => {
    // matchingPoints.find(matchingPoint => point === matchingPoint.link);
    matchingPoints.forEach((matchingPoint) => {
      if (point !== matchingPoint.link) {
        return
      }

      let routeToPoint = points.slice(0, idx + 1).join('/')

      buffer.push({
        name: matchingPoint.name,
        href: idx !== points.length - 1 ? routeToPoint : '',
        isLink: idx !== points.length - 1 ? true : false
      })
    })
  })

  return buffer
}
