import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ProductCard } from '../components/Product/ProductCard'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { ProductTabs } from '../components/Product/ProductTabs'
import { getProducts, getUserData } from '../redux/getters'
import { Card } from '../components/common/card'
import { Page404 } from './404'
import { ROUTES } from '../utils/const'

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const products = useSelector(getProducts)
  const { favorites } = useSelector(getUserData)

  const currentProduct = products.find((p) => p.id === Number(id))

  const topSales = products.filter((item) => (typeof item.rating === 'string' ? parseFloat(item.rating) > 4.5 : false))
  const youMayAlsoLike = products.filter((item) => item.type === currentProduct?.type)

  const breads = [
    { name: 'Catalog', href: ROUTES.Catalog, isLink: true },
    { name: currentProduct?.room ?? '', href: `/catalog?room=${currentProduct?.room}`, isLink: true },
    { name: currentProduct?.type ?? '', href: `/catalog?type=${currentProduct?.type}`, isLink: true }
  ]

  React.useEffect(() => {
    window.scroll({ top: 0 })
  }, [id])

  return currentProduct ? (
    <>
      <Breadcrumbs breadcrumbs={breads} />
      <ProductCard product={currentProduct} />
      <ProductTabs product={currentProduct} />

      {topSales.length ? (
        <section className='mt-60'>
          <div className='container'>
            <h3 className='sales__title'>Top sales</h3>
            <div className='sales__items sales__items--product mt-30'>
              {topSales.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  isFavorite={typeof product.id === 'number' ? favorites.includes(product.id) : false}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {youMayAlsoLike.length ? (
        <section className='mt-60'>
          <div className='container'>
            <h3 className='sales__title'>You may also like</h3>
            <div className='sales__items sales__items--product mt-30'>
              {youMayAlsoLike.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  isFavorite={typeof product.id === 'number' ? favorites.includes(product.id) : false}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  ) : (
    <Page404 />
  )
}

export default Product
