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

  const favoriteItems: IProcessedFurniture[] = []
  favorites.forEach((id) => {
    const item = furniture.find((item) => item.id === id)
    if (item) {
      favoriteItems.push(item)
    }
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
                <div className='sales__items sales__items--cart'>
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
