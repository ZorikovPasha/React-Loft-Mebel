import React from 'react'
import { HexColorPicker } from 'react-colorful'
import { useDispatch } from 'react-redux'
import slugify from 'slugify'

import AppTextField from '../../components/common/appTextField'
import CustomSelect from '../../components/common/CustomSelect'
import { PublicApiClient } from '../../api'
import { isResponseWithErrors, isSuccessfullResponse } from '../../api/types'
import { toggleSnackbarOpen } from '../../redux/actions/errors'
import { Button } from '../../components/common/Button'
import Head from 'next/head'

interface ISelectOption {
  label: string
  value: string
}

interface IInputProps {
  value: string
  isValid: boolean
  required: boolean
  tag: 'input'
  type: 'text'
  rootElclass: string
  inputClass: string
  placeholder: string
  showErrors: boolean
}

interface ISelectProps {
  value: string | null
  isValid: boolean
  required: boolean
  type: 'select'
  placeholder: string
  options: { value: string; label: string }[]
  showErrors: boolean
}

interface IRadioProps {
  value: boolean
  required: boolean
  type: 'switch'
  placeholder: string
  isValid: boolean
}

interface IFileProps {
  value: File | null
  type: 'file'
}

interface IColorsProps {
  value: string[]
  placeholder: 'Цвет'
  type: 'multiPicker'
  isValid: boolean
}

interface IDimension {
  width: string
  height: string
  length: string
}

interface IDimensions {
  value: IDimension[]
  type: 'multiInput'
  isValid: boolean
  placeholder: string
  showErrors: boolean
}

const NewProduct = () => {
  const nameProps: IInputProps = {
    value: '',
    isValid: false,
    rootElclass: 'mt-30',
    inputClass: 'form-input',
    required: true,
    tag: 'input',
    type: 'text',
    placeholder: 'Furniture name',
    showErrors: false
  }

  const descriptionProps: IInputProps = {
    value: '',
    isValid: false,
    rootElclass: 'mt-30',
    inputClass: 'form-input',
    required: true,
    tag: 'input',
    type: 'text',
    placeholder: 'Furniture description',
    showErrors: false
  }

  const specsProps: IInputProps = {
    value: '',
    isValid: false,
    rootElclass: 'mt-30',
    inputClass: 'form-input',
    required: true,
    tag: 'input',
    type: 'text',
    placeholder: 'Furniture specs',
    showErrors: false
  }

  const typeProps: ISelectProps = {
    value: null,
    isValid: false,
    required: true,
    type: 'select',
    placeholder: 'Тип Мебели',
    options: [
      { value: 'coach', label: 'Couches' },
      { value: 'bed', label: 'Beds' },
      { value: 'table', label: 'Tables' },
      { value: 'chair', label: 'Chairs' },
      { value: 'set', label: 'Sets' },
      { value: 'bedsideTables', label: 'Bedside tables' },
      { value: 'shelves', label: 'Shelves' },
      { value: 'mirrors', label: 'Mirrors' },
      { value: 'corners', label: 'Corners' },
      { value: 'kitchenware', label: 'Kitchenware' },
      { value: 'countertops', label: 'Countertops' },
      { value: 'hangers', label: 'Hangers' },
      { value: 'shoeRacks', label: 'Shoe Racks' },
      { value: 'walls', label: 'Walls' }
    ],
    showErrors: false
  }

  const priceOldProps: IInputProps = {
    value: '',
    isValid: false,
    required: true,
    rootElclass: 'mt-30',
    inputClass: 'form-input',
    tag: 'input',
    type: 'text',
    placeholder: 'Old price',
    showErrors: false
  }

  const priceNewProps: IInputProps = {
    value: '',
    isValid: false,
    required: true,
    rootElclass: 'mt-30',
    inputClass: 'form-input',
    tag: 'input',
    type: 'text',
    placeholder: 'New price',
    showErrors: false
  }

  const colorsProps: IColorsProps = {
    value: ['#fff'],
    placeholder: 'Цвет',
    type: 'multiPicker',
    isValid: true
  }

  const ratingProps: IInputProps = {
    value: '',
    isValid: false,
    required: true,
    rootElclass: 'mt-30',
    inputClass: 'form-input',
    tag: 'input',
    type: 'text',
    placeholder: 'rating',
    showErrors: false
  }

  const saleProps: IRadioProps = {
    value: false,
    required: true,
    isValid: true,
    type: 'switch',
    placeholder: 'Sale'
  }

  const roomProps: ISelectProps = {
    value: null,
    isValid: false,
    required: true,
    type: 'select',
    placeholder: 'Section',
    options: [
      { value: 'living', label: 'Living rooms' },
      { value: 'kitchen', label: 'Kitchens' },
      { value: 'bedroom', label: 'Bedrooms' },
      { value: 'children', label: 'Children' },
      { value: 'hall', label: 'Halls' },
      { value: 'office', label: 'Office' }
    ],
    showErrors: false
  }

  const materialProps: ISelectProps = {
    value: '',
    isValid: false,
    required: true,
    type: 'select',
    placeholder: 'Материал Мебели',
    options: [
      { value: 'soft', label: 'Soft' },
      { value: 'hard', label: 'Hard' },
      { value: 'wood', label: 'Wood' }
    ],
    showErrors: false
  }

  const brandProps: ISelectProps = {
    value: null,
    isValid: false,
    required: true,
    type: 'select',
    placeholder: 'Furniture material',
    options: [
      { value: 'Sherona', label: 'Sherona' },
      { value: 'Dins', label: 'Dins' },
      { value: 'Taskany', label: 'Taskany' },
      { value: 'Benflit', label: 'Benflit' },
      { value: 'Tyffany', label: 'Tyffany' },
      { value: 'Light', label: 'Light' },
      { value: 'Willy', label: 'Willy' }
    ],
    showErrors: false
  }

  const dimensionsProps: IDimensions = {
    value: [
      {
        width: '',
        height: '',
        length: ''
      }
    ],
    isValid: false,
    type: 'multiInput',
    placeholder: 'Dimensions',
    showErrors: false
  }

  const imageProps: IFileProps = {
    value: null,
    type: 'file'
  }

  const dispatch = useDispatch()

  const [name, setName] = React.useState(nameProps)
  const [description, setDescription] = React.useState(descriptionProps)
  const [specs, setSpecs] = React.useState(specsProps)
  const [type, setType] = React.useState(typeProps)
  const [priceOld, setPriceOld] = React.useState(priceOldProps)
  const [priceNew, setPriceNew] = React.useState(priceNewProps)
  const [colors, setColors] = React.useState(colorsProps)
  const [rating, setRating] = React.useState(ratingProps)
  const [sale, setSale] = React.useState(saleProps)
  const [room, setRoom] = React.useState(roomProps)
  const [material, setMaterial] = React.useState(materialProps)
  const [brand, setBrand] = React.useState(brandProps)
  const [dimensions, setDimensions] = React.useState(dimensionsProps)
  const [image, setImage] = React.useState(imageProps)
  const [activeColor, setActiveColor] = React.useState(0)

  const lastPickedColor = colors.value.length ? colors.value[colors.value.length - 1] : '#fff'
  const imageExtension = image.value ? image.value.name.split('.').slice(-1) : ''

  const onType =
    (setState: React.Dispatch<React.SetStateAction<IInputProps>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target
      setState((prev) => ({
        ...prev,
        value: target.value,
        isValid: target.value.trim().length > 0,
        showErrors: true
      }))
    }

  const onSelect = (setState: React.Dispatch<React.SetStateAction<ISelectProps>>) => (value: ISelectOption | null) => {
    setState((prev) => ({
      ...prev,
      value: value?.value ?? null,
      isValid: Boolean(value?.value),
      showErrors: true
    }))
  }

  const onFile = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement
    const fileToAttach = target.files?.[0]
    if (!fileToAttach) {
      return dispatch(toggleSnackbarOpen('No files has been attached'))
    }

    if (fileToAttach.type === 'image/jpeg' || fileToAttach.type === 'image/png') {
      setImage((prev) => ({
        ...prev,
        value: target.files?.[0] ?? null
      }))
    } else {
      dispatch(toggleSnackbarOpen('You can attach .png or .jpg images only.'))
    }
  }

  const onToggle = (setState: React.Dispatch<React.SetStateAction<IRadioProps>>) => () => {
    setState((prev) => ({
      ...prev,
      value: !prev.value
    }))
  }

  const onColors = (idx: number) => (color: string) => {
    setColors((prev) => {
      prev.value[idx] = color

      return { ...prev }
    })
  }

  const onTypeColor = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target

    setColors((prev) => {
      prev.value[idx] = target.value

      return {
        ...prev
      }
    })
  }

  const onAddColor = (): void => {
    setColors((prev) => ({
      ...prev,
      value: prev.value.concat('#fff')
    }))
    setActiveColor((prev) => prev + 1)
  }

  const onDeleteColor = (currentColor: string) => () => {
    let shouldDeleteColor = true

    setColors((prev) => {
      if (prev.value.length === 1) {
        shouldDeleteColor = false
        return prev
      }

      return {
        ...prev,
        value: prev.value.filter((color) => color !== currentColor)
      }
    })

    if (shouldDeleteColor) {
      setActiveColor((prev) => (prev ? prev - 1 : 0))
    }
  }

  const onDeleteDimension = (idx: number) => () => {
    setDimensions((prev) => {
      if (prev.value.length === 1) {
        return prev
      }

      return {
        ...prev,
        // @ts-expect-error unused parameter in function
        value: prev.value.filter((d, index) => index !== idx)
      }
    })
  }

  const onAddDimension = (): void => {
    setDimensions((prev) => ({
      ...prev,
      value: prev.value.concat({ width: '', length: '', height: '' })
    }))
  }

  const onTypeDimension =
    (idx: number, dimension: 'width' | 'length' | 'height') => (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target
      setDimensions((prev) => {
        const dimensionToEdit = prev.value[idx]

        if (!dimensionToEdit) {
          return prev
        }

        dimensionToEdit[dimension] = target.value
        return { ...prev }
      })
    }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    // checks
    if (name.value === null) {
      return
    }

    if (type.value === null) {
      return
    }
    if (room.value === null) {
      return
    }
    if (brand.value === null) {
      return
    }
    if (material.value === null) {
      return
    }
    if (image.value === null) {
      return
    }

    const serializedColors = colors.value.reduce((accum, next) => `${accum}${accum ? ';' : ''}${next}`, '')
    const serializeddimensions = dimensions.value.reduce(
      (accum, next) => `${accum}${accum ? ';' : ''}${next.width},${next.length},${next.height}`,
      ''
    )
    const serializedSale = sale.value ? '1' : '0'

    const copiedFile = new File([image.value], slugify(image.value.name, { replacement: '_' }), {
      type: image.value.type,
      lastModified: image.value.lastModified
    })

    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('description', description.value)
    formData.append('specs', specs.value)
    formData.append('type', type.value)
    formData.append('priceOld', priceOld.value)
    formData.append('priceNew', priceNew.value)
    formData.append('colors', serializedColors)
    formData.append('rating', rating.value)
    formData.append('sale', serializedSale)
    formData.append('room', room.value)
    formData.append('material', material.value)
    formData.append('brand', brand.value)
    formData.append('dimensions', serializeddimensions)
    formData.append('image', copiedFile)

    try {
      const response = await PublicApiClient.createFurniture(formData)
      if (isSuccessfullResponse(response)) {
        setName(nameProps)
        setDescription(descriptionProps)
        setSpecs(descriptionProps)
        setType(typeProps)
        setPriceOld(priceOldProps)
        setPriceNew(priceNewProps)
        setColors(colorsProps)
        setRating(ratingProps)
        setSale(saleProps)
        setRoom(roomProps)
        setMaterial(materialProps)
        setBrand(brandProps)
        setDimensions(dimensionsProps)
        setImage(imageProps)
        setActiveColor(0)
      } else if (isResponseWithErrors(response)) {
        response.errors?.forEach((error) => {
          if (error.field === 'name') {
            setName((prev) => ({ ...prev, isValid: false }))
          }
          if (error.field === 'description') {
            setDescription((prev) => ({ ...prev, isValid: false }))
          }
          if (error.field === 'type') {
            setType((prev) => ({ ...prev, isValid: false }))
          }
          if (error.field === 'priceOld') {
            setPriceOld((prev) => ({ ...prev, isValid: false }))
          }
          if (error.field === 'priceNew') {
            setPriceNew((prev) => ({ ...prev, isValid: false }))
          }
          if (error.field === 'colors') {
            setColors((prev) => ({ ...prev, isValid: false }))
          }
          if (error.field === 'rating') {
            setRating((prev) => ({ ...prev, isValid: false }))
          }
          if (error.field === 'sale') {
            setSale((prev) => ({ ...prev, isValid: false }))
          }
          if (error.field === 'room') {
            setRoom((prev) => ({ ...prev, isValid: false }))
          }
          if (error.field === 'material') {
            setMaterial((prev) => ({ ...prev, isValid: false }))
          }
          if (error.field === 'brand') {
            setBrand((prev) => ({ ...prev, isValid: false }))
          }
          if (error.field === 'dimensions') {
            setDimensions((prev) => ({ ...prev, isValid: false }))
          }
          if (error.field === 'image') {
            setImage((prev) => ({ ...prev, isValid: false }))
          }
        })
      } else {
        dispatch(toggleSnackbarOpen())
      }
    } catch (error) {
      dispatch(toggleSnackbarOpen())
    }
  }

  return (
    <>
      <Head>
        <title>Add new product</title>
        <meta
          name='description'
          content='Loft furniture for your slick modern designes'
        />
      </Head>

      <div className='newproduct'>
        <div className='container'>
          <h1 className='newproduct__heading'>Add new furniture</h1>

          <form onSubmit={onSubmit}>
            <AppTextField
              rootElclass={name.rootElclass}
              inputClassName={name.inputClass}
              value={name.value}
              elementType={name.tag}
              label='Name'
              labelClass='newproduct__subtitle'
              name='name'
              type={name.type}
              placeholder={name.placeholder}
              required={name.required}
              showErrors={name.showErrors}
              onChange={onType(setName)}
            />

            <AppTextField
              rootElclass={description.rootElclass}
              inputClassName={description.inputClass}
              value={description.value}
              elementType={description.tag}
              label='Description'
              labelClass='newproduct__subtitle'
              name='description'
              type={description.type}
              placeholder={description.placeholder}
              required={description.required}
              showErrors={description.showErrors}
              onChange={onType(setDescription)}
            />

            <AppTextField
              rootElclass={specs.rootElclass}
              inputClassName={specs.inputClass}
              value={specs.value}
              elementType={specs.tag}
              label='Specs'
              labelClass='newproduct__subtitle'
              name='specs'
              type={specs.type}
              placeholder={specs.placeholder}
              required={specs.required}
              showErrors={specs.showErrors}
              onChange={onType(setSpecs)}
            />

            <div className='mt-30'>
              <p className='newproduct__subtitle'>Type</p>

              <CustomSelect
                value={type.value ?? ''}
                options={type.options}
                showErrors={type.showErrors}
                onChange={onSelect(setType)}
              />
            </div>

            <AppTextField
              value={priceOld.value}
              elementType={priceOld.tag}
              rootElclass={priceOld.rootElclass}
              inputClassName={priceOld.inputClass}
              label='Old price not including discount'
              labelClass='newproduct__subtitle'
              name='priceOld'
              type={priceOld.type}
              placeholder={priceOld.placeholder}
              required={priceOld.required}
              showErrors={priceOld.showErrors}
              onChange={onType(setPriceOld)}
            />

            <AppTextField
              value={priceNew.value}
              elementType={priceNew.tag}
              rootElclass={priceNew.rootElclass}
              inputClassName={priceNew.inputClass}
              label='New price with discount'
              labelClass='newproduct__subtitle'
              name='priceNew'
              type={priceNew.type}
              placeholder={priceNew.placeholder}
              required={priceNew.required}
              showErrors={priceNew.showErrors}
              onChange={onType(setPriceNew)}
            />

            <div className='mt-30'>
              <p className='newproduct__subtitle'>Select product&apos;s colors</p>

              <div className='newproduct__colors-wrap grid mt-20'>
                <HexColorPicker
                  color={lastPickedColor}
                  onChange={onColors(activeColor)}
                />

                <div>
                  {colors.value.map((c, idx) => (
                    <div
                      className='newproduct__color-row flex items-center mt-20'
                      key={idx}
                    >
                      <span
                        className={`newproduct__color ${activeColor === idx ? 'newproduct__color--active' : ''}`}
                        style={{ backgroundColor: c }}
                        onClick={() => setActiveColor(idx)}
                      ></span>

                      <AppTextField
                        value={c}
                        elementType={priceNew.tag}
                        inputClassName='form-input'
                        type='text'
                        name={`color-${idx}`}
                        placeholder=''
                        required={false}
                        showErrors={false}
                        onChange={onTypeColor(idx)}
                      />

                      <Button
                        className={`newproduct__dimensions-button newproduct__dimensions-button--danger ${
                          colors.value.length === 1 ? 'newproduct__dimensions-button--disabled' : ''
                        } btn`}
                        type='button'
                        title='Delete color'
                        onClick={onDeleteColor(c)}
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
                              d='M3 6H5H21'
                              stroke='#fff'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6'
                              stroke='#fff'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M10 11V17'
                              stroke='#fff'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M14 11V17'
                              stroke='#fff'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                          Delete color
                        </>
                      </Button>
                    </div>
                  ))}

                  <Button
                    className='newproduct__dimensions-button btn mt-20'
                    type='button'
                    title='Add color'
                    onClick={onAddColor}
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
                          d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                          stroke='#fff'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M12 8V16'
                          stroke='#fff'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M8 12H16'
                          stroke='#fff'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      Add color
                    </>
                  </Button>
                </div>
              </div>
            </div>

            <AppTextField
              value={rating.value}
              elementType={rating.tag}
              rootElclass={rating.rootElclass}
              inputClassName={rating.inputClass}
              label='Rating'
              labelClass='newproduct__subtitle'
              name='rating'
              type={rating.type}
              placeholder={rating.placeholder}
              required={rating.required}
              showErrors={rating.showErrors}
              onChange={onType(setRating)}
            />

            <div className='mt-30'>
              <p className='newproduct__subtitle'>Check if product is on sale</p>

              <label className='form__label'>
                <input
                  name='check'
                  type='checkbox'
                  className='form__checkbox-real'
                  checked={sale.value}
                  onChange={onToggle(setSale)}
                />
                <span className='form__checkbox-fake'></span>
                <span className='form__text'>OnSale?</span>
              </label>
            </div>

            <div className='mt-30'>
              <p className='newproduct__subtitle'>Room</p>

              <CustomSelect
                value={room.value ?? ''}
                options={room.options}
                showErrors={room.showErrors}
                onChange={onSelect(setRoom)}
              />
            </div>

            <div className='mt-30'>
              <p className='newproduct__subtitle'>Material</p>

              <CustomSelect
                value={material.value ?? ''}
                options={material.options}
                showErrors={material.showErrors}
                onChange={onSelect(setMaterial)}
              />
            </div>

            <div className='mt-30'>
              <p className='newproduct__subtitle'>Brand</p>

              <CustomSelect
                value={brand.value ?? ''}
                options={brand.options}
                showErrors={brand.showErrors}
                onChange={onSelect(setBrand)}
              />
            </div>

            <p className='newproduct__subtitle mt-30'>Dimesions</p>

            {dimensions.value.map(({ width, length, height }, idx) => (
              <div
                className='grid newproduct__dimensions-row items-center'
                key={idx}
              >
                <div className='newproduct__dimensions grid'>
                  <AppTextField
                    value={width}
                    elementType='input'
                    name='width'
                    inputClassName='form-input'
                    type='text'
                    placeholder='Width'
                    required
                    showErrors={dimensions.showErrors}
                    onChange={onTypeDimension(idx, 'width')}
                  />
                  <AppTextField
                    value={length}
                    elementType='input'
                    inputClassName='form-input'
                    name='length'
                    type='text'
                    placeholder='Length'
                    required
                    showErrors={dimensions.showErrors}
                    onChange={onTypeDimension(idx, 'length')}
                  />
                  <AppTextField
                    value={height}
                    elementType='input'
                    inputClassName='form-input'
                    name='height'
                    type='text'
                    placeholder='Height'
                    required
                    showErrors={dimensions.showErrors}
                    onChange={onTypeDimension(idx, 'height')}
                  />
                </div>

                <div className='grid justify-center'>
                  <Button
                    className={`newproduct__dimensions-button ${
                      dimensions.value.length === 1 ? 'newproduct__dimensions-button--disabled' : ''
                    } newproduct__dimensions-button--danger btn`}
                    type='button'
                    title='Delete dimension'
                    onClick={onDeleteDimension(idx)}
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
                          d='M3 6H5H21'
                          stroke='#fff'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6'
                          stroke='#fff'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M10 11V17'
                          stroke='#fff'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M14 11V17'
                          stroke='#fff'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      Delete dimension
                    </>
                  </Button>
                </div>
              </div>
            ))}

            <Button
              className='newproduct__dimensions-button btn mt-20'
              type='button'
              title='Add dimension'
              onClick={onAddDimension}
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
                    d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                    stroke='#fff'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M12 8V16'
                    stroke='#fff'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M8 12H16'
                    stroke='#fff'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                Add dimension
              </>
            </Button>

            <div className='mt-30'>
              <p className='newproduct__subtitle'>Furniture picture</p>

              {imageExtension ? (
                <div className='newproduct__extension flex items-center mt-20'>
                  <p className='newproduct__extension-text'>{imageExtension}</p>
                </div>
              ) : null}
              <p className='mt-10'>{image.value?.name}</p>

              <div className='mt-10'>
                <label className='form-file inline-flex'>
                  <input
                    className='form-file__real'
                    type='file'
                    onChange={onFile}
                  />
                  <span className='btn'>Add file</span>
                </label>
              </div>
            </div>

            <div className='mt-30'>
              <Button
                title='Create product'
                className='btn'
                type='submit'
              >
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewProduct
