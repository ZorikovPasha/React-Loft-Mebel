import React from 'react'
import { useSelector } from 'react-redux'
import { GetStaticProps, NextPage } from 'next'

import { getUserData } from '../redux/getters'
import { useBreadcrumbs } from '../hooks/useBreadcrumbs'
import { Card } from '../components/common/card'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Empty } from '../components/common/Empty'
import { IProcessedFurniture, sanitizeFurnitureItem } from '../utils'
import { PublicApiClient } from '../api'
import { isDataOfFurniture } from '../api/types'
import { revalidate } from '../utils/const'
import Head from 'next/head'

interface IProps {
  pageData: {
    furniture: IProcessedFurniture[]
  }
}

const Favorites: NextPage<IProps> = ({ pageData }) => {
  const { furniture } = pageData
  const breadcrumbs = useBreadcrumbs()

  const { favorites, isLoggedIn } = useSelector(getUserData)

  const youMayAlsoLike: IProcessedFurniture[] = []
  const favoriteItems: IProcessedFurniture[] = []
  favorites.forEach((id) => {
    const item = furniture.find((item) => item.id === id)
    if (!item) {
      return
    }
    favoriteItems.push(item)
    const productsOfSimilarType = furniture.filter((f) => f.type === item.type && f.id !== item.id)
    if (productsOfSimilarType.length <= 0) {
      return
    }
    productsOfSimilarType.forEach((product) => {
      const isProductAlreadyFound = youMayAlsoLike.find((f) => f.id === product.id)
      if (isProductAlreadyFound) {
        return
      }
      youMayAlsoLike.push(product)
    })
  })

  return (
    <>
      <Head>
        <title>Your favorite furniture</title>
        <meta
          name='description'
          content='Loft furniture for your slick modern designes'
        />
      </Head>

      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {isLoggedIn ? (
        <>
          <section>
            <div className='container'>
              <div className='cart__top'>
                <p className='cart__bottom-total'>You liked:</p>
                <p className='cart__bottom-total'>Total: {favorites?.length}</p>
              </div>
            </div>
          </section>
          {favorites.length ? (
            <section className='mt-40'>
              <div className='container'>
                <div className='sales__items'>
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
              <Empty text='There is nothing in here('></Empty>
            </div>
          )}
        </>
      ) : (
        <div className='container'>
          <Empty text='There is nothing in here('>
            <p className='favorites__empty-p mt-20'>Please login to see what you liked</p>
          </Empty>
        </div>
      )}

      {isLoggedIn && youMayAlsoLike.length ? (
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

export const getStaticProps: GetStaticProps<IProps> = async () => {
  let allProducts: IProcessedFurniture[] = []
  try {
    const furniture = await PublicApiClient.getFurniture('')
    if (isDataOfFurniture(furniture)) {
      allProducts = furniture.all.map(sanitizeFurnitureItem)
    }
  } catch (error) {
    console.log('error')
  }

  return {
    props: {
      pageData: {
        furniture: allProducts
      }
    },
    revalidate
  }
}

export default Favorites
