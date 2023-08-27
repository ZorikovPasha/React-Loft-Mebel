import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { UserApiClient } from '../../api'
import { IFurniture, isSuccessfullResponse } from '../../api/types'
import { Link } from 'react-router-dom'
import { getUserData } from '../../redux/getters'
import { addProductToCartActionCreator, editUserActionCreator } from '../../redux/actions/userAction'
import { toggleSnackbarOpen } from '../../redux/actions/errors'

interface ISalesItemProps {
  product: IFurniture
  isFavorite: boolean
}

export const Card: React.FC<ISalesItemProps> = React.memo(({ product, isFavorite }) => {
  const { id, image, name, type, priceOld, priceNew, dimensions, sale, colors } = product

  const dispatch = useDispatch()
  const { isLoggedIn, favorites } = useSelector(getUserData)

  const onLikeProductClick = () => {
    if (!isLoggedIn) {
      return dispatch(toggleSnackbarOpen('You are not logged in. Please login.', 'warning'))
    }

    const payload = {
      favorites: [id]
    }

    if (favorites.includes(id)) {
      return UserApiClient.deleteFavoriteItem(id)
        .then((dto) => {
          if (!isSuccessfullResponse(dto)) {
            return dispatch(toggleSnackbarOpen())
          }

          editUserActionCreator(payload)
        })
        .catch(() => {
          dispatch(toggleSnackbarOpen())
        })
    }
    UserApiClient.addFavoriteItem(id)
      .then((dto) => {
        if (!isSuccessfullResponse(dto)) {
          return dispatch(toggleSnackbarOpen())
        }

        editUserActionCreator(payload)
      })
      .catch(() => {
        dispatch(toggleSnackbarOpen())
      })
  }

  const onAddToCartClick = async () => {
    if (!isLoggedIn) {
      return dispatch(toggleSnackbarOpen('You are not logged in. Please login.', 'warning'))
    }

    UserApiClient.addItemToCart({
      productId: id,
      quintity: 1,
      color: colors[0]
    })
      .then((dto) => {
        if (!isSuccessfullResponse(dto)) {
          return dispatch(toggleSnackbarOpen())
        }

        const payload = {
          id,
          furnitureId: id,
          quintity: 1,
          color: colors[0]
        }

        dispatch(addProductToCartActionCreator(payload))
      })
      .catch(() => {
        dispatch(toggleSnackbarOpen())
      })
  }

  let discount = 0

  if (priceNew < priceOld) {
    discount = (parseInt(priceOld) - parseInt(priceNew)) / 100
  }

  return (
    <div className='sales__item item-sales'>
      {sale && discount ? (
        <div className='item-sales__label label-sales'>
          <div className='label-sales__body'>-{discount}%</div>
        </div>
      ) : null}
      <button
        title='Like product'
        type='button'
        className={`item-sales__like ${isFavorite ? 'active' : ''}`}
        onClick={onLikeProductClick}
      />
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
          {priceNew ? <p className='item-sales__price-new'>{priceNew} ₽</p> : null}
          {priceOld ? <p className='item-sales__price-old'>{priceOld + ' ₽'}</p> : null}
        </div>
        {dimensions ? (
          <div className='item-sales__bottom flex'>
            <p className='item-sales__text'>Размеры</p>
            <div className='item-sales__line'>
              <div className='item-sales__size'>
                <p className='item-sales__val'>ШИРИНА</p>
                <p className='item-sales__num'>{dimensions[0].width} СМ</p>
              </div>
              <div className='item-sales__size'>
                <p className='item-sales__val'>ГЛУБИНА</p>
                <p className='item-sales__num'>{dimensions[0].length} СМ</p>
              </div>
              <div className='item-sales__size'>
                <p className='item-sales__val'>ВЫСОТА</p>
                <p className='item-sales__num'>{dimensions[0].height} СМ</p>
              </div>
            </div>
            <button
              className='item-sales__tocart btn'
              type='button'
              title='Add product to cart'
              onClick={onAddToCartClick}
            >
              Добавить в корзину
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
})
