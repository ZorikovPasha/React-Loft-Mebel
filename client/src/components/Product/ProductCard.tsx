import React from 'react'
import Slider, { Settings } from 'react-slick'
import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from 'react-dropzone'

import { AddToFavorite } from '../common/AddToFavorite'
import CustomSelect from '../common/CustomSelect'
import { IFurniture, isSuccessfullResponse } from '../../api/types'
import { addProductToCartActionCreator } from '../../redux/actions/userAction'
import { UserApiClient } from '../../api'
import { getUserData } from '../../redux/getters'
import { toggleSnackbarOpen } from '../../redux/actions/errors'
import { Button } from '../common/Button'
import { Modal } from '../common/Modal'
import { getTextInputErrorMessage, validateTextInput } from '../../utils'
import { IField } from '../../pages/SignUp'
import AppTextField from '../common/appTextField'
import { Loader } from '../common/Loader'

interface IProductCardProps {
  product: IFurniture
}

const SliderPrevArrow: React.FC = () => {
  return (
    <Button
      className='slick-btn slick-prev'
      title='Previous slide'
      type='button'
      onClick={() => ({})}
    >
      <svg
        width='9'
        height='14'
        viewBox='0 0 9 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M7.5 1L1.5 7L7.5 13'
          stroke='black'
          strokeLinecap='square'
        />
      </svg>
    </Button>
  )
}

const SliderNextArrow: React.FC = () => {
  return (
    <Button
      className='slick-btn slick-next'
      type='button'
      title='Next slide'
      onClick={() => ({})}
    >
      <svg
        width='8'
        height='14'
        viewBox='0 0 8 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M1 13L7 7L1 1'
          stroke='black'
          strokeLinecap='square'
        />
      </svg>
    </Button>
  )
}

const slider1Settings: Settings = {
  arrows: false,
  fade: true,
  swipe: false
}

const slider2Settings: Settings = {
  variableWidth: true,
  infinite: false,
  focusOnSelect: true,
  prevArrow: <SliderPrevArrow />,
  nextArrow: <SliderNextArrow />,
  responsive: [
    {
      breakpoint: 511,
      settings: {
        arrows: false
      }
    }
  ]
}

type ColorOptionType = {
  value: string
  label: string
}

interface ISelectField {
  value: string
  label: string
  options: ColorOptionType[]
}

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

const ModalContent: React.FC<IModalContentProps> = ({ furnitureId, onModalClose }) => {
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
      // @ts-expect-error ts should not complain here
      if (file.type !== 'image/jpeg' || file.type !== 'image/png') {
        return dispatch(toggleSnackbarOpen('You can attach .png or .jpg images only.'))
      }

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const url = e.target ? (typeof e.target.result === 'string' ? e.target.result : null) : null
        setPictures((prev) => ({
          files: [
            ...prev.files,
            {
              file: file,
              url: url
            }
          ]
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (![score, text].every(({ isValid, required }) => (required ? isValid : true))) {
      return
    }

    console.log('further')

    const formData = new FormData()

    formData.append('text', text.value)
    formData.append('furnitureId', furnitureId.toString())
    formData.append('score', score.value)
    pictures.files.forEach((image) => {
      formData.append('attachments', image.file)
    })

    setIsLoading(true)

    UserApiClient.sendReview(formData)
      .then(() => {
        setIsLoading(false)
        setText(textProps)
        setScore(scoreProps)
        setPictures({ files: [] })
        onModalClose()
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      {isLoading && <Loader rootElClass='loader--fixed' />}

      <h3 className='text-center'>Liked this product? Leave your review!</h3>
      <form
        className='popup__agree-form flex'
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

export const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(getUserData)

  const { id, name, type, priceNew, priceOld, colors, dimensions, image, rating } = product

  const thumbsUrls = image ? [image.url, image.url, image.url, image.url, image.url] : []

  const fields = React.useRef<Record<string, ISelectField>>({
    quintity: {
      label: 'Quintity',
      value: '1',
      options: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' }
      ]
    },
    dimensions: {
      label: 'Размер (Д × Ш × В)',
      value: dimensions ? `${dimensions[0].width} CM × ${dimensions[0].length} CM × ${dimensions[0].height} CM` : '',
      options:
        dimensions?.map((d) => ({
          value: `${d.width} CM × ${d.length} CM × ${d.height} CM`,
          label: `${d.width} CM × ${d.length} CM × ${d.height} CM`
        })) ?? []
    }
  })

  const colorProps = {
    label: 'Color',
    value: colors[0],
    options: colors
  }

  const [nav1, setNav1] = React.useState<Slider>()
  const [nav2, setNav2] = React.useState<Slider>()
  const [form, setForm] = React.useState(fields.current)
  const [colorsState, setColorsState] = React.useState(colorProps)
  const [reviewModelShown, setReviewModelShown] = React.useState(false)

  const onSelect = (name: string) => (value: ColorOptionType | null) => {
    setForm((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: value?.value ?? ''
      }
    }))
  }

  const onColor = (color: string) => () => {
    setColorsState((prev) => ({
      ...prev,
      value: color
    }))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (!isLoggedIn) {
      return dispatch(toggleSnackbarOpen('You are not logged in. Please login.', 'warning'))
    }

    UserApiClient.addItemToCart({
      productId: id,
      quintity: parseInt(form.quintity.value),
      color: colorsState.value
    })
      .then((dto) => {
        if (!isSuccessfullResponse(dto)) {
          return dispatch(toggleSnackbarOpen())
        }

        const payload = {
          id,
          furnitureId: id,
          color: colorsState.value,
          quintity: parseInt(form.quintity.value)
        }

        dispatch(addProductToCartActionCreator(payload))
      })
      .catch(() => {
        dispatch(toggleSnackbarOpen())
      })
  }

  const ratingWidth = (parseFloat(rating) / 5) * 95

  const onReviewModalClose = () => {
    setReviewModelShown(false)
    document.body.classList.remove('locked')
  }

  const openReviewModal = () => {
    document.body.classList.add('locked')
    setReviewModelShown(true)
  }

  return (
    <section className='product'>
      {reviewModelShown && (
        <Modal
          content={
            <ModalContent
              furnitureId={id}
              onModalClose={onReviewModalClose}
            />
          }
          onModalClose={onReviewModalClose}
        />
      )}

      <div className='container'>
        <div className='product__inner grid'>
          <div>
            <Slider
              className='product__slider'
              asNavFor={nav2}
              ref={(slider1: Slider): void => setNav1(slider1)}
              {...slider1Settings}
            >
              {thumbsUrls.map((url) => (
                <div
                  className='product__slider-item'
                  key={url}
                >
                  <img
                    src={import.meta.env.VITE_BACKEND + url}
                    alt='furniture'
                  />
                </div>
              ))}
            </Slider>
            <Slider
              className='product__thumbs'
              asNavFor={nav1}
              ref={(slider2: Slider): void => setNav2(slider2)}
              {...slider2Settings}
            >
              {thumbsUrls.map((url) => (
                <div
                  className='product__thumb'
                  key={url}
                >
                  <img
                    src={import.meta.env.VITE_BACKEND + url}
                    alt='furniture thumb'
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className='info'>
            <h1 className='info__title'>{name}</h1>
            <p className='info__category'>{type}</p>
            <div className='flex info__rating-parent'>
              <img
                className='info__rating-img'
                src='/images/icons/star.svg'
                alt=''
              />
              <img
                className='info__rating-img'
                src='/images/icons/star.svg'
                alt=''
              />
              <img
                className='info__rating-img'
                src='/images/icons/star.svg'
                alt=''
              />
              <img
                className='info__rating-img'
                src='/images/icons/star.svg'
                alt=''
              />
              <img
                className='info__rating-img'
                src='/images/icons/star.svg'
                alt=''
              />

              <div
                style={{ width: ratingWidth }}
                className='flex info__rating-child'
              >
                <img
                  className='info__rating-img'
                  src='/images/icons/star-black.svg'
                  alt=''
                />
                <img
                  className='info__rating-img'
                  src='/images/icons/star-black.svg'
                  alt=''
                />
                <img
                  className='info__rating-img'
                  src='/images/icons/star-black.svg'
                  alt=''
                />
                <img
                  className='info__rating-img'
                  src='/images/icons/star-black.svg'
                  alt=''
                />
                <img
                  className='info__rating-img'
                  src='/images/icons/star-black.svg'
                  alt=''
                />
              </div>
            </div>
            <form
              className='mt-10'
              onSubmit={handleSubmit}
            >
              <div className='info__shop shop'>
                <p className='shop__price'>{priceNew ? priceNew : priceOld} P</p>
                <Button
                  className='shop__btn btn'
                  title='Buy product'
                  type='submit'
                >
                  Buy
                </Button>
                <AddToFavorite id={id} />
              </div>
              <div className='info__features grid'>
                {Object.entries(form).map(([key, props]) => (
                  <div key={props.label}>
                    <p className='features__title'>{props.label}</p>
                    <CustomSelect
                      value={props.value}
                      options={props.options}
                      onChange={onSelect(key)}
                    />
                  </div>
                ))}
              </div>
              <div className='colors'>
                {colorsState.options.map((color) => (
                  <label
                    className='colors__item'
                    key={color}
                  >
                    <input
                      className='colors__checkbox-real'
                      id={color}
                      type='checkbox'
                      checked={colorsState.value.includes(color)}
                      onChange={onColor(color)}
                    />
                    <span
                      className='colors__checkbox-fake'
                      style={{ backgroundColor: color }}
                    ></span>
                  </label>
                ))}
              </div>
            </form>
            <p className='info__text-title mt-20'>Описание</p>
            <p className='info__text'>
              Лаконичные линии и простые формы, безупречный стиль и индивидуальность – все это диван «Динс». Сдержанный
              скандинавский дизайн украсит любую современную обстановку. Элегантность, комфорт и функциональность,
              собранные воедино – «Динс» просто создан для размеренного отдыха в кругу семьи или компании друзей!
            </p>

            {isLoggedIn && (
              <Button
                className='shop__btn--plain btn-hollow mt-20'
                title='Leave review'
                type='button'
                onClick={openReviewModal}
              >
                <>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M6.69401 14.432C6.63711 14.4889 6.5989 14.5613 6.58264 14.6393L6.00793 17.5139C5.9811 17.6472 6.02337 17.7846 6.11929 17.8813C6.19652 17.9585 6.30057 18 6.40706 18C6.43307 18 6.4599 17.9976 6.48672 17.9919L9.3603 17.4171C9.43996 17.4009 9.51231 17.3627 9.5684 17.3057L16 10.8738L13.1264 8L6.69401 14.432Z'
                      fill='#414141'
                    />
                    <path
                      d='M18.3523 5.6471C17.4896 4.7843 16.0864 4.7843 15.2246 5.6471L14 6.87182L17.1278 10L18.3523 8.77528C18.77 8.35848 19 7.80275 19 7.21163C19 6.6205 18.77 6.06478 18.3523 5.6471Z'
                      fill='#414141'
                    />
                  </svg>
                  Leave review
                </>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
