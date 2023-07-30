import React from 'react'
import Slider, { Settings } from 'react-slick'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'

import { AddToFavorite } from '../common/AddToFavorite'
import { addtemsActionCreator } from '../../redux/actions/cartItems'
import { ProductType } from '../../types'
import { CustomSelect } from '../common/CustomSelect'

interface IProductCardProps {
  product: ProductType
}

const SliderPrevArrow: React.FC = () => {
  return (
    <button className='slick-btn slick-prev'>
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
    </button>
  )
}

const SliderNextArrow: React.FC = () => {
  return (
    <button className='slick-btn slick-next'>
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
    </button>
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

type submitValuesType = {
  quintity: string
  color: string
  dimensions: string
}

export const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const { id, thumbsUrls, imageUrl, name, type, priceNew, colors, dimensions } = product

  const dispatch = useDispatch()

  const [nav1, setNav1] = React.useState<Slider>()
  const [nav2, setNav2] = React.useState<Slider>()

  const colorsPrepared: ColorOptionType[] = []
  colors.forEach((color, idx) => (colorsPrepared[idx] = { value: color, label: color }))

  const handleSubmit = ({ quintity, color, dimensions }: submitValuesType) => {
    dispatch(
      addtemsActionCreator([
        {
          id: id,
          colors: [color],
          quintity: Number(quintity),
          dimensions: {
            width: parseInt(dimensions.split('×')[0]),
            length: parseInt(dimensions.split('×')[1]),
            height: parseInt(dimensions.split('×')[2])
          },
          price: priceNew
        }
      ])
    )
  }

  return (
    <section className='product'>
      <div className='container'>
        <div className='product__inner'>
          <div className='product__images'>
            <Slider
              className='product__slider'
              asNavFor={nav2}
              ref={(slider1: Slider) => setNav1(slider1)}
              {...slider1Settings}
            >
              {thumbsUrls.map((url) => (
                <div
                  className='product__slider-item'
                  key={url}
                >
                  <img
                    src={'../../../' + imageUrl}
                    alt='furniture'
                  />
                </div>
              ))}
            </Slider>
            <Slider
              className='product__thumbs'
              asNavFor={nav1}
              ref={(slider2: Slider) => setNav2(slider2)}
              {...slider2Settings}
            >
              {thumbsUrls.map((url) => (
                <div
                  className='product__thumb'
                  key={url}
                >
                  <img
                    src={'../../../' + imageUrl}
                    alt='furniture thumb'
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className='product__info info'>
            <div className='info__star'></div>
            <h1 className='info__title'>{name}</h1>
            <p className='info__category'>{type.label}</p>

            <Formik
              initialValues={{
                quintity: '1',
                color: colorsPrepared[0].value,
                dimensions: `${dimensions.width} CM × ${dimensions.length} CM × ${dimensions.height} CM`
              }}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, handleSubmit }) => (
                <form
                  action=''
                  onSubmit={handleSubmit}
                >
                  <div className='info__shop shop'>
                    <p className='shop__price'>{priceNew} P</p>
                    <button
                      className='shop__btn'
                      type='submit'
                    >
                      Купить
                    </button>
                    <AddToFavorite id={id} />
                  </div>
                  <div className='info__features features'>
                    <div className='features__col features__col--color'>
                      <p className='features__title'>Цвет</p>
                      <CustomSelect
                        value={values.color}
                        options={colorsPrepared}
                        onChange={(value) => setFieldValue('color', value?.value)}
                      />
                    </div>
                    <div className='features__col features__col--quintity'>
                      <p className='features__title'>Количество</p>
                      <CustomSelect
                        value={values.quintity}
                        options={[
                          { value: '1', label: '1' },
                          { value: '2', label: '2' },
                          { value: '3', label: '3' },
                          { value: '4', label: '4' }
                        ]}
                        onChange={(value) => setFieldValue('quintity', value?.value)}
                      />
                    </div>
                    <div className='features__col features__col--size'>
                      <p className='features__title'>Размер (Д × Ш × В)</p>
                      <CustomSelect
                        value={values.dimensions}
                        options={[
                          {
                            value: `${dimensions.width} CM × ${dimensions.length} CM × ${dimensions.height} CM`,
                            label: `${dimensions.width} CM × ${dimensions.length} CM × ${dimensions.height} CM`
                          }
                        ]}
                        onChange={(value) => setFieldValue('dimensions', value?.value)}
                      />
                    </div>
                  </div>
                </form>
              )}
            </Formik>
            <p className='info__text-title'>Описание</p>
            <p className='info__text'>
              Лаконичные линии и простые формы, безупречный стиль и индивидуальность – все это диван «Динс». Сдержанный скандинавский дизайн украсит любую
              современную обстановку. Элегантность, комфорт и функциональность, собранные воедино – «Динс» просто создан для размеренного отдыха в кругу семьи
              или компании друзей!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
