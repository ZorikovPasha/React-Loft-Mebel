import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserApiClient } from 'src/api'
import { isSuccessfullResponse } from 'src/api/types'
import { toggleSnackbarOpen } from 'src/redux/actions/errors'
import { addFavouriteItemAC, removeFavouriteItemAC } from 'src/redux/actions/userAction'
import { getUserData } from 'src/redux/getters'

export const useFavoriteProduct = (itemId: number) => {
  const dispatch = useDispatch()
  const { isLoggedIn, favorites } = useSelector(getUserData)

  const [isProcessingRequest, setIsProcessingRequest] = React.useState(false)

  const likeProduct = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (isProcessingRequest) {
      return
    }

    if (!isLoggedIn) {
      return dispatch(toggleSnackbarOpen('You are not logged in. Please login.', 'warning'))
    }

    if (itemId === null) {
      return
    }

    setIsProcessingRequest(true)

    if (favorites.includes(itemId)) {
      try {
        const response = await UserApiClient.deleteFavoriteItem(itemId)
        setIsProcessingRequest(false)
        if (!isSuccessfullResponse(response)) {
          dispatch(toggleSnackbarOpen())
        } else {
          dispatch(removeFavouriteItemAC(itemId))
          dispatch(toggleSnackbarOpen('Product removed from favorites!', 'success'))
        }
      } catch (error) {
        setIsProcessingRequest(false)
        dispatch(toggleSnackbarOpen())
      }
    } else {
      try {
        const response = await UserApiClient.addFavoriteItem(itemId)
        setIsProcessingRequest(false)
        if (!isSuccessfullResponse(response)) {
          dispatch(toggleSnackbarOpen())
        } else {
          dispatch(addFavouriteItemAC(itemId))
          dispatch(toggleSnackbarOpen('Product added to favorites!', 'success'))
        }
      } catch (error) {
        setIsProcessingRequest(false)
        dispatch(toggleSnackbarOpen())
      }
    }
  }

  return { isProcessingRequest, likeProduct }
}
