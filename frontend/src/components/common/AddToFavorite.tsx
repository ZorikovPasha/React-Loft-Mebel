import React from 'react'
import { useSelector } from 'react-redux'

import { getUserData } from '../../redux/getters'
import { Button } from './Button'
import { useFavoriteProduct } from 'src/hooks/useFavoriteProduct'

interface IProps {
  id: number
}

export const AddToFavorite: React.FC<IProps> = ({ id }) => {
  const { favorites } = useSelector(getUserData)

  const { isProcessingRequest, likeProduct } = useFavoriteProduct(id)

  return (
    <Button
      title='Add to favorites'
      type='button'
      className='shop__wish'
      disabled={isProcessingRequest}
      onClick={likeProduct}
    >
      <img
        src={
          isProcessingRequest
            ? '/images/icons/wish-disabled.svg'
            : favorites.includes(id)
            ? '/images/icons/wished.svg'
            : '/images/icons/wish.svg'
        }
        alt=''
      />
    </Button>
  )
}
