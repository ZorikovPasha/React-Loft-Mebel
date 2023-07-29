import React, { FC } from 'react'
import { Formik, FieldArray } from 'formik'

import { CustomSelect } from '../index'

import { submitValuesType } from '../../types'

interface IAsideProps {
  isAsideVisible: boolean
  onAsideCloseClick: React.MouseEventHandler<HTMLButtonElement>
  handleFiltersSubmit: (values: submitValuesType) => void
}

const Aside: FC<IAsideProps> = ({ isAsideVisible, onAsideCloseClick, handleFiltersSubmit }) => {
  const roomSelectOptions = [
    { value: 'all', label: 'Показать все' },
    { value: 'living', label: 'Гостинные' },
    { value: 'kitchen', label: 'Кухни' },
    { value: 'bedroom', label: 'Спальные' },
    { value: 'children', label: 'Детские' },
    { value: 'hall', label: 'Прихожие' },
    { value: 'office', label: 'Офисная мебель' }
  ]

  const catSelectOptions = [
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
    { id: 'E94848', name: 'E94848' },
    { id: '43BF57', name: '43BF57' },
    { id: 'E4E4E4', name: 'E4E4E4' },
    { id: '3E3E3E', name: '3E3E3E' },
    { id: '675A5A', name: '675A5A' }
  ]

  const initValues = {
    room: 'all',
    material: 'all',
    type: 'all',
    colorsIds: [] as string[],
    brandsIds: [] as string[]
  }

  return (
    <aside className={`catalog__aside aside ${isAsideVisible ? 'opened' : ''}`}>
      <div className={`aside__box ${isAsideVisible ? 'opened' : ''}`}>
        <Formik
          initialValues={initValues}
          onSubmit={handleFiltersSubmit}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <form
              className='aside__form'
              onSubmit={handleSubmit}
            >
              <div className='aside__filter filter'>
                <h6 className='filter__title'>Раздел</h6>
                <button
                  className='aside__close'
                  onClick={onAsideCloseClick}
                />
                <CustomSelect
                  value={values.room}
                  options={roomSelectOptions}
                  onChange={(value) => setFieldValue('room', value?.value)}
                />
                <h6 className='filter__title'>Материал Мебели</h6>
                <CustomSelect
                  value={values.material}
                  options={catSelectOptions}
                  onChange={(value) => setFieldValue('material', value?.value)}
                />
                <h6 className='filter__title'>Тип Мебели</h6>
                <CustomSelect
                  value={values.type}
                  options={furnitureSelectOptions}
                  onChange={(value) => setFieldValue('type', value?.value)}
                />
              </div>

              {/* <div className="aside__filter filter">
                <h6 className="filter__title">Цена</h6>
                <input className="filter__range" type="text" name="my_range" value="" data-type="double" data-min="0" data-max="120000" data-from="2000" data-to="102000" data-grid="false" />
              </div> */}

              <div className='aside__filter filter'>
                <h6 className='filter__title'>Цвет</h6>
                <FieldArray
                  name='colorsIds'
                  render={(arrayHelpers) => (
                    <div className='filter__colors colors'>
                      {colorsCategories.map((color) => (
                        <label
                          className='colors__item'
                          key={color.id}
                        >
                          <input
                            className='colors__checkbox-real'
                            id={color.id}
                            type='checkbox'
                            checked={values.colorsIds.includes(color.id)}
                            onChange={(e) => {
                              if (e.target.checked) arrayHelpers.push(color.id)
                              else {
                                const idx = values.colorsIds.indexOf(color.id)
                                arrayHelpers.remove(idx)
                              }
                            }}
                          />
                          <span
                            className='colors__checkbox-fake'
                            style={{ backgroundColor: '#' + color.id }}
                          ></span>
                        </label>
                      ))}
                    </div>
                  )}
                />
              </div>

              <div className='aside__filter brands-filter'>
                <h6 className='filter__title'>Бренд</h6>
                <FieldArray
                  name='brandsIds'
                  render={(arrayHelpers) => (
                    <div>
                      {furnitureBrandOptions.map(({ value, label }) => (
                        <label
                          className='brands-filter__label'
                          key={value}
                        >
                          <input
                            className='brands-filter__checkbox-real'
                            id={value}
                            type='checkbox'
                            checked={values.brandsIds.includes(value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                arrayHelpers.push(value)
                              } else {
                                const idx = values.brandsIds.indexOf(value)
                                arrayHelpers.remove(idx)
                              }
                            }}
                          />
                          <span className='brands-filter__checkbox-fake'></span>
                          <span className='brands-filter__text'>{label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                />
              </div>
              <button
                className='aside__btn'
                type='submit'
              >
                Подобрать
              </button>
            </form>
          )}
        </Formik>
      </div>
    </aside>
  )
}

export default Aside
