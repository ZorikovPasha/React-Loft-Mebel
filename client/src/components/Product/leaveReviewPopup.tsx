import { useDropzone } from 'react-dropzone'
import { isRes200, isRes500 } from '../../api/types'
import React from 'react'
import { useDispatch } from 'react-redux'

import { getTextInputErrorMessage, validateTextInput } from '../../utils'
import { IField } from '../../pages/SignUp'
import AppTextField from '../common/appTextField'
import { Loader } from '../common/Loader'
import { toggleSnackbarOpen } from '../../redux/actions/errors'
import { UserApiClient } from '../../api'
import { Button } from '../common/Button'

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

export const ModalContent: React.FC<IModalContentProps> = ({ furnitureId, onModalClose }) => {
  const scoreProps: IField = {
    value: '',
    label: 'Score',
    labelClass: 'signup__form-label form-label',
    isValid: false,
    required: true,
    type: 'text',
    placeholder: 'Enter your score',
    className: 'mt-20',
    inputClassName: 'signup__form-input form-input',
    tag: 'input',
    showErrors: false,
    errorMessage: getTextInputErrorMessage(''),
    getErrorMessage: (str: string) => (validateTextInput(str) ? '' : 'Пожалуйста, заполните имя'),
    validateFn: validateTextInput
  }

  const textProps: IField = {
    tag: 'textarea',
    value: '',
    type: 'text',
    isValid: true,
    placeholder: 'Write your review',
    required: false,
    labelClass: 'signup__form-label form-label',
    label: 'Review',
    showErrors: false,
    className: 'mt-20',
    inputClassName: 'form-input',
    errorMessage: '',
    getErrorMessage: getTextInputErrorMessage,
    validateFn: validateTextInput
  }

  const fileProps: IFile = {
    files: []
  }

  const dispatch = useDispatch()

  const [score, setScore] = React.useState(scoreProps)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (![score, text].every(({ isValid, required }) => (required ? isValid : true))) {
      return
    }

    const formData = new FormData()

    formData.append('text', text.value)
    formData.append('furnitureId', furnitureId.toString())
    formData.append('score', score.value)
    pictures.files.forEach((image) => {
      formData.append('attachments', image.file)
    })

    setIsLoading(true)

    try {
      const response = await UserApiClient.sendReview(formData)
      if (isRes500(response)) {
        dispatch(toggleSnackbarOpen())
        setIsLoading(false)
        return
      }

      if (isRes200(response)) {
        setIsLoading(false)
        setText(textProps)
        setScore(scoreProps)
        setPictures({ files: [] })
        onModalClose()
        return
      }

      dispatch(toggleSnackbarOpen())
      setIsLoading(false)
    } catch (error) {
      dispatch(toggleSnackbarOpen())
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && <Loader rootElClass='loader--fixed' />}

      <h3 className='popup__title popup__title--narrow text-center'>Liked this product? Leave your review!</h3>
      <form
        className='flex flex-col'
        onSubmit={handleSubmit}
      >
        <AppTextField
          elementType={score.tag}
          placeholder={score.placeholder}
          name='score'
          type={score.type}
          value={score.value}
          required={score.required}
          rootElclass={score.className}
          label={score.label}
          labelClass={score.labelClass}
          inputWrapClass={score.inputWrapClass}
          inputClassName={score.inputClassName}
          showErrors={!score.isValid && score.showErrors}
          errorMessage={score.getErrorMessage(score.value)}
          onChange={onChange(setScore)}
        />

        <AppTextField
          elementType={text.tag}
          placeholder={text.placeholder}
          name='text'
          type={text.type}
          value={text.value}
          required={text.required}
          rootElclass={text.className}
          label={text.label}
          labelClass={text.labelClass}
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
            <p className='profile__drop-placeholder'>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>

        {pictures.files.length ? (
          <div className='product__review-uploads flex mt-30'>
            {pictures.files.map((p, idx) => (
              <div className='profile__picture profile__picture--width-80'>
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
