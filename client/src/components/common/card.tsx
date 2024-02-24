import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { UserApiClient } from '../../api'
import { IFurniture, isSuccessfullResponse } from '../../api/types'
import { getUserData } from '../../redux/getters'
import { addProductToCartActionCreator, editUserActionCreator } from '../../redux/actions/userAction'
import { toggleSnackbarOpen } from '../../redux/actions/errors'
import { Button } from './Button'

interface ISalesItemProps {
  product: IFurniture
  isFavorite: boolean
}

export const Card: React.FC<ISalesItemProps> = React.memo(({ product, isFavorite }) => {
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
        if (!isSuccessfullResponse(response)) {
          return dispatch(toggleSnackbarOpen())
        }

        dispatch(editUserActionCreator(payload))
      } catch (error) {
        dispatch(toggleSnackbarOpen())
      }
    } else {
      try {
        const response = await UserApiClient.addFavoriteItem(id)
        if (!isSuccessfullResponse(response)) {
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
    } catch (error) {
      dispatch(toggleSnackbarOpen())
    }
  }

  let discount = '0'

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
        title='Like product'
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
        <div className='item-sales__img'>
          <img
            src={image ? import.meta.env.VITE_BACKEND + image.url : ''}
            alt='furniture'
          />
        </div>

        <Link
          to={`/products/${id}`}
          className='item-sales__title'
        >
          {name}
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
