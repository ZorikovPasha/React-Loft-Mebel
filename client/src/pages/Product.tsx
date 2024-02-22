import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ProductCard } from '../components/Product/ProductCard'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { ProductTabs } from '../components/Product/ProductTabs'
import { getProducts, getUserData } from '../redux/getters'
import { Card } from '../components/common/card'
import { Empty } from '../components/common/Empty'
import { Page404 } from './404'
import { ROUTES } from '../utils/const'

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const products = useSelector(getProducts)
  const { favorites } = useSelector(getUserData)

  const currentProduct = products.find((p) => p.id === Number(id))

  const topSales = products.filter((item) => parseFloat(item.rating) > 4.5)

  const breads = [
    { name: 'Catalog', href: ROUTES.Catalog, isLink: true },
    { name: currentProduct?.room ?? '', href: '', isLink: true },
    { name: currentProduct?.type ?? '', href: '', isLink: true }
  ]

  return currentProduct ? (
    <>
      <Breadcrumbs breadcrumbs={breads} />
      <ProductCard product={currentProduct} />
      <ProductTabs product={currentProduct} />

      <section className='sales'>
        <div className='container'>
          <h3 className='sales__title'>Top sales</h3>
          {topSales.length ? (
            <div className='sales__items sales__items--product mt-30'>
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
