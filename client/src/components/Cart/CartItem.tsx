import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { UserApiClient } from '../../api'
import { isSuccessfullResponse } from '../../api/types'
import { removeProductFromCartActionCreator } from '../../redux/actions/userAction'
import { getUserData } from '../../redux/getters'
import { toggleSnackbarOpen } from '../../redux/actions/errors'

interface ICartItemProps {
  item: {
    furnitureId: number
    cartItemId: number
    name: string
    imageUrl: string
    price: number
    quintity: number
    dimension: {
      width: number
      length: number
      height: number
    }[]
    color: string
  }
}

export const CartItem: React.FC<ICartItemProps> = ({ item }) => {
  const { furnitureId, cartItemId, name, imageUrl, price, quintity, dimension, color } = item
  const { isLoggedIn } = useSelector(getUserData)

  const dispatch = useDispatch()

  const onRemoveItemClick = () => {
    if (!isLoggedIn) {
      return
    }

    const dto = {
      productId: furnitureId,
      color
    }

    UserApiClient.removeCartItem(dto)
      .then((dto) => {
        if (!isSuccessfullResponse(dto)) {
          return dispatch(toggleSnackbarOpen())
        }
        const payload = {
          id: cartItemId,
          furnitureId,
          quintity,
          color
        }

        dispatch(removeProductFromCartActionCreator(payload))
      })
      .catch(() => {
        dispatch(toggleSnackbarOpen())
      })
  }

  const totalCost = price * quintity

  return (
    <div className='cart__item item'>
      <div className='item__box'>
        <img
          className='item__box-image'
          src={import.meta.env.VITE_BACKEND + imageUrl}
          alt='furniture'
        />
        <div className='item__info'>
          <div className='item__info-top'>
            <h6 className='item__info-name'>
              <Link to={`/products/${furnitureId}`}>{name}</Link>
            </h6>
            <div className='item__info-nums'>
              <p className='item__info-price'>{totalCost}</p>
            </div>
          </div>
          <div className='item__info-line'>
            <div
              className='item__info-feature info-feature'
              data-color
            >
              <p className='info-feature__name'>Цвет:</p>
              <span
                style={{ backgroundColor: color }}
                className='info-feature__color'
              ></span>
            </div>
            <div className='item__info-feature info-feature'>
              <p className='info-feature__name info-feature__name--total'>Количество:</p>
              <p className='info-feature__val'>{quintity}</p>
            </div>
            <div
              className='item__info-feature info-feature'
              data-size
            >
              <p className='info-feature__name'>Размер(Ш×Д×В):</p>
              {dimension ? (
                <p className='info-feature__val'>
                  {dimension[0].width} СМ × {dimension[0].length} СМ × {dimension[0].height} СМ
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div className='item__bottom'></div>
      </div>
      <button
        className='item__remove'
        type='button'
        onClick={onRemoveItemClick}
      >
        <img
          className='item__remove-cross'
          src='/images/icons/cross.svg'
          alt='cross'
        />
      </button>
    </div>
  )
}
