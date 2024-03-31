import { useSelector } from 'react-redux'
import Link from 'next/link'

import { getUserData } from '../redux/getters'
import { TopSlider } from '../components/Main/TopSlider'
import { Card } from '../components/common/card'
import { IProcessedFurniture, sanitizeFurnitureItem } from '../utils'
import { GetStaticProps, NextPage } from 'next'
import { PublicApiClient } from '../api'
import { isDataOfFurniture } from '../api/types'
import { revalidate } from '../utils/const'

interface IProps {
  pageData: {
    furniture: IProcessedFurniture[]
  }
}

const Main: NextPage<IProps> = ({ pageData }) => {
  const { furniture } = pageData
  const { favorites } = useSelector(getUserData)
  const topSales = furniture.filter((item) => (typeof item.rating === 'string' ? parseFloat(item.rating) > 4.5 : false))

  return (
    <div className='home container'>
      <div className='home__top top'>
        <TopSlider />
      </div>
      <div className='home__promo flex justify-center items-center relative'>
        <video
          className='home__promo-video'
          autoPlay
          muted
          loop
          preload='auto'
        >
          <source src='/images/promo.mp4' />
        </video>
        <div className='home__promo-content'>
          <p className='home__promo-text'>New aestetic collection for your homes.</p>
          <p className='home__promo-label'>Explore now</p>
        </div>
      </div>
      <div className='home__gallery gallery'>
        <div className='gallery__inner'>
          <div className='gallery__items'>
            <div className='gallery__item'>
              <img
                className='gallery__item-img'
                src='images/gallery/1.jpg'
                alt=''
              />
              <Link href='/catalog?room=hall'>
                <a className='gallery__item-link'>Explore halls</a>
              </Link>
            </div>
            <div className='gallery__item'>
              <img
                className='gallery__item-img'
                src='images/gallery/2.jpg'
                alt=''
              />
              <Link href='/catalog?room=office'>
                <a className='gallery__item-link'>Explore office furniture</a>
              </Link>
            </div>
            <div className='gallery__item'>
              <img
                className='gallery__item-img'
                src='images/gallery/3.jpg'
                alt=''
              />
              <Link href='/catalog?room=kitchen'>
                <a className='gallery__item-link'>Explore kitchens</a>
              </Link>
            </div>
            <div className='gallery__item'>
              <img
                className='gallery__item-img'
                src='images/gallery/4.jpg'
                alt=''
              />
              <Link href='/catalog?room=living'>
                <a className='gallery__item-link'>Explore living rooms</a>
              </Link>
            </div>
            <div className='gallery__item'>
              <img
                className='gallery__item-img'
                src='images/gallery/5.jpg'
                alt=''
              />
              <Link href='/catalog?room=bedroom'>
                <a className='gallery__item-link'>Explore bedroom furniture</a>
              </Link>
            </div>
          </div>
        </div>
      </div>

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
    </div>
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

export default Main
