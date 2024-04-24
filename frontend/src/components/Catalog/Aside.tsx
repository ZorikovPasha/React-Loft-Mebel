import React from 'react'
import Range from 'rc-slider'

import { Button } from '../common/Button'
import { IRadiosField, ISelectField, ISelectOption } from '../../pages/catalog'
import { CustomSelect } from '../common/CustomSelect'

interface IAsideProps {
  isAsideVisible: boolean
  colors: IRadiosField
  brands: IRadiosField
  rooms: ISelectField
  materials: ISelectField
  types: ISelectField
  minPrice: number
  maxPrice: number
  priceTo: number
  priceFrom: number
  onSelectRoom: (value: ISelectOption | null) => void
  onSelectType: (value: ISelectOption | null) => void
  onSelectMaterial: (value: ISelectOption | null) => void
  onSelectBrand: (brand: string) => () => void
  onSelectColor: (color: string) => () => void
  onAsideCloseClick: React.MouseEventHandler<HTMLButtonElement>
  handleFiltersSubmit: React.FormEventHandler<HTMLFormElement>
  handleChangeRange: (values: number | number[]) => void
}

export const Aside = ({
  isAsideVisible,
  colors,
  brands,
  rooms,
  types,
  materials,
  minPrice,
  maxPrice,
  priceFrom,
  priceTo,
  onSelectRoom,
  onSelectType,
  onSelectBrand,
  onSelectMaterial,
  onSelectColor,
  onAsideCloseClick,
  handleFiltersSubmit,
  handleChangeRange
}: IAsideProps) => {
  const trackStyle = {
    backgroundColor: '#209cee',
    height: '2px'
  }

  const railStyle = {
    backgroundColor: '#535554',
    height: '2px'
  }

  const handleStyle = {
    top: '6px',
    width: '16px',
    height: '10px',
    backgroundColor: '#209cee',
    border: 'none',
    borderRadius: 0,
    opacity: 1,
    boxShadow: 'none'
  }

  return (
    <aside className={`catalog__aside aside ${isAsideVisible ? 'opened' : ''}`}>
      <div className={`aside__box ${isAsideVisible ? 'opened' : ''}`}>
        <form
          className='aside__form'
          onSubmit={handleFiltersSubmit}
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
            <h6 className='filter__title mt-30'>{rooms.label}</h6>
            <CustomSelect
              value={rooms.value}
              options={rooms.options}
              onChange={onSelectRoom}
            />
            <h6 className='filter__title mt-30'>{materials.label}</h6>
            <CustomSelect
              value={materials.value}
              options={materials.options}
              onChange={onSelectMaterial}
            />
            <h6 className='filter__title mt-30'>{types.label}</h6>
            <CustomSelect
              value={types.value}
              options={types.options}
              onChange={onSelectType}
            />

            <h6 className='filter__title mt-30'>Price</h6>

            <Range
              range
              step={20}
              min={minPrice}
              max={maxPrice}
              value={[priceFrom, priceTo]}
              allowCross={false}
              trackStyle={trackStyle}
              railStyle={railStyle}
              handleStyle={handleStyle}
              onChange={handleChangeRange}
            />

            <div className='flex justify-between'>
              <span>{priceFrom}$</span>
              <span>{priceTo}$</span>
            </div>
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
                    onChange={onSelectColor(color.value)}
                  />
                  <span
                    className='colors__checkbox-fake'
                    style={{ backgroundColor: color.value }}
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
                  className='form__label'
                  key={value}
                >
                  <input
                    className='form__checkbox-real'
                    id={value}
                    type='checkbox'
                    checked={brands.value.includes(value)}
                    onChange={onSelectBrand(value)}
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
