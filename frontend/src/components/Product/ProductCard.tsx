import React from 'react'
import Slider, { Settings } from 'react-slick'
import { useSelector } from 'react-redux'
import Link from 'next/link'

import { AddToFavorite } from '../common/AddToFavorite'
import CustomSelect from '../common/CustomSelect'
import { getUserData } from '../../redux/getters'
import { Button } from '../common/Button'
import { Modal } from '../common/Modal'
import { ModalContent } from './leaveReviewPopup'
import { IProcessedFurniture, collectQuintityOptions } from '../../utils'
import { useAddToCart } from 'src/hooks/useAddToCart'

const SliderPrevArrow = () => (
  <Button
    className='slick-btn slick-prev'
    title='Previous slide'
    type='button'
  >
    <svg
      width='9'
      height='14'
      viewBox='0 0 9 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.5 1L1.5 7L7.5 13'
        stroke='black'
        strokeLinecap='square'
      />
    </svg>
  </Button>
)

const SliderNextArrow = () => (
  <Button
    className='slick-btn slick-next'
    type='button'
    title='Next slide'
  >
    <svg
      width='8'
      height='14'
      viewBox='0 0 8 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1 13L7 7L1 1'
        stroke='black'
        strokeLinecap='square'
      />
    </svg>
  </Button>
)

const slider1Settings: Settings = {
  arrows: false,
  fade: true,
  swipe: false
}

const slider2Settings: Settings = {
  variableWidth: true,
  infinite: false,
  focusOnSelect: true,
  prevArrow: <SliderPrevArrow />,
  nextArrow: <SliderNextArrow />,
  responsive: [
    {
      breakpoint: 511,
      settings: {
        arrows: false
      }
    }
  ]
}

type ColorOptionType = {
  value: string
  label: string
}

interface IProps {
  product: IProcessedFurniture
}

const formatDimension = (width: number, length: number, height: number) => {
  return `${width} SM × ${length} SM × ${height} SM`
}

export const ProductCard = ({ product }: IProps) => {
  const user = useSelector(getUserData)
  const { id, name, type, priceNew, priceOld, colors, dimensions, image, rating, description, reviews, leftInStock } =
    product

  const isItemOnSale =
    typeof priceNew === 'string' && typeof priceOld === 'string' && parseFloat(priceNew) < parseFloat(priceOld)

  const didCurrentUserReviewedThisFurniture = Boolean(reviews?.find((r) => (r.user ? r.user.id === user.id : false)))

  const thumbsUrls = image ? [image.url, image.url, image.url, image.url, image.url] : []

  const fields = {
    quintity: {
      label: 'Quintity',
      value: '1',
      options: collectQuintityOptions(leftInStock)
    },
    dimensions: {
      label: 'Dimensions (W × L × H)',
      value: dimensions[0] ? formatDimension(dimensions[0].width, dimensions[0].length, dimensions[0].height) : '',
      options:
        dimensions?.map((d) => ({
          value: formatDimension(d.width, d.length, d.height),
          label: formatDimension(d.width, d.length, d.height)
        })) ?? []
    }
  }

  const colorProps = {
    label: 'Color',
    value: colors[0],
    options: colors
  }

  const [nav1, setNav1] = React.useState<Slider>()
  const [nav2, setNav2] = React.useState<Slider>()
  const [form, setForm] = React.useState(fields)
  const [colorsState, setColorsState] = React.useState(colorProps)
  const [reviewModelShown, setReviewModelShown] = React.useState(false)
  const ratingWidth = typeof rating === 'string' ? (parseFloat(rating) / 5) * 95 : 0
  const { isProcessingRequest: isProcessingBuy, buy } = useAddToCart(product, parseInt(form.quintity.value))

  const onSelect = (name: 'quintity' | 'dimensions') => (value: ColorOptionType | null) => {
    setForm((prev) => {
      const props = prev[name]
      if (!props) {
        return prev
      }
      return {
        ...prev,
        [name]: Object.assign(props, {
          value: value?.value ?? ''
        })
      }
    })
  }

  const onColor = (color: string) => () => {
    setColorsState((prev) => ({
      ...prev,
      value: color
    }))
  }

  const onReviewModalClose = () => {
    setReviewModelShown(false)
    document.body.classList.remove('locked')
  }

  const openReviewModal = () => {
    document.body.classList.add('locked')
    setReviewModelShown(true)
  }

  return (
    <section className='product'>
      {reviewModelShown && typeof id === 'number' && (
        <Modal
          content={
            <ModalContent
              furnitureId={id}
              onModalClose={onReviewModalClose}
            />
          }
          onModalClose={onReviewModalClose}
        />
      )}

      <div className='container'>
        <div className='product__inner grid'>
          <div>
            <Slider
              className='product__slider'
              asNavFor={nav2}
              ref={(slider1: Slider): void => setNav1(slider1)}
              {...slider1Settings}
            >
              {thumbsUrls.map((url) => (
                <div
                  className='product__slider-item'
                  key={url}
                >
                  <img
                    src={process.env.NEXT_PUBLIC_BACKEND + url}
                    alt='furniture'
                  />
                </div>
              ))}
            </Slider>
            <Slider
              className='product__thumbs'
              asNavFor={nav1}
              ref={(slider2: Slider): void => setNav2(slider2)}
              {...slider2Settings}
            >
              {thumbsUrls.map((url) => (
                <div
                  className='product__thumb'
                  key={url}
                >
                  <img
                    src={process.env.NEXT_PUBLIC_BACKEND + url}
                    alt='furniture thumb'
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className='info'>
            <h1 className='info__title'>{name}</h1>
            <p className='info__category'>
              <Link href={`/catalog?type=${type}`}>{type}</Link>
            </p>
            <div className='flex items-center'>
              {reviews?.length ? (
                <div className='flex info__rating-parent'>
                  <img
                    className='info__rating-img'
                    src='/images/icons/star.svg'
                    alt=''
                  />
                  <img
                    className='info__rating-img'
                    src='/images/icons/star.svg'
                    alt=''
                  />
                  <img
                    className='info__rating-img'
                    src='/images/icons/star.svg'
                    alt=''
                  />
                  <img
                    className='info__rating-img'
                    src='/images/icons/star.svg'
                    alt=''
                  />
                  <img
                    className='info__rating-img'
                    src='/images/icons/star.svg'
                    alt=''
                  />

                  <div
                    style={{ width: ratingWidth }}
                    className='flex info__rating-child'
                  >
                    <img
                      className='info__rating-img'
                      src='/images/icons/star-black.svg'
                      alt=''
                    />
                    <img
                      className='info__rating-img'
                      src='/images/icons/star-black.svg'
                      alt=''
                    />
                    <img
                      className='info__rating-img'
                      src='/images/icons/star-black.svg'
                      alt=''
                    />
                    <img
                      className='info__rating-img'
                      src='/images/icons/star-black.svg'
                      alt=''
                    />
                    <img
                      className='info__rating-img'
                      src='/images/icons/star-black.svg'
                      alt=''
                    />
                  </div>
                </div>
              ) : (
                <img
                  className='info__rating-img'
                  src='/images/icons/star.svg'
                  alt=''
                />
              )}
              <p className='ml-5'>({reviews?.length ?? 0})</p>
            </div>
            <form className='mt-10'>
              <div className='info__shop shop'>
                <p className='shop__price'>{priceNew ? priceNew : priceOld}$</p>
                {isItemOnSale ? <p className='shop__price crossed'>${priceOld}</p> : null}
                <Button
                  className='shop__btn btn'
                  title='Buy product'
                  type='button'
                  disabled={isProcessingBuy}
                  onClick={buy}
                >
                  Buy
                </Button>
                {typeof id === 'number' ? <AddToFavorite id={id} /> : null}
              </div>

              <div className='mt-10'>
                <p className='features__title'>{form.dimensions.label}</p>
                <CustomSelect
                  value={form.dimensions.value}
                  options={form.dimensions.options}
                  onChange={onSelect('dimensions')}
                />
              </div>

              <div className='info__features flex items-end mt-10'>
                <div style={{ minWidth: 90 }}>
                  <p className='features__title'>{form.quintity.label}</p>
                  <CustomSelect
                    value={form.quintity.value}
                    options={form.quintity.options}
                    onChange={onSelect('quintity')}
                  />
                </div>

                <p className='product__left'>
                  Left: <b>{leftInStock}</b>
                </p>
              </div>
              <div className='product__colors colors mt-20'>
                {colorsState.options.map((color) => (
                  <label
                    className='colors__item'
                    key={color}
                  >
                    <input
                      className='colors__checkbox-real'
                      id={color}
                      type='checkbox'
                      checked={colorsState.value?.includes(color) ?? false}
                      onChange={onColor(color)}
                    />
                    <span
                      className='colors__checkbox-fake'
                      style={{ backgroundColor: color }}
                    ></span>
                  </label>
                ))}
              </div>
            </form>
            <p className='info__text mt-20'>{description}</p>

            {user.isLoggedIn && !didCurrentUserReviewedThisFurniture && (
              <Button
                className='shop__btn--plain btn-hollow mt-20'
                title='Leave review'
                type='button'
                onClick={openReviewModal}
              >
                <>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M6.69401 14.432C6.63711 14.4889 6.5989 14.5613 6.58264 14.6393L6.00793 17.5139C5.9811 17.6472 6.02337 17.7846 6.11929 17.8813C6.19652 17.9585 6.30057 18 6.40706 18C6.43307 18 6.4599 17.9976 6.48672 17.9919L9.3603 17.4171C9.43996 17.4009 9.51231 17.3627 9.5684 17.3057L16 10.8738L13.1264 8L6.69401 14.432Z'
                      fill='#414141'
                    />
                    <path
                      d='M18.3523 5.6471C17.4896 4.7843 16.0864 4.7843 15.2246 5.6471L14 6.87182L17.1278 10L18.3523 8.77528C18.77 8.35848 19 7.80275 19 7.21163C19 6.6205 18.77 6.06478 18.3523 5.6471Z'
                      fill='#414141'
                    />
                  </svg>
                  Leave review
                </>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
