import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { ICartItem, removeItemActionCreator } from '../../redux/actions/cartItems'
import { UserApiClient } from '../../api'
import { IFurniture } from '../../api/types'

interface ICartItemProps {
  cartItem: ICartItem
  item: IFurniture
}

export const CartItem: React.FC<ICartItemProps> = ({ cartItem, item }) => {
  const dispatch = useDispatch()

  const onRemoveItemClick: React.MouseEventHandler<HTMLDivElement> = (): void => {
    dispatch(removeItemActionCreator(cartItem))
    UserApiClient.removeCartItem(cartItem.id)
  }

  console.log('item.priceNew', item.priceNew)

  const totalCost = item.priceNew
    ? parseInt(item.priceNew) * cartItem.quintity
    : parseInt(item.priceOld) * cartItem.quintity

  return (
    <div className='cart__item item'>
      <div className='item__box'>
        <img
          src={item.image?.url}
          alt='furniture'
        />
        <div className='item__info'>
          <div className='item__info-top'>
            <h4 className='item__info-name'>
              <Link to={`/products/${cartItem.id}`}>{item.name}</Link>
            </h4>
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
              <p className='info-feature__val'>{item.colors.map((color, idx) => (color ? item.colors[idx] : ''))}</p>
              <span></span>
            </div>
            <div className='item__info-feature info-feature'>
              <p className='info-feature__name info-feature__name--total'>Количество:</p>
              <p
                className='info-feature__val'
                data-total
              >
                {cartItem.quintity}
              </p>
            </div>
            <div
              className='item__info-feature info-feature'
              data-size
            >
              <p className='info-feature__name'>Размер(Ш×Д×В):</p>
              {item.dimensions ? (
                <p className='info-feature__val'>
                  {item.dimensions.width} СМ × {item.dimensions.length} СМ × {item.dimensions.length} СМ
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
          src='/images/icons/cross.svg'
          alt='cross'
        />
      </div>
    </div>
  )
}
