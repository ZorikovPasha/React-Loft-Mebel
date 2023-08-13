import React from 'react'
import { HexColorPicker } from 'react-colorful'
import AppTextField from '../components/common/appTextField'
import CustomSelect from '../components/common/CustomSelect'

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
  placeholder: string
}

interface ISelectProps {
  value: string | null
  isValid: boolean
  required: boolean
  type: 'select'
  placeholder: string
  options: { value: string; label: string }[]
}

interface IRadioProps {
  value: boolean
  required: boolean
  type: 'switch'
  placeholder: string
}

// interface IFileProps {
//   value: File | null
//   type: 'file'
//   placeholder: string
// }

interface IColorsProps {
  value: string[]
  placeholder: 'Цвет'
  type: 'multiPicker'
}

interface IDimension {
  width: string
  height: string
  length: string
}

interface IDimensions {
  value: IDimension[]
  type: 'multiInput'
  placeholder: 'Размер'
}

const NewProduct = (): JSX.Element => {
  const nameProps: IInputProps = {
    value: '',
    isValid: false,
    required: true,
    tag: 'input',
    type: 'text',
    placeholder: 'Название'
  }

  const typeProps: ISelectProps = {
    value: null,
    isValid: false,
    required: true,
    type: 'select',
    placeholder: 'Тип Мебели',
    options: [
      { value: 'coach', label: 'Диваны' },
      { value: 'bed', label: 'Кровати' },
      { value: 'table', label: 'Столы' },
      { value: 'chair', label: 'Стулья' },
      { value: 'set', label: 'Серванты' },
      { value: 'bedsideTables', label: 'Комоды' }
    ]
  }

  const priceOldProps: IInputProps = {
    value: '',
    isValid: false,
    required: true,
    tag: 'input',
    type: 'text',
    placeholder: 'Старая цена'
  }

  const priceNewProps: IInputProps = {
    value: '',
    isValid: false,
    required: true,
    tag: 'input',
    type: 'text',
    placeholder: 'Новая цена'
  }

  const colorsProps: IColorsProps = {
    value: [],
    placeholder: 'Цвет',
    type: 'multiPicker'
  }

  const ratingProps: IInputProps = {
    value: '',
    isValid: false,
    required: true,
    tag: 'input',
    type: 'text',
    placeholder: 'rating'
  }

  const saleProps: IRadioProps = {
    value: false,
    required: true,
    type: 'switch',
    placeholder: 'Sale'
  }

  const roomProps: ISelectProps = {
    value: null,
    isValid: false,
    required: true,
    type: 'select',
    placeholder: 'Раздел',
    options: [
      { value: 'living', label: 'Гостинные' },
      { value: 'kitchen', label: 'Кухни' },
      { value: 'bedroom', label: 'Спальные' },
      { value: 'children', label: 'Детские' },
      { value: 'hall', label: 'Прихожие' },
      { value: 'office', label: 'Офисная мебель' }
    ]
  }

  const materialProps: ISelectProps = {
    value: '',
    isValid: false,
    required: true,
    type: 'select',
    placeholder: 'Материал Мебели',
    options: [
      { value: 'soft', label: 'Мягкая мебель' },
      { value: 'hard', label: 'Твердая мебель' },
      { value: 'wood', label: 'Деревянная мебель' }
    ]
  }

  const brandProps: ISelectProps = {
    value: null,
    isValid: false,
    required: true,
    type: 'select',
    placeholder: 'Материал Мебели',
    options: [
      { value: 'Шерона', label: 'Шерона' },
      { value: 'Динс', label: 'Динс' },
      { value: 'Taskany', label: 'Taskany' },
      { value: 'Бенфлит', label: 'Бенфлит' },
      { value: 'Тиффани', label: 'Тиффани' },
      { value: 'Лайт', label: 'Лайт' },
      { value: 'Вилли', label: 'Вилли' }
    ]
  }

  const dimensionsProps: IDimensions = {
    value: [
      {
        width: '',
        height: '',
        length: ''
      }
    ],
    type: 'multiInput',
    placeholder: 'Размер'
  }

  // const imageProps: IFileProps = {
  //   value: null,
  //   type: 'file',
  //   placeholder: 'Картинка Мебели'
  // }

  const [name, setName] = React.useState(nameProps)
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
  // const [image, setImage] = React.useState(imageProps)

  const lastPickedColor = colors.value.length ? colors.value[colors.value.length - 1] : undefined

  const onType =
    (setState: React.Dispatch<React.SetStateAction<IInputProps>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({
        ...prev,
        value: e.target.value,
        isValid: e.target.value.trim().length > 0
      }))
    }

  const onSelect = (setState: React.Dispatch<React.SetStateAction<ISelectProps>>) => (value: ISelectOption | null) => {
    setState((prev) => ({
      ...prev,
      value: value?.value ?? null,
      isValid: Boolean(value?.value)
    }))
  }

  // const onFile = (e: React.ChangeEvent): void => {
  //   console.log('e.target.files[0]', e.target.files[0])

  //   setImage(e.target.files[0])
  // }

  const onToggle = (setState: React.Dispatch<React.SetStateAction<IRadioProps>>) => () => {
    setState((prev) => ({
      ...prev,
      value: !prev.value
    }))
  }

  const onColors = (newColor: string): void => {
    setColors((prev) =>
      prev.value.includes(newColor)
        ? prev
        : {
            ...prev,
            value: [...prev.value, newColor]
          }
    )
  }

  const onDeleteDimension = (idx: number) => () => {
    setDimensions((prev) => ({
      ...prev,
      value: prev.value.filter((d, index) => index !== idx)
    }))
  }

  const onAddDimension = (): void => {
    setDimensions((prev) => ({
      ...prev,
      value: [...prev.value, { width: '', length: '', height: '' }]
    }))
  }

  const onTypeDimension =
    (idx: number, dimension: 'width' | 'length' | 'height') => (e: React.ChangeEvent<HTMLInputElement>) => {
      setDimensions((prev) => {
        const dimensionToEdit = prev.value.find((d, index) => index === idx)

        if (!dimensionToEdit) {
          return prev
        }

        dimensionToEdit[dimension] = e.target.value

        return {
          ...prev,
          value: [...prev.value.filter((d, index) => index !== idx), dimensionToEdit]
        }
      })
    }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    // checks

    const dto = {
      name: name.value,
      type: type.value,
      priceOld: priceOld.value,
      priceNew: priceNew.value,
      colors: colors.value
    }

    console.log('dto', dto)
  }

  return (
    <div>
      <h1>Add new furniture</h1>

      <form onSubmit={onSubmit}>
        <AppTextField
          value={name.value}
          elementType={name.tag}
          name='name'
          type={name.type}
          placeholder={name.placeholder}
          required={name.required}
          showErrors
          onChange={onType(setName)}
        />

        <CustomSelect
          value={type.value ?? ''}
          options={type.options}
          onChange={onSelect(setType)}
        />

        <AppTextField
          value={priceOld.value}
          elementType={priceOld.tag}
          name='priceOld'
          type={priceOld.type}
          placeholder={priceOld.placeholder}
          required={priceOld.required}
          showErrors
          onChange={onType(setPriceOld)}
        />

        <AppTextField
          value={priceNew.value}
          elementType={priceNew.tag}
          name='priceNew'
          type={priceNew.type}
          placeholder={priceNew.placeholder}
          required={priceNew.required}
          showErrors
          onChange={onType(setPriceNew)}
        />

        <div className='colors flex'>
          {colors.value.map((c) => (
            <span
              key={c}
              style={{ backgroundColor: c }}
            ></span>
          ))}
        </div>

        <HexColorPicker
          color={lastPickedColor}
          onChange={onColors}
        />

        <AppTextField
          value={rating.value}
          elementType={rating.tag}
          name='rating'
          type={rating.type}
          placeholder={rating.placeholder}
          required={rating.required}
          showErrors
          onChange={onType(setRating)}
        />

        <label className=''>
          <input
            name='check'
            type='checkbox'
            checked={sale.value}
            onChange={onToggle(setSale)}
          />
          <span className='brief__agree-fake'></span>
          OnSale?
        </label>

        <CustomSelect
          value={room.value ?? ''}
          options={room.options}
          onChange={onSelect(setRoom)}
        />

        <CustomSelect
          value={material.value ?? ''}
          options={material.options}
          onChange={onSelect(setMaterial)}
        />

        <CustomSelect
          value={brand.value ?? ''}
          options={brand.options}
          onChange={onSelect(setBrand)}
        />

        <p>Dimesions</p>

        {dimensions.value.map(({ width, length, height }, idx) => (
          <div key={idx}>
            <div className='grid'>
              <AppTextField
                value={width}
                elementType='input'
                name='width'
                type='text'
                placeholder='Width'
                required
                showErrors
                onChange={onTypeDimension(idx, 'width')}
              />
              <AppTextField
                value={length}
                elementType='input'
                name='length'
                type='text'
                placeholder='Length'
                required
                showErrors
                onChange={onTypeDimension(idx, 'length')}
              />
              <AppTextField
                value={height}
                elementType='input'
                name='height'
                type='text'
                placeholder='Height'
                required
                showErrors
                onChange={onTypeDimension(idx, 'height')}
              />
            </div>

            <button onClick={onDeleteDimension(idx)}>Delete</button>
          </div>
        ))}

        <button onClick={onAddDimension}>Add dimension</button>

        {/* <label className='contacts__form-file form-file'>
          <input
            className='form-file__real'
            type='file'
            onChange={onFile}
          />
          <span className='form-file__fake'>Прикрепить файл</span>
        </label> */}

        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default NewProduct
