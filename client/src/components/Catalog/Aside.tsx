import React from 'react'

import { submitValuesType } from '../../types'
import { Loader } from '../common/Loader'
import { capitalizeFirstLetter } from '../../utils'
import { Button } from '../common/Button'
const CustomSelect = React.lazy(() => import('../common/CustomSelect'))

interface IAsideProps {
  colors: string[]
  brands: string[]
  rooms: string[]
  materials: string[]
  types: string[]
  isAsideVisible: boolean
  onAsideCloseClick: React.MouseEventHandler<HTMLButtonElement>
  handleFiltersSubmit: (values: submitValuesType) => void
}

interface ISelectOption {
  label: string
  value: string
}

interface ISelectField {
  value: string
  options: ISelectOption[]
  label: string
}

interface IRadiosField {
  value: string[]
  label: string
  options: ISelectOption[]
}

export const Aside: React.FC<IAsideProps> = ({
  colors: allColors,
  brands: allBrands,
  rooms: allRooms,
  materials: allMaterials,
  types: allTypes,
  isAsideVisible,
  onAsideCloseClick
}) => {
  // const roomSelectOptions = [
  //   { value: 'all', label: 'Показать все' },
  //   { value: 'living', label: 'Гостинные' },
  //   { value: 'kitchen', label: 'Кухни' },
  //   { value: 'bedroom', label: 'Спальные' },
  //   { value: 'children', label: 'Детские' },
  //   { value: 'hall', label: 'Прихожие' },
  //   { value: 'office', label: 'Офисная мебель' }
  // ]

  // const materialSelectOptions = [
  //   { value: 'all', label: 'Показать все' },
  //   { value: 'soft', label: 'Мягкая мебель' },
  //   { value: 'hard', label: 'Твердая мебель' },
  //   { value: 'wood', label: 'Деревянная мебель' }
  // ]

  // const furnitureSelectOptions = [
  //   { value: 'all', label: 'Показать все' },
  //   { value: 'coach', label: 'Диваны' },
  //   { value: 'bed', label: 'Кровати' },
  //   { value: 'table', label: 'Столы' },
  //   { value: 'chair', label: 'Стулья' },
  //   { value: 'set', label: 'Серванты' },
  //   { value: 'bedsideTables', label: 'Комоды' }
  // ]

  const colorsProps: IRadiosField = {
    value: [],
    label: 'Colors',
    options: []
  }

  const brandProps: IRadiosField = {
    value: [],
    options: [],
    label: 'Brands'
  }

  const roomProps: ISelectField = {
    value: 'all',
    options: [], // roomSelectOptions,
    label: 'Room'
  }

  const materialProps: ISelectField = {
    value: 'all',
    options: [], //materialSelectOptions,
    label: 'Material'
  }

  const typeProps: ISelectField = {
    value: 'all',
    options: [], // furnitureSelectOptions,
    label: 'Type'
  }

  const [chosenColors, setChosenColors] = React.useState(colorsProps)
  const [chosenBrands, setChosenBrands] = React.useState(brandProps)
  const [room, setRoom] = React.useState(roomProps)
  const [material, setMaterial] = React.useState(materialProps)
  const [type, setType] = React.useState(typeProps)

  React.useEffect(() => {
    setChosenColors((prev) => ({
      ...prev,
      options: allColors.map((c) => ({ label: capitalizeFirstLetter(c), value: c }))
    }))
  }, [allColors])

  React.useEffect(() => {
    setChosenBrands((prev) => ({
      ...prev,
      options: allBrands.map((c) => ({ label: capitalizeFirstLetter(c), value: c }))
    }))
  }, [allBrands])

  React.useEffect(() => {
    setRoom((prev) => ({
      ...prev,
      options: allRooms.map((c) => ({ label: capitalizeFirstLetter(c), value: c }))
    }))
  }, [allRooms])

  React.useEffect(() => {
    setMaterial((prev) => ({
      ...prev,
      options: allMaterials.map((c) => ({ label: capitalizeFirstLetter(c), value: c }))
    }))
  }, [allMaterials])

  React.useEffect(() => {
    setType((prev) => ({
      ...prev,
      options: allTypes.map((c) => ({ label: capitalizeFirstLetter(c), value: c }))
    }))
  }, [allTypes])

  const onSelect = (setState: React.Dispatch<React.SetStateAction<ISelectField>>) => (value: ISelectOption | null) => {
    setState((prev) => {
      return {
        ...prev,
        value: value?.value ?? ''
      }
    })
  }

  const onBrand = (brand: string) => () => {
    setChosenBrands((prev) => ({
      ...prev,
      value: prev.value.includes(brand) ? prev.value.filter((c) => c !== brand) : [...prev.value, brand]
    }))
  }

  const onColor = (color: string) => () => {
    setChosenColors((prev) => ({
      ...prev,
      value: prev.value.includes(color) ? prev.value.filter((c) => c !== color) : [...prev.value, color]
    }))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    // const dto = {
    //   brandsIds: brands.value as string[],
    //   colorsIds: colors.value as string[],
    //   room: room.value as string,
    //   material: material.value as string,
    //   type: type.value as string
    // }

    // handleFiltersSubmit(dto)
  }

  return (
    <aside className={`catalog__aside aside ${isAsideVisible ? 'opened' : ''}`}>
      <div className={`aside__box ${isAsideVisible ? 'opened' : ''}`}>
        <form
          className='aside__form'
          onSubmit={handleSubmit}
        >
          <div className='aside__filter filter'>
            <Button
              title='Close aside'
              type='button'
              className='aside__close'
              onClick={onAsideCloseClick}
            >
              <img
                src='/images/mob-menu/close.svg'
                alt='close icon'
              />
            </Button>
            <React.Suspense fallback={<Loader />}>
              <h6 className='filter__title mt-30'>{room.label}</h6>
              <CustomSelect
                value={room.value}
                options={room.options}
                onChange={onSelect(setRoom)}
              />
              <h6 className='filter__title mt-30'>{material.label}</h6>
              <CustomSelect
                value={material.value}
                options={material.options}
                onChange={onSelect(setMaterial)}
              />
              <h6 className='filter__title mt-30'>{type.label}</h6>
              <CustomSelect
                value={type.value}
                options={type.options}
                onChange={onSelect(setType)}
              />
            </React.Suspense>
          </div>

          <div className='aside__filter filter'>
            <h6 className='filter__title'>{chosenColors.label}</h6>
            <div className='filter__colors colors'>
              {allColors.map((color) => (
                <label
                  className='colors__item'
                  key={color}
                >
                  <input
                    className='colors__checkbox-real'
                    id={color}
                    type='checkbox'
                    checked={chosenColors.value.includes(color)}
                    onChange={onColor(color)}
                  />
                  <span
                    className='colors__checkbox-fake'
                    style={{ backgroundColor: color }}
                  ></span>
                </label>
              ))}
            </div>
          </div>

          <div className='aside__filter brands-filter'>
            <h6 className='filter__title'>{chosenBrands.label}</h6>
            <div>
              {chosenBrands.options.map(({ value, label }) => (
                <label
                  className='form__label'
                  key={value}
                >
                  <input
                    className='form__checkbox-real'
                    id={value}
                    type='checkbox'
                    checked={chosenBrands.value.includes(value)}
                    onChange={onBrand(value)}
                  />
                  <span className='form__checkbox-fake'></span>
                  <span className='form__text'>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <Button
            title='Filter'
            className='btn mt-20'
            type='submit'
          >
            Find
          </Button>
        </form>
      </div>
    </aside>
  )
}
