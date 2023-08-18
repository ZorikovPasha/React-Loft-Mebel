import React from 'react'
import { useSelector } from 'react-redux'

import { getProducts, getUserData } from '../redux/getters'
import { useBreadcrumbs } from '../hooks/useBreadcrumbs'
import { SalesItem } from '../components/common/SalesItem'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Empty } from '../components/common/Empty'
import { IFurniture } from '../api/types'

const Favorites: React.FC = () => {
  const breadcrumbs = useBreadcrumbs()

  const items = useSelector(getProducts)

  const { favorites } = useSelector(getUserData)

  const favoriteItems: IFurniture[] = []
  favorites.forEach((id) => {
    const item = items.find((item) => item.id === id)
    if (item) {
      favoriteItems.push(item)
    }
  })

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
                <SalesItem
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
          <Empty text='Вам ничего не понравилось(' />
        </div>
      )}
    </>
  )
}

export default Favorites
