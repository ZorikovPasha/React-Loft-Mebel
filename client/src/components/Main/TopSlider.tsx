import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'

interface IArrowProps {
  onClick: (() => void) | undefined
}

const SliderPrevArrow: React.FC<IArrowProps> = ({ onClick }) => {
  return (
    <button
      type='button'
      className='slick-btn slick-prev'
      onClick={onClick}
    >
      <svg
        width='30'
        height='30'
        viewBox='0 0 30 30'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M30 0H0V30H30V0ZM12.2929 18.2929L11.5858 19L13 20.4142L13.7071 19.7071L17.7071 15.7071L18.4142 15L17.7071 14.2929L13.7071 10.2929L13 9.58579L11.5858 11L12.2929 11.7071L15.5858 15L12.2929 18.2929Z'
          fill='white'
        />
      </svg>
    </button>
  )
}

const SliderNextArrow: React.FC<IArrowProps> = ({ onClick }) => {
  return (
    <button
      type='button'
      className='slick-btn slick-next'
      onClick={onClick}
    >
      <svg
        width='30'
        height='30'
        viewBox='0 0 30 30'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M30 0H0V30H30V0ZM12.2929 18.2929L11.5858 19L13 20.4142L13.7071 19.7071L17.7071 15.7071L18.4142 15L17.7071 14.2929L13.7071 10.2929L13 9.58579L11.5858 11L12.2929 11.7071L15.5858 15L12.2929 18.2929Z'
          fill='white'
        />
      </svg>
    </button>
  )
}

export type Text = {
  title: string
  subtitle: string
  imageUrl: string
}

export const TopSlider: React.FC = () => {
  const slides = [
    {
      title: 'Гостинные',
      imageUrl: '/images/top-bg-1.jpg'
    },
    {
      title: 'Кухни',
      imageUrl: '/images/top-bg-2.jpg'
    },
    {
      title: 'Спальни',
      imageUrl: '/images/top-bg-3.jpg'
    }
  ]

  const sliderRef = React.useRef<Slider | null>(null)

  const settings = {
    loop: true,
    autoplay: true,
    prevArrow: <SliderPrevArrow onClick={sliderRef.current?.slickPrev} />,
    nextArrow: <SliderNextArrow onClick={sliderRef.current?.slickNext} />,
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
      className={`${!slides?.length ? 'top__slider--fullsize' : ''}`}
    >
      {slides.map(({ title, imageUrl }) => (
        <div key={title}>
          <div
            className='top__slider-item'
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            <div className='top__slider-box'>
              <h1 className='top__title'>{title}</h1>
              <Link
                className='top__btn'
                to='/catalog/kitchens'
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
