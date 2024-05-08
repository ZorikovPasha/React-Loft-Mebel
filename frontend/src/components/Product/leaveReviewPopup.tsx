import { useDropzone } from 'react-dropzone'
import React from 'react'
import { useDispatch } from 'react-redux'

import { getTextInputErrorMessage, validateTextInput } from '../../utils'
import { IField } from '../../pages/signup'
import AppTextField from '../common/appTextField'
import { Loader } from '../common/Loader'
import { toggleSnackbarOpen } from '../../redux/actions/errors'
import { UserApiClient } from '../../api'
import { Button } from '../common/Button'
import { isSuccessfullResponse } from '../../api/types'

interface IFile {
  files: {
    file: File
    url: string | null
  }[]
}

interface IModalContentProps {
  onModalClose: () => void
  furnitureId: number
}

export const ModalContent = ({ furnitureId, onModalClose }: IModalContentProps) => {
  const ratingLadder = [1, 2, 3, 4, 5]

  const textProps: IField = {
    tag: 'textarea',
    value: '',
    type: 'text',
    isValid: false,
    required: true,
    customPlaceholder: 'Review',
    showErrors: false,
    className: 'relative mt-40',
    inputClassName: 'product__make-review-textarea form-input',
    errorMessage: '',
    getErrorMessage: getTextInputErrorMessage,
    validateFn: validateTextInput
  }

  const fileProps: IFile = {
    files: []
  }

  const dispatch = useDispatch()

  const [score, setScore] = React.useState<null | number>(null)
  const [text, setText] = React.useState(textProps)
  const [pictures, setPictures] = React.useState(fileProps)
  const [isLoading, setIsLoading] = React.useState(false)

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return dispatch(toggleSnackbarOpen('You can attach .png or .jpg images only.'))
      }

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const url = e.target ? (typeof e.target.result === 'string' ? e.target.result : null) : null
        setPictures((prev) => ({
          files: prev.files.concat({
            file: file,
            url: url
          })
        }))
      }
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const onChange =
    (setState: React.Dispatch<React.SetStateAction<IField>>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value
      setState((prev) => ({
        ...prev,
        value: value,
        isValid: prev.validateFn(value),
        showErrors: true,
        isTouched: true
      }))
    }

  const deleteAttachment = (idx: number) => () => {
    // @ts-expect-error this is okay
    const otherAttachments = pictures.files.filter((file, id) => id !== idx)
    setPictures({
      files: otherAttachments
    })
  }

  const chooseRating = (score: number) => () => {
    setScore(score)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (score === null) {
      return dispatch(toggleSnackbarOpen('Please add your score!', 'error'))
    }

    if (!text.isValid) {
      return dispatch(toggleSnackbarOpen('Please add your review!', 'error'))
    }

    const formData = new FormData()

    formData.append('text', text.value)
    formData.append('furnitureId', furnitureId.toString())
    formData.append('score', score.toString())
    pictures.files.forEach((image) => {
      formData.append('attachments', image.file)
    })

    setIsLoading(true)

    try {
      const response = await UserApiClient.sendReview(formData)
      setIsLoading(false)

      if (isSuccessfullResponse(response)) {
        setText(textProps)
        setScore(null)
        setPictures({ files: [] })
        onModalClose()
        dispatch(toggleSnackbarOpen('Your review was added!', 'success'))
        return
      } else {
        dispatch(toggleSnackbarOpen())
      }

      dispatch(toggleSnackbarOpen())
    } catch (error) {
      setIsLoading(false)
      dispatch(toggleSnackbarOpen())
    }
  }

  return (
    <>
      {isLoading && <Loader rootElClass='loader--fixed' />}

      <h3 className='popup__title popup__title--narrow text-center'>Like this product? Leave your review!</h3>
      <form
        className='flex flex-col'
        onSubmit={handleSubmit}
      >
        <p className='product__make-review-label'>Score</p>
        <div className='flex items-center'>
          {ratingLadder.map((num) => (
            <button
              className='product__make-review-star flex'
              type='button'
              key={num}
              onClick={chooseRating(num)}
            >
              {score !== null && score >= num ? (
                <img
                  src='/images/icons/star-blue.svg'
                  alt='star'
                />
              ) : (
                <img
                  src='/images/icons/star.svg'
                  alt='star'
                />
              )}
            </button>
          ))}
        </div>

        <AppTextField
          elementType={text.tag}
          placeholder={text.placeholder}
          name='text'
          type={text.type}
          value={text.value}
          required={text.required}
          rootElclass={text.className}
          customPlaceholder={text.customPlaceholder}
          inputWrapClass={text.inputWrapClass}
          inputClassName={text.inputClassName}
          showErrors={!text.isValid && text.showErrors}
          errorMessage={text.getErrorMessage(text.value)}
          onChange={onChange(setText)}
        />

        <div
          {...getRootProps()}
          className={`profile__drop profile__drop--square mt-30 ${isDragActive ? 'profile__drop--drag' : ''}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className='profile__drop-placeholder'>Drop your images here...</p>
          ) : (
            <p className='profile__drop-placeholder'>
              Drag &apos;n&apos; drop some files here, or click to select files
            </p>
          )}
        </div>

        {pictures.files.length ? (
          <div className='product__review-uploads flex mt-30'>
            {pictures.files.map((p, idx) => (
              <div
                className='profile__picture profile__picture--width-80'
                key={p.url}
              >
                <Button
                  type='button'
                  title='Delete picture'
                  className='profile__picture-delete'
                  onClick={deleteAttachment(idx)}
                >
                  <img
                    src='/images/icons/cross.svg'
                    alt=''
                  />
                </Button>
                <img
                  src={p.url ?? '/images/stub.jpg'}
                  className='profile__picture-img'
                />
              </div>
            ))}
          </div>
        ) : null}

        <Button
          title='Submit choice'
          className='btn mt-20'
          type='submit'
        >
          Leave review
        </Button>
      </form>
    </>
  )
}
