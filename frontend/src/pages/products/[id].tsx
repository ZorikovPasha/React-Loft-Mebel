import { useSelector } from 'react-redux'

import { ProductCard } from '../../components/Product/ProductCard'
import { Breadcrumbs } from '../../components/common/Breadcrumbs'
import { ProductTabs } from '../../components/Product/ProductTabs'
import { getUserData } from '../../redux/getters'
import { Card } from '../../components/common/card'
import { ROUTES } from '../../utils/const'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { IProcessedFurniture, sanitizeFurnitureItem } from '../../utils'
import { PublicApiClient } from '../../api'
import { isDataOfFurniture } from '../../api/types'
import { revalidate } from '../../utils/const'

interface IProps {
  pageData: {
    current: IProcessedFurniture
    allFurniture: IProcessedFurniture[]
  }
}

const Product: NextPage<IProps> = ({ pageData }) => {
  const { current, allFurniture } = pageData
  const { favorites } = useSelector(getUserData)

  const topSales = allFurniture.filter((item) =>
    typeof item.rating === 'string' ? parseFloat(item.rating) > 4.5 : false
  )
  const youMayAlsoLike = allFurniture.filter((item) => item.type === current?.type && item.id !== current.id)

  const breads = [
    { name: 'Catalog', href: ROUTES.Catalog, isLink: true },
    { name: current.room ?? '', href: `/catalog?room=${current.room}`, isLink: true },
    { name: current.type ?? '', href: `/catalog?type=${current.type}`, isLink: true }
  ]

  return (
    <>
      <Breadcrumbs breadcrumbs={breads} />
      <ProductCard product={current} />
      <ProductTabs product={current} />

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
  )
}

type PType = { params: { id: string } }

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await PublicApiClient.getFurniture('')

    if (isDataOfFurniture(res)) {
      return {
        paths: res.all.reduce((accum: PType[], next) => accum.concat({ params: { id: String(next.id) } }), []),
        fallback: false
      }
    } else {
      return {
        paths: [],
        fallback: false
      }
    }
  } catch (error) {
    return {
      paths: [],
      fallback: false
    }
  }
}

export const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
  const id = Array.isArray(params) ? params[0].id : params?.id

  console.log('id', id, typeof id)

  if (typeof id === 'undefined' || typeof id !== 'string') {
    return {
      notFound: true
    }
  }

  let allProducts: IProcessedFurniture[] = []
  try {
    const furniture = await PublicApiClient.getFurniture('')
    if (isDataOfFurniture(furniture)) {
      allProducts = furniture.all.map(sanitizeFurnitureItem)
    }
  } catch (error) {
    console.log('error')
  }

  const currentPageData = allProducts.find((product) => product.id === Number(id))

  if (typeof currentPageData === 'undefined') {
    return {
      notFound: true
    }
  }

  return {
    props: {
      pageData: {
        current: currentPageData,
        allFurniture: allProducts
      }
    },
    revalidate
  }
}

export default Product
