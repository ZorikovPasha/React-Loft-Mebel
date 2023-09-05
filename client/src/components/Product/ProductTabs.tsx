import React from 'react'
import { IFurniture, IImage } from '../../api/types'

export const ProductTabs: React.FC<{ product: IFurniture }> = ({ product }) => {
  const { reviews } = product
  const [activeTab, setActiveTab] = React.useState(0)

  console.log('reviews', reviews)

  const tabsContents = {
    features: {
      name: 'Характеристки',
      items: [
        { feature: 'Размер', value: '218 × 95 × 90 <span>(Дл. × Шир. × Выс.)</span>' },
        { feature: 'Спальное место', value: '195 × 144 × 44 <span>(Дл. × Шир. × Выс.)</span>' },
        { feature: 'Посадочное место', value: '50 × 44 (Глуб. × Выс.)' },
        { feature: 'Каркас', value: 'массив, фанера, ДВП, пружинная змейка' },
        { feature: 'Механизм', value: 'пантограф' },
        { feature: 'Материал ножек', value: 'массив' },
        { feature: 'Наполнение подушек', value: 'крошка ППУ, холлофайбер' }
      ]
    },
    reviews: {
      name: 'Отзывы',
      items: [
        { id: 1, text: 'Все прекрасно!' },
        { id: 2, text: 'Нет, ну это просто чудо!' },
        { id: 3, text: 'Качество - во!' }
      ]
    },
    delivery: {
      name: 'Доставка',
      items: [{ method: 'Посылка', details: 'Очень быстро, заказывайте.' }]
    }
  }

  const onTabClick = (idx: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    setActiveTab(idx)
  }

  const reviewToRender =
    reviews?.map((r) => ({
      ...r,
      attachedPictures:
        r.attachedPictures?.reduce((accum: IImage[], next) => {
          return next ? [...accum, next] : accum
        }, []) ?? []
    })) ?? []

  return (
    <section className='product-tabs'>
      <div className='container'>
        <div className='product-tabs__inner'>
          <div className='product-tabs__toggle'>
            {Object.entries(tabsContents).map((tab, idx) => (
              <a
                className={`product-tabs__title ${activeTab === idx ? 'active' : ''}`}
                key={tab[0]}
                href='/#'
                data-index={idx}
                onClick={onTabClick(idx)}
              >
                {tab[1].name}
              </a>
            ))}
          </div>

          <div className='product-tabs__content'>
            {activeTab === 0 && (
              <div className='product-tabs__content-item product-content'>
                <div className='product-content__box'>
                  <div className='product-content__row'>
                    <div className='product-content__line'>
                      <p className='product-content__text product-content__text--left'>Размер</p>
                      <div className='product-content__dots'></div>
                    </div>
                    <p className='product-content__text product-content__text--right'>
                      218 × 95 × 90 <span>(Дл. × Шир. × Выс.)</span>
                    </p>
                  </div>

                  <div className='product-content__row'>
                    <div className='product-content__line'>
                      <p className='product-content__text product-content__text--left'>Спальное место</p>
                      <div className='product-content__dots'></div>
                    </div>
                    <p className='product-content__text product-content__text--right'>
                      195 × 144 × 44 <span>(Дл. × Шир. × Выс.)</span>
                    </p>
                  </div>

                  <div className='product-content__row'>
                    <div className='product-content__line'>
                      <p className='product-content__text product-content__text--left'>Посадочное место</p>
                      <div className='product-content__dots'></div>
                    </div>
                    <p className='product-content__text product-content__text--right'>50 × 44 (Глуб. × Выс.)</p>
                  </div>

                  <div className='product-content__row'>
                    <div className='product-content__line'>
                      <p className='product-content__text product-content__text--left'>Каркас</p>
                      <div className='product-content__dots'></div>
                    </div>
                    <p className='product-content__text product-content__text--right'>
                      массив, фанера, ДВП, пружинная змейка
                    </p>
                  </div>

                  <div className='product-content__row'>
                    <div className='product-content__line'>
                      <p className='product-content__text product-content__text--left'>Механизм</p>
                      <div className='product-content__dots'></div>
                    </div>
                    <p className='product-content__text product-content__text--right'>пантограф</p>
                  </div>

                  <div className='product-content__row'>
                    <div className='product-content__line'>
                      <p className='product-content__text product-content__text--left'>Материал ножек</p>
                      <div className='product-content__dots'></div>
                    </div>
                    <p className='product-content__text product-content__text--right'>массив</p>
                  </div>

                  <div className='product-content__row'>
                    <div className='product-content__line'>
                      <p className='product-content__text product-content__text--left'>Наполнение подушек</p>
                      <div className='product-content__dots'></div>
                    </div>
                    <p className='product-content__text product-content__text--right'>крошка ППУ, холлофайбер</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 1 && (
              <div className='product-tabs__content-item product-content'>
                {reviewToRender.map(({ id, text, score, user, attachedPictures, createdAt }) => (
                  <div
                    className='product-tabs__review'
                    key={id}
                  >
                    <div className='flex items-center'>
                      <img
                        className='product-tabs__review-avatar'
                        src={user.image ? `${import.meta.env.VITE_BACKEND}${user.image.url}` : ''}
                        alt=''
                      />
                      <div className='product-tabs__review-right'>
                        <p className='product-tabs__review-name'>{user.userName}</p>
                        <p className='mt-5'>{new Date(createdAt).toLocaleDateString()}</p>
                        <div className='flex info__rating-parent mt-5'>
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
                            style={{ width: (score / 5) * 95 }}
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
                      </div>
                    </div>

                    <p className='product-tabs__review-p mt-30'>{text}</p>
                    {attachedPictures.length ? (
                      <div className='flex mt-20'>
                        {attachedPictures.map((p) => (
                          <img
                            key={p.url}
                            src={import.meta.env.VITE_BACKEND + p.url}
                            className='product-tabs__review-attach'
                            alt=''
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
            {activeTab === 2 && (
              <div className='product-tabs__content-item product-content'>
                {tabsContents.delivery.items.map(({ details, method }) => (
                  <div key={details}>
                    <span>{method}: </span>
                    {details}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
