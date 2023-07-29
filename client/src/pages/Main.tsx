import React from 'react'
import { Link } from 'react-router-dom'

import { TopSlider } from '../Components'
import '../scss/style.scss'

const Main: React.FC = () => {
  return (
    <>
      <div className='container'>
        <div className='home__top top'>
          <TopSlider />
        </div>
        <div className='home__promo'>
          <video
            className='home__promo-video'
            autoPlay
            muted
            loop
            preload='auto'
          >
            <source src='../images/promo.mp4' />
          </video>
          <div className='home__promo-content'>
            <p className='home__promo-text'>Новый коллекция ярких решений для вашего интерьера.</p>
            <p className='home__promo-label'>Украсьте вашу жизнь</p>
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
                  to='/catalog?room=bedroom'
                >
                  Перейти к гостинной мебели
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
                  Перейти к офисным креслам
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
                  Перейти к кухонным уголкам
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
                  Перейти к модульным гостинным
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
                  Перейти к спальным гарнитурам
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main
