import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'

export type Text = {
  title: string
  subtitle: string
  imageUrl: string
}

export const TopSlider: React.FC = () => {
  const slides = [
    {
      title: 'Living rooms',
      imageUrl: '/images/top-bg-1.jpg',
      link: '/catalog?room=living'
    },
    {
      title: 'Kitchens',
      imageUrl: '/images/top-bg-2.jpg',
      link: '/catalog?room=kitchen'
    },
    {
      title: 'Bedrooms',
      imageUrl: '/images/top-bg-3.jpg',
      link: '/catalog?room=bedroom'
    }
  ]

  const sliderRef = React.useRef<Slider | null>(null)

  const settings = {
    loop: true,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 511,
        settings: {
          arrows: false
        }
      }
    ]
  }

  return (
    <Slider
      ref={sliderRef}
      {...settings}
      className={`top__slider ${!slides?.length ? 'top__slider--fullsize' : ''}`}
    >
      {slides.map(({ title, imageUrl, link }) => (
        <div
          className='top__slider-item-wrap'
          key={title}
        >
          <div
            className='top__slider-item'
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            <div className='top__slider-box'>
              <h1 className='top__title'>{title}</h1>
              <Link
                className='btn'
                to={link}
              >
                Go to catalog
              </Link>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  )
}
