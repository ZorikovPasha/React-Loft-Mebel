import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'

import { UserApiClient } from '../../api'
import { isSuccessfullResponse } from '../../api/types'
import { getUserData } from '../../redux/getters'
import { addProductToCartActionCreator, editUserActionCreator } from '../../redux/actions/userAction'
import { toggleSnackbarOpen } from '../../redux/actions/errors'
import { Button } from './Button'
import { IProcessedFurniture, backendImagesLoader } from '../../utils'

interface IProps {
  product: IProcessedFurniture
  isFavorite: boolean
}

const convertImage = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#FFF" offset="20%" />
      <stop stop-color="#FFF" offset="50%" />
      <stop stop-color="#FFF" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#FFF" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)

export const Card = React.memo(({ product, isFavorite }: IProps) => {
  const { id, image, name, type, priceOld, priceNew, dimensions, sale, colors, rating, reviews } = product

  const dispatch = useDispatch()
  const { isLoggedIn, favorites } = useSelector(getUserData)

  const onLikeProductClick = (isLoggedIn: boolean) => async () => {
    if (!isLoggedIn) {
      return dispatch(toggleSnackbarOpen('You are not logged in. Please login.', 'warning'))
    }

    if (id === null) {
      return
    }

    const payload = {
      favorites: [id]
    }

    if (favorites.includes(id)) {
      try {
        const response = await UserApiClient.deleteFavoriteItem(id)
        if (!response || !isSuccessfullResponse(response)) {
          return dispatch(toggleSnackbarOpen())
        }

        dispatch(editUserActionCreator(payload))
      } catch (error) {
        dispatch(toggleSnackbarOpen())
      }
    } else {
      try {
        const response = await UserApiClient.addFavoriteItem(id)
        if (!response || !isSuccessfullResponse(response)) {
          return dispatch(toggleSnackbarOpen())
        }

        dispatch(editUserActionCreator(payload))
      } catch (error) {
        dispatch(toggleSnackbarOpen())
      }
    }
  }

  const onAddToCartClick = async () => {
    if (!isLoggedIn) {
      return dispatch(toggleSnackbarOpen('You are not logged in. Please login.', 'warning'))
    }

    if (typeof id !== 'number') {
      return
    }

    try {
      const dto = {
        productId: id,
        quintity: 1,
        color: colors[0] ?? '#FFF'
      }

      const response = await UserApiClient.addItemToCart(dto)

      if (!isSuccessfullResponse(response)) {
        return dispatch(toggleSnackbarOpen())
      }

      const payload = {
        id,
        furnitureId: id,
        quintity: 1,
        color: colors[0] ?? '#FFF'
      }

      dispatch(addProductToCartActionCreator(payload))
      dispatch(toggleSnackbarOpen('Product added to cart!', 'success'))
    } catch (error) {
      dispatch(toggleSnackbarOpen())
    }
  }

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
        onClick={onLikeProductClick(isLoggedIn)}
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
              blurDataURL={`data:image/svg+xml;base64,${toBase64(convertImage(image.width, image.height))}`}
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
            <Button
              className='item-sales__tocart btn'
              type='button'
              title='Add product to cart'
              onClick={onAddToCartClick}
            >
              Add to cart
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
})

Card.displayName = 'Card'
