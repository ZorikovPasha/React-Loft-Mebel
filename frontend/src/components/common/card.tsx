import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Button } from './Button'
import { IProcessedFurniture, backendImagesLoader } from '../../utils'
import { useFavoriteProduct } from 'src/hooks/useFavoriteProduct'
import { useAddToCart } from 'src/hooks/useAddToCart'

interface IProps {
  product: IProcessedFurniture
  isFavorite: boolean
}

export const Card = React.memo(({ product, isFavorite }: IProps) => {
  const { id, image, name, type, priceOld, priceNew, dimensions, sale, rating, reviews, leftInStock } = product

  const { isProcessingRequest: isProcessingFavorite, likeProduct } = useFavoriteProduct(id)
  const { isProcessingRequest: isProcessingBuy, buy } = useAddToCart(product)

  let discount = null

  if (priceNew && priceOld && parseFloat(priceNew) < parseFloat(priceOld)) {
    discount = (((parseInt(priceOld) - parseInt(priceNew)) / parseInt(priceOld)) * 100).toFixed(0)
  }

  return (
    <div className='sales__item item-sales'>
      {sale && discount ? (
        <div className='item-sales__label label-sales'>
          <p className='label-sales__body'>-{discount}%</p>
        </div>
      ) : null}
      <Button
        title={isFavorite ? 'Unlike product' : 'Like product'}
        type='button'
        className='item-sales__like'
        disabled={isProcessingFavorite}
        onClick={likeProduct}
      >
        <img
          src={isFavorite ? '/images/icons/wished.svg' : '/images/icons/wish.svg'}
          alt=''
        />
      </Button>
      <div className='item-sales__box'>
        {image ? (
          <div className='item-sales__img'>
            <Image
              loader={backendImagesLoader}
              src={image.url}
              alt='furniture'
              layout='fill'
              placeholder='blur'
              blurDataURL={image.blurredBase64}
            />
          </div>
        ) : null}

        <Link href={`/products/${id}`}>
          <a className='item-sales__title'>{name}</a>
        </Link>
        <p className='item-sales__type'>{type}</p>
        <div className='item-sales__price'>
          {priceNew ? <p className='item-sales__price-new'>{priceNew}$</p> : null}
          {priceOld && sale ? <p className='item-sales__price-old'>{priceOld + '$'}</p> : null}
        </div>
        {dimensions && dimensions[0] ? (
          <div className='item-sales__bottom flex'>
            <div className='flex justify-start items-center width-full'>
              {reviews?.length ? (
                <img
                  className='block'
                  src='/images/icons/star-black.svg'
                  alt=''
                />
              ) : (
                <img
                  className='block'
                  src='/images/icons/star.svg'
                  alt=''
                />
              )}
              {reviews?.length ? <p className='ml-5'>{rating}</p> : null}
              <p className='ml-5'>({reviews?.length})</p>
            </div>
            <div className='item-sales__line'>
              <div className='item-sales__size'>
                <p className='item-sales__val'>Width</p>
                <p className='item-sales__num'>{dimensions[0].width} SM</p>
              </div>
              <div className='item-sales__size'>
                <p className='item-sales__val'>Length</p>
                <p className='item-sales__num'>{dimensions[0].length} SM</p>
              </div>
              <div className='item-sales__size'>
                <p className='item-sales__val'>Height</p>
                <p className='item-sales__num'>{dimensions[0].height} SM</p>
              </div>
            </div>
            {leftInStock > 0 ? (
              <Button
                className='item-sales__tocart btn'
                type='button'
                title='Add product to cart'
                disabled={isProcessingBuy}
                onClick={buy}
              >
                Add to cart
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
})

Card.displayName = 'Card'
