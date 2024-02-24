import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getProducts, getUserData } from '../redux/getters'
import { TopSlider } from '../components/Main/TopSlider'
import { Card } from '../components/common/card'

export const Main: React.FC = () => {
  const products = useSelector(getProducts)
  const { favorites } = useSelector(getUserData)
  const topSales = products.filter((item) => (typeof item.rating === 'string' ? parseFloat(item.rating) > 4.5 : false))

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
              <Link
                className='gallery__item-link'
                to='/catalog?room=hall'
              >
                Explore halls
              </Link>
            </div>
            <div className='gallery__item'>
              <img
                className='gallery__item-img'
                src='images/gallery/2.jpg'
                alt=''
              />
              <Link
                className='gallery__item-link'
                to='/catalog?room=office'
              >
                Explore office furniture
              </Link>
            </div>
            <div className='gallery__item'>
              <img
                className='gallery__item-img'
                src='images/gallery/3.jpg'
                alt=''
              />
              <Link
                className='gallery__item-link'
                to='/catalog?room=kitchen'
              >
                Explore kitchens
              </Link>
            </div>
            <div className='gallery__item'>
              <img
                className='gallery__item-img'
                src='images/gallery/4.jpg'
                alt=''
              />
              <Link
                className='gallery__item-link'
                to='/catalog?room=living'
              >
                Explore living rooms
              </Link>
            </div>
            <div className='gallery__item'>
              <img
                className='gallery__item-img'
                src='images/gallery/5.jpg'
                alt=''
              />
              <Link
                className='gallery__item-link'
                to='/catalog?room=bedroom'
              >
                Explore bedroom furniture
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

export default Main
