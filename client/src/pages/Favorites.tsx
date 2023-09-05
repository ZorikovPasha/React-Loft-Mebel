import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getProducts, getUserData } from '../redux/getters'
import { useBreadcrumbs } from '../hooks/useBreadcrumbs'
import { Card } from '../components/common/card'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Empty } from '../components/common/Empty'
import { IFurniture } from '../api/types'
import { setPathnameActionCreator } from '../redux/actions/pathname'

const Favorites: React.FC = () => {
  const breadcrumbs = useBreadcrumbs()
  const dispatch = useDispatch()

  const items = useSelector(getProducts)
  const { favorites } = useSelector(getUserData)

  const favoriteItems: IFurniture[] = []
  favorites.forEach((id) => {
    const item = items.find((item) => item.id === id)
    if (item) {
      favoriteItems.push(item)
    }
  })

  React.useLayoutEffect(() => {
    dispatch(setPathnameActionCreator(window.location.pathname))

    return () => {
      dispatch(setPathnameActionCreator('whatever'))
    }
  }, [])

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section className='cart'>
        <div className='container'>
          <div className='cart__top'>
            <p>Вам понравилось:</p>
            <p>
              <span className='cart__top-num'>Предметов: {favorites?.length}</span>
            </p>
          </div>
        </div>
      </section>
      {favorites.length ? (
        <section className='sales'>
          <div className='container'>
            <div className='sales__items sales__items--cart'>
              {favoriteItems?.map((item) => (
                <Card
                  key={item.id}
                  product={item}
                  isFavorite={true}
                />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className='container'>
          <Empty text='Seems like you have not liked anything so far' />
        </div>
      )}
    </>
  )
}

export default Favorites
