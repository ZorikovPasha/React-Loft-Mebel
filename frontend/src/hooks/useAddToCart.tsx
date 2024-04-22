import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserApiClient } from 'src/api'
import { isSuccessfullResponse } from 'src/api/types'
import { toggleSnackbarOpen } from 'src/redux/actions/errors'
import { addProductToCartActionCreator } from 'src/redux/actions/userAction'
import { getUserData } from 'src/redux/getters'
import { IProcessedFurniture } from 'src/utils'

export const useAddToCart = (product: IProcessedFurniture, quintity?: number) => {
  const { isLoggedIn } = useSelector(getUserData)

  const [isProcessingRequest, setIsProcessingRequest] = React.useState(false)
  const dispatch = useDispatch()

  const buy = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isProcessingRequest) {
      // just in case
      return
    }
    if (!isLoggedIn) {
      return dispatch(toggleSnackbarOpen('You are not logged in. Please login.', 'warning'))
    }

    setIsProcessingRequest(true)

    if (typeof product.id !== 'number') {
      return
    }

    try {
      const dto = {
        productId: product.id,
        quintity: quintity ?? 1,
        color: product.colors[0] ?? '#FFF'
      }

      const response = await UserApiClient.addItemToCart(dto)

      if (!isSuccessfullResponse(response)) {
        return dispatch(toggleSnackbarOpen())
      }

      const payload = {
        id: product.id,
        furnitureId: product.id,
        quintity: quintity ?? 1,
        color: product.colors[0] ?? '#FFF'
      }

      dispatch(addProductToCartActionCreator(payload))
      dispatch(toggleSnackbarOpen('Product added to cart!', 'success'))
      setIsProcessingRequest(false)
    } catch (error) {
      dispatch(toggleSnackbarOpen())
      setIsProcessingRequest(false)
    }
  }

  return { isProcessingRequest, buy }
}
