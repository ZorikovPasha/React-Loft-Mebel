import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { UserApiClient } from '../../api'
import { isSuccessfullResponse } from '../../api/types'
import { editUserActionCreator } from '../../redux/actions/userAction'

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
    colors: string[]
  }
}

export const CartItem: React.FC<ICartItemProps> = ({ item }) => {
  const { furnitureId, cartItemId, name, imageUrl, price, quintity, dimension, colors } = item
  const dispatch = useDispatch()

  const onRemoveItemClick = () => {
    const payload = {
      cart: [
        {
          id: cartItemId,
          furnitureId,
          quintity
        }
      ]
    }

    console.log('payload', payload)

    dispatch(editUserActionCreator(payload))
    UserApiClient.removeCartItem(furnitureId)
      .then((dto) => {
        if (!isSuccessfullResponse(dto)) {
          return
        }

        editUserActionCreator(payload)
      })
      .catch(() => editUserActionCreator(payload))
  }

  const totalCost = price * quintity

  return (
    <div className='cart__item item'>
      <div className='item__box'>
        <img
          className='item__box-image'
          src={`http://localhost:5000${imageUrl}`}
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
                style={{ backgroundColor: colors[0] }}
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
      <div
        className='item__remove'
        onClick={onRemoveItemClick}
      >
        <img
          className='item__remove-cross'
          src='/images/icons/cross.svg'
          alt='cross'
        />
      </div>
    </div>
  )
}
