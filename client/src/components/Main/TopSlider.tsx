import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'

import { ApiClient } from '../../services/api'
import { SlideType } from '../../types'

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

const TopSlider: React.FC = () => {
  const [slides, setSlides] = React.useState<SlideType[]>([])
  const [slider, setSlider] = React.useState<Slider>()

  React.useEffect(() => {
    ApiClient.get<SlideType[]>('/api/slides').then((data) => setSlides(data))
  }, [])

  const settings = {
    fade: true,
    infinite: true,
    autoplay: true,
    prevArrow: <SliderPrevArrow onClick={slider?.slickPrev} />,
    nextArrow: <SliderNextArrow onClick={slider?.slickNext} />,
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
      {...settings}
      className={`top__slider ${!slides?.length ? 'top__slider--fullsize' : ''}`}
      ref={(slider: Slider) => setSlider(slider)}
    >
      {slides?.length &&
        slides?.map(({ title, imageUrl, subtitle }, idx) => (
          <div
            key={idx}
            className='top__slider-item'
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            <div className='top__slider-box'>
              <h1 className='top__title'>{title}</h1>
              <p className='top__subtitle'>{subtitle}</p>
              <Link
                className='top__btn'
                to='/catalog/kitchens'
              >
                Смотреть каталог
              </Link>
            </div>
          </div>
        ))}
    </Slider>
  )
}

export default TopSlider
