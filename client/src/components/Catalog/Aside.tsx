import React from 'react'

import { submitValuesType } from '../../types'
import { Loader } from '../common/Loader'
const CustomSelect = React.lazy(() => import('../common/CustomSelect'))

interface IAsideProps {
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
  name: string
}

interface IRadiosField {
  value: string[]
  options: ISelectOption[]
  label: string
}

const isRadiosField = (props: ISelectField | IRadiosField): props is IRadiosField => {
  return Array.isArray(props)
}

export const Aside: React.FC<IAsideProps> = ({ isAsideVisible, onAsideCloseClick, handleFiltersSubmit }) => {
  const roomSelectOptions = [
    { value: 'all', label: 'Показать все' },
    { value: 'living', label: 'Гостинные' },
    { value: 'kitchen', label: 'Кухни' },
    { value: 'bedroom', label: 'Спальные' },
    { value: 'children', label: 'Детские' },
    { value: 'hall', label: 'Прихожие' },
    { value: 'office', label: 'Офисная мебель' }
  ]

  const materialSelectOptions = [
    { value: 'all', label: 'Показать все' },
    { value: 'soft', label: 'Мягкая мебель' },
    { value: 'hard', label: 'Твердая мебель' },
    { value: 'wood', label: 'Деревянная мебель' }
  ]

  const furnitureSelectOptions = [
    { value: 'all', label: 'Показать все' },
    { value: 'coach', label: 'Диваны' },
    { value: 'bed', label: 'Кровати' },
    { value: 'table', label: 'Столы' },
    { value: 'chair', label: 'Стулья' },
    { value: 'set', label: 'Серванты' },
    { value: 'bedsideTables', label: 'Комоды' }
  ]

  const furnitureBrandOptions = [
    { value: 'Шерона', label: 'Шерона' },
    { value: 'Динс', label: 'Динс' },
    { value: 'Taskany', label: 'Taskany' },
    { value: 'Бенфлит', label: 'Бенфлит' },
    { value: 'Тиффани', label: 'Тиффани' },
    { value: 'Лайт', label: 'Лайт' },
    { value: 'Вилли', label: 'Вилли' }
  ]

  const colorsCategories = [
    { value: 'E94848', label: 'E94848' },
    { value: '43BF57', label: '43BF57' },
    { value: 'E4E4E4', label: 'E4E4E4' },
    { value: '3E3E3E', label: '3E3E3E' },
    { value: '675A5A', label: '675A5A' }
  ]

  const fields = React.useRef<Record<string, ISelectField | IRadiosField>>({
    room: {
      value: 'all',
      options: roomSelectOptions,
      label: 'Раздел',
      name: 'room'
    },
    material: {
      value: 'all',
      options: materialSelectOptions,
      label: 'Материал Мебели',
      name: 'material'
    },
    type: {
      value: 'all',
      options: furnitureSelectOptions,
      label: 'Тип Мебели',
      name: 'type'
    },
    colors: {
      value: [] as string[],
      options: colorsCategories,
      label: 'Цвет'
    },
    brands: {
      value: [] as string[],
      options: furnitureBrandOptions,
      label: 'Бренд'
    }
  })

  const [form, setForm] = React.useState(fields.current)

  const { room, material, type, colors, brands } = form

  const selects = [room, material, type] as ISelectField[]

  const onSelect = (key: string) => (value: ISelectOption | null) => {
    setForm((prev) => {
      const current = prev[key]
      if (isRadiosField(current)) {
        return prev
      }
      return {
        ...prev,
        [key]: {
          ...current,
          value: value?.value ?? ''
        }
      }
    })
  }

  const onRadio = (key: keyof typeof form, id: string) => () => {
    setForm((prev) => {
      const current = prev[key]

      if (!isRadiosField(current)) {
        return prev
      }
      if (current.value.includes(id)) {
        return {
          ...prev,
          [key]: {
            ...current,
            value: current.value.filter((str) => str !== id)
          }
        }
      } else {
        return {
          ...prev,
          [key]: {
            ...current,
            value: [...current.value, id]
          }
        }
      }
    })
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const dto = {
      brandsIds: brands.value as string[],
      colorsIds: colors.value as string[],
      room: room.value as string,
      material: material.value as string,
      type: type.value as string
    }

    handleFiltersSubmit(dto)
  }

  return (
    <aside className={`catalog__aside aside ${isAsideVisible ? 'opened' : ''}`}>
      <div className={`aside__box ${isAsideVisible ? 'opened' : ''}`}>
        <form
          className='aside__form'
          onSubmit={handleSubmit}
        >
          <div className='aside__filter filter'>
            <button
              className='aside__close'
              onClick={onAsideCloseClick}
            />
            <React.Suspense fallback={<Loader />}>
              {selects.map(({ value, label, options, name }) => (
                <React.Fragment key={label}>
                  <h6 className='filter__title'>{label}</h6>
                  <CustomSelect
                    value={value}
                    options={options}
                    onChange={onSelect(name)}
                  />
                </React.Fragment>
              ))}
            </React.Suspense>
          </div>

          <div className='aside__filter filter'>
            <h6 className='filter__title'>{colors.label}</h6>
            <div className='filter__colors colors'>
              {colors.options.map((color) => (
                <label
                  className='colors__item'
                  key={color.value}
                >
                  <input
                    className='colors__checkbox-real'
                    id={color.value}
                    type='checkbox'
                    checked={colors.value.includes(color.value)}
                    onChange={onRadio('colors', color.value)}
                  />
                  <span
                    className='colors__checkbox-fake'
                    style={{ backgroundColor: '#' + color.value }}
                  ></span>
                </label>
              ))}
            </div>
          </div>

          <div className='aside__filter brands-filter'>
            <h6 className='filter__title'>{brands.label}</h6>
            <div>
              {brands.options.map(({ value, label }) => (
                <label
                  className='brands-filter__label'
                  key={value}
                >
                  <input
                    className='brands-filter__checkbox-real'
                    id={value}
                    type='checkbox'
                    checked={brands.value.includes(value)}
                    onChange={onRadio('brands', value)}
                  />
                  <span className='brands-filter__checkbox-fake'></span>
                  <span className='brands-filter__text'>{label}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            className='aside__btn'
            type='submit'
          >
            Подобрать
          </button>
        </form>
      </div>
    </aside>
  )
}
