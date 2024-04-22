import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getError } from '../../redux/getters'
import { toggleSnackbarClose } from '../../redux/actions/errors'
import { Button } from './Button'

export const Snackbar = () => {
  const timeout = 4000
  const timer = React.useRef<number>(0)

  const dispatch = useDispatch()
  const { message, variant, toggleSnackbar } = useSelector(getError)

  React.useEffect(() => {
    if (toggleSnackbar) {
      handleTimeout()
    }

    return () => window.clearTimeout(timer.current)
  }, [toggleSnackbar])

  const handleTimeout = () => {
    timer.current = window.setTimeout(() => {
      dispatch(toggleSnackbarClose())
    }, timeout)
  }

  const handleClose = () => {
    clearTimeout(timer.current)
    dispatch(toggleSnackbarClose())
  }

  const rootElClassName = variant === 'warning' ? 'snackbar--blue' : variant === 'success' ? 'snackbar--green' : ''

  return toggleSnackbar ? (
    <div className={`snackbar flex items-center justify-between ${rootElClassName}`}>
      <p className='snackbar__p'>{message}</p>
      <Button
        className='snackbar__button'
        type='button'
        title='Close snackbar'
        onClick={handleClose}
      >
        <img
          src='/images/icons/cross-white.svg'
          alt='close snackbar'
        />
      </Button>
    </div>
  ) : null
}
