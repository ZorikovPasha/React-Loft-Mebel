import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'

import { UserApiClient } from '../../api'
import { isSuccessfullResponse } from '../../api/types'
import { removeProductFromCartActionCreator } from '../../redux/actions/userAction'
import { getUserData } from '../../redux/getters'
import { toggleSnackbarOpen } from '../../redux/actions/errors'
import { Button } from '../common/Button'
import { splitPriceWithSpaces } from '../../utils'
import { Loader } from '../common/Loader'

interface ICartItemProps {
  item: {
    furnitureId: number
    cartItemId: number
    name: string
    imageUrl: string
    price: number | null
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
  const [isLoading, setIsloading] = React.useState(false)

  const onRemoveItemClick = async () => {
    if (!isLoggedIn) {
      return
    }

    setIsloading(true)

    const dto = {
      productId: furnitureId,
      color
    }

    try {
      const response = await UserApiClient.removeCartItem(dto)
      setIsloading(false)

      if (!isSuccessfullResponse(response)) {
        return dispatch(toggleSnackbarOpen())
      }
      const payload = {
        id: cartItemId,
        furnitureId,
        quintity,
        color
      }

      dispatch(removeProductFromCartActionCreator(payload))
    } catch (error) {
      setIsloading(false)
      dispatch(toggleSnackbarOpen())
    }
  }

  const totalToRender = typeof price === 'number' ? splitPriceWithSpaces(price * quintity) : null

  return (
    <div className='item flex relative'>
      <div className='item__box flex'>
        <div className='item__box-image'>
          <img
            src={process.env.NEXT_PUBLIC_BACKEND + imageUrl}
            alt='furniture'
          />
        </div>
        <div className='item__info'>
          <div className='item__info-top flex items-center justify-between'>
            <h6 className='item__info-name fw-500'>
              <Link href={`/products/${furnitureId}`}>{name}</Link>
            </h6>
            <p className='item__info-price'>{typeof totalToRender === 'string' ? `$${totalToRender}` : 'N/A'}</p>
          </div>
          <div className='item__info-line mt-20 flex items-center'>
            <div className='item__info-feature info-feature flex items-center'>
              <p className='info-feature__name'>Color:</p>
              <span
                style={{ backgroundColor: color }}
                className='info-feature__color relative'
              ></span>
            </div>
            <div className='item__info-feature info-feature  flex items-center'>
              <p className='info-feature__name info-feature__name--total'>Quintity:</p>
              <p className='info-feature__val'>{quintity}</p>
            </div>
            <div className='item__info-feature info-feature flex items-center'>
              <p className='info-feature__name'>Dimensions(SM):</p>
              {dimension[0] ? (
                <p className='info-feature__val'>
                  {dimension[0].width} × {dimension[0].length} × {dimension[0].height}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Button
        title='Remove product from cart'
        className='item__remove flex items-center justify-center'
        type='button'
        disabled={isLoading}
        onClick={onRemoveItemClick}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <img
            className='item__remove-cross'
            src='/images/icons/cross.svg'
            alt='cross'
          />
        )}
      </Button>
    </div>
  )
}
