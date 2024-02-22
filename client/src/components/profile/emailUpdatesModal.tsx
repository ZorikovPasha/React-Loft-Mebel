import React from 'react'
import { useDispatch } from 'react-redux'

import { UserApiClient } from '../../api'
import { isSuccessfullResponse } from '../../api/types'
import { toggleSnackbarOpen } from '../../redux/actions/errors'
import { editUserActionCreator } from '../../redux/actions/userAction'
import { Button } from '../common/Button'
import { Modal } from '../common/Modal'

export const EmailsUpdatesModal: React.FC<{ onModalClose: () => void }> = ({ onModalClose }) => {
  const dispatch = useDispatch()

  const [agreedToGetEmails, setAgreedToGetEmails] = React.useState(true)

  const onCheckbox = () => {
    setAgreedToGetEmails((prev) => !prev)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('wantsToReceiveEmailUpdates', agreedToGetEmails ? '1' : '0')

    try {
      const dto = await UserApiClient.updateUserData(formData)
      if (!isSuccessfullResponse(dto)) {
        return dispatch(toggleSnackbarOpen())
      }

      const payload = {
        wantsToReceiveEmailUpdates: agreedToGetEmails,
        decidedOnWantsToReceiveEmailUpdates: true
      }

      dispatch(editUserActionCreator(payload))
      onModalClose()
    } catch (error) {
      dispatch(toggleSnackbarOpen())
    }
  }

  return (
    <Modal
      content={
        <>
          <h3 className='popup-message__title text-center'>
            Do you wish to get our email updates and special events only for you?
          </h3>
          <p className='popup-message__text mt-20'>We promise to email you no more than once a week.</p>

          <form
            className='flex flex-col mt-40'
            onSubmit={handleSubmit}
          >
            <label className='form__label'>
              <input
                className='form__checkbox-real'
                type='checkbox'
                checked={agreedToGetEmails}
                onChange={onCheckbox}
              />
              <span className='form__checkbox-fake'></span>
              <span className='form__text'>I agree to recieve email newsletter.</span>
            </label>

            <Button
              title='Submit choice'
              className='btn mt-20'
              type='submit'
            >
              Submit choice
            </Button>
          </form>
        </>
      }
      onModalClose={onModalClose}
    />
  )
}
