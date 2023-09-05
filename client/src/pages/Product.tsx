import React from 'react'
import { useParams } from 'react-router-dom'

import { useBreadcrumbs } from '../hooks/useBreadcrumbs'
import { ProductCard } from '../components/Product/ProductCard'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { ProductTabs } from '../components/Product/ProductTabs'
import { useSelector } from 'react-redux'
import { getProducts, getUserData } from '../redux/getters'
import { Card } from '../components/common/card'
import { Empty } from '../components/common/Empty'
import { Page404 } from './404'

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const products = useSelector(getProducts)
  const { favorites } = useSelector(getUserData)

  const breadcrumbs = useBreadcrumbs()

  const currentProduct = products.find((p) => p.id === Number(id))

  const topSales = products.filter((item) => parseFloat(item.rating) > 4.1)

  return currentProduct ? (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {currentProduct && <ProductCard product={currentProduct} />}
      {currentProduct && <ProductTabs product={currentProduct} />}

      <section className='sales'>
        <div className='container'>
          <h3 className='sales__title'>Top sales</h3>
          {topSales.length ? (
            <div className='sales__items sales__items--product'>
              {topSales.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                />
              ))}
            </div>
          ) : (
            <Empty text='Seems like nothing in here..' />
          )}
        </div>
      </section>
    </>
  ) : (
    <Page404 />
  )
}

export default Product
