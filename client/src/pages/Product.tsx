import React from 'react'
import { useParams } from 'react-router-dom'

import { useBreadcrumbs } from '../hooks/useBreadcrumbs'
import { ProductCard } from '../components/Product/ProductCard'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { ProductTabs } from '../components/Product/ProductTabs'
import { useSelector } from 'react-redux'
import { getProducts, getUserData } from '../redux/getters'
import { SalesItem } from '../components/common/SalesItem'

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const products = useSelector(getProducts)
  const { favorites } = useSelector(getUserData)

  const breadcrumbs = useBreadcrumbs()

  const currentProduct = products.find((p) => p.id === Number(id))

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {currentProduct && <ProductCard product={currentProduct} />}
      {currentProduct && <ProductTabs />}

      <section className='sales'>
        <div className='container'>
          <h3 className='sales__title'>Хиты продаж</h3>
          <div className='sales__items sales__items--product'>
            {products
              .filter((item) => parseFloat(item.rating) > 4.1)
              .map((product) => (
                <SalesItem
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Product
