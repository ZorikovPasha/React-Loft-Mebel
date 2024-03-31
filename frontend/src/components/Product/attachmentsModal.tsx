import Slider from 'react-slick'
import React from 'react'

import { SliderArrowLeft } from '../../svg/arrow-prev'
import { SliderArrowNext } from '../../svg/arrow-next'
import { IImage } from '../../../../server/src/furniture/types'

interface IProps {
  pictures: IImage[]
}

export const AttachmentsPopupBody = ({ pictures }: IProps) => {
  const sliderRef = React.useRef<Slider>(null)

  const [activeSlide, setActiveSlide] = React.useState(1)

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    swipe: true,
    beforeChange: (_: number, next: number) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 767,
        settings: {
          variableWidth: false
        }
      }
    ]
  }

  const next = () => {
    sliderRef.current?.slickNext()
  }

  const previous = () => {
    sliderRef.current?.slickPrev()
  }

  const isActiveSlideFirst = activeSlide === 0
  const isActiveSlideLast = activeSlide === pictures.length - 1

  return (
    <div className='h100 product-tabs__slider'>
      <Slider
        ref={sliderRef}
        {...settings}
      >
        {pictures.map(({ url }) => (
          <div
            className='product-tabs__review-attach-wrap relative h100'
            key={url}
          >
            <img
              className='product-tabs__review-attach-big'
              src={process.env.NEXT_PUBLIC_BACKEND + url}
              alt=''
            />
          </div>
        ))}
      </Slider>

      {pictures.length > 1 ? (
        <div className='product-tabs__slider-arrows flex justify-between items-center mt-20'>
          <button
            type='button'
            className='product-tabs__slider-arrow'
            disabled={isActiveSlideFirst}
            onClick={previous}
          >
            <SliderArrowLeft fill={isActiveSlideFirst ? '#BCBCBC' : undefined} />
          </button>
          <button
            type='button'
            className='product-tabs__slider-arrow'
            disabled={isActiveSlideLast}
            onClick={next}
          >
            <SliderArrowNext fill={isActiveSlideLast ? '#BCBCBC' : undefined} />
          </button>
        </div>
      ) : null}
    </div>
  )
}
