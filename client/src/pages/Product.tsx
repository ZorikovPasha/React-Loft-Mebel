import React from 'react'
import { useParams } from 'react-router-dom'

import { useBreadcrumbs } from '../hooks/useBreadcrumbs'
import { ProductCard } from '../components/Product/ProductCard'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { ProductTabs } from '../components/Product/ProductTabs'
import { Related } from '../components/Product/Related'
import { useSelector } from 'react-redux'
import { getProducts } from '../redux/getters'

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const products = useSelector(getProducts)

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
          <Related />
        </div>
      </section>
    </>
  )
}

export default Product
