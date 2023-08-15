import React from 'react'
import { useParams } from 'react-router-dom'

import { useBreadcrumbs } from '../hooks/useBreadcrumbs'
import { UserApiClient } from '../api'
import { ProductCard } from '../components/Product/ProductCard'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { ProductTabs } from '../components/Product/ProductTabs'
import { Related } from '../components/Product/Related'
import { IFurniture } from '../api/types'

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const [currentProduct, setCurrentProduct] = React.useState<IFurniture>()
  const breadcrumbs = useBreadcrumbs()

  React.useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    UserApiClient.getOneFurniture(id, signal).then((data) => setCurrentProduct(data))
    return (): void => controller.abort()
  }, [id])

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
