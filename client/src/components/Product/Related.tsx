import React from 'react'
import { useSelector } from 'react-redux'

import { SalesItem } from '../common/SalesItem'
import { getProducts, getFavorites } from '../../redux/getters'

export const Related: React.FC = () => {
  const items = useSelector(getProducts)
  const { favorites } = useSelector(getFavorites)

  return (
    <div className='sales__items sales__items--product'>
      {items
        .filter((item) => parseFloat(item.rating) > 4.1)
        .map((product) => (
          <SalesItem
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
          />
        ))}
    </div>
  )
}
