import React from 'react'
import { Link } from 'react-router-dom'

import { TopSlider } from '../components/Main/TopSlider'

export const Main: React.FC = () => {
  return (
    <div className='container'>
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
    </div>
  )
}

export default Main
