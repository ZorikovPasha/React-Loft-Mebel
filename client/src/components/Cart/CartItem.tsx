import React, { FC, MouseEventHandler } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { removeItemActionCreator } from '../../redux/actions/cartItems'
import { CartItemType, ProductType } from '../../types'
import { UserApiClient } from '../../api'

interface ICartItemProps {
  cartItem: CartItemType
  item: ProductType
}

export const CartItem: FC<ICartItemProps> = ({ cartItem, item }) => {
  const dispatch = useDispatch()

  const onRemoveItemClick: MouseEventHandler<HTMLDivElement> = (): void => {
    dispatch(removeItemActionCreator(cartItem))
    UserApiClient.removeCartItem(cartItem.id)
  }

  const getTotalCost = React.useMemo(() => {
    return item.priceNew ? item.priceNew * cartItem.quintity : item.priceOld * cartItem.quintity
  }, [item.priceNew, item.priceOld, cartItem.quintity])

  return (
    <div className='cart__item item'>
      <div className='item__box'>
        <img
          src={item.imageUrl}
          alt='furniture'
        />
        <div className='item__info'>
          <div className='item__info-top'>
            <h4 className='item__info-name'>
              <Link to={`/products/${cartItem.id}`}>{item.name}</Link>
            </h4>
            <div className='item__info-nums'>
              <p className='item__info-price'>{getTotalCost}</p>
            </div>
          </div>
          <div className='item__info-line'>
            <div
              className='item__info-feature info-feature'
              data-color
            >
              <p className='info-feature__name'>Цвет:</p>
              <p className='info-feature__val'>{cartItem.colors.map((color, idx) => (color ? item.colors[idx] : ''))}</p>
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
              <p className='info-feature__val'>
                {cartItem.dimensions.width} СМ × {cartItem.dimensions.length} СМ × {cartItem.dimensions.length} СМ
              </p>
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
