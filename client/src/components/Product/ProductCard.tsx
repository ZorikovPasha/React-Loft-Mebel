import React from 'react'
import Slider, { Settings } from 'react-slick'
import { useDispatch } from 'react-redux'

import { AddToFavorite } from '../common/AddToFavorite'
import { addtemsActionCreator } from '../../redux/actions/cartItems'
import CustomSelect from '../common/CustomSelect'
import { IFurniture } from '../../api/types'

interface IProductCardProps {
  product: IFurniture
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

interface ISelectField {
  value: string
  label: string
  options: ColorOptionType[]
}

export const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const dispatch = useDispatch()

  const { id, name, type, priceNew, priceOld, colors, dimensions, image } = product

  const thumbsUrls = image ? [image.url, image.url, image.url, image.url, image.url] : []

  const colorsPrepared: ColorOptionType[] = colors.map((color) => ({ value: color, label: color }))

  const fields = React.useRef<Record<string, ISelectField>>({
    quintity: {
      label: 'Количество',
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
    },
    color: {
      label: 'Цвет',
      value: colorsPrepared[0].value,
      options: colorsPrepared
    }
  })

  const [nav1, setNav1] = React.useState<Slider>()
  const [nav2, setNav2] = React.useState<Slider>()
  const [form, setForm] = React.useState(fields.current)

  const onSelect = (name: string) => (value: ColorOptionType | null) => {
    setForm((prev) => ({
      ...prev,
      [name]: {
        ...prev.name,
        value: value?.value ?? ''
      }
    }))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const dto = {
      id,
      quintity: Number(form.quintity.value),
      price: parseFloat(priceNew ? priceNew : priceOld)
    }

    dispatch(addtemsActionCreator([dto]))
  }

  return (
    <section className='product'>
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
                    src={`http://localhost:5000${url}`}
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
                    src={`http://localhost:5000${url}`}
                    alt='furniture thumb'
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className='info'>
            <div className='info__star'></div>
            <h1 className='info__title'>{name}</h1>
            <p className='info__category'>{type}</p>
            <form onSubmit={handleSubmit}>
              <div className='info__shop shop'>
                <p className='shop__price'>{priceNew ? priceNew : priceOld} P</p>
                <button
                  className='shop__btn btn'
                  type='submit'
                >
                  Купить
                </button>
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
            </form>
            <p className='info__text-title mt-20'>Описание</p>
            <p className='info__text'>
              Лаконичные линии и простые формы, безупречный стиль и индивидуальность – все это диван «Динс». Сдержанный
              скандинавский дизайн украсит любую современную обстановку. Элегантность, комфорт и функциональность,
              собранные воедино – «Динс» просто создан для размеренного отдыха в кругу семьи или компании друзей!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
