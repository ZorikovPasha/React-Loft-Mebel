import React from 'react'
import { IFurniture, IImage, IReview } from '../../api/types'
import { Modal } from '../common/Modal'
import { AttachmentsPopupBody } from './attachmentsModal'

type NewReviewsType = Omit<IReview, 'attachedPictures'> & {
  attachedPictures: IImage[]
}

export const ProductTabs: React.FC<{ product: IFurniture }> = ({ product }) => {
  const { reviews } = product

  const attachmentsInModal = React.useRef<IImage[]>([])

  const [showAttachmentsModel, setShowAttachmentsModel] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState(0)

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
      name: 'Reviews'
    },
    delivery: {
      name: 'Доставка',
      items: [{ method: 'Посылка', details: 'Очень быстро, заказывайте.' }]
    }
  }

  const openAttachmentsModal = (attachedPictures: IImage[]) => () => {
    attachmentsInModal.current = attachedPictures
    document.body.classList.add('locked')
    setShowAttachmentsModel(true)
  }

  const onTabClick = (idx: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    setActiveTab(idx)
  }

  const reviewsToRender: NewReviewsType[] = []
  reviews?.forEach((r) => {
    if (!r) {
      return
    }

    const filteredAttachedPictures: IImage[] = []
    r.attachedPictures?.forEach((pic) => {
      if (!pic) {
        return
      }

      filteredAttachedPictures.push(pic)
    })
    r.attachedPictures = filteredAttachedPictures
    reviewsToRender.push(r as NewReviewsType)
  })

  const onAttachmentsodalClose = () => {
    setShowAttachmentsModel(false)
    document.body.classList.remove('locked')
  }

  return (
    <>
      {showAttachmentsModel && (
        <Modal
          bodyClass='popup__body--max'
          content={<AttachmentsPopupBody pictures={attachmentsInModal.current} />}
          onModalClose={onAttachmentsodalClose}
        />
      )}

      <section className='product-tabs mt-40'>
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
                  {reviewsToRender.map(({ id, text, score, user, attachedPictures, createdAt }) => (
                    <div
                      className='product-tabs__review'
                      key={id}
                    >
                      <div className='flex items-center'>
                        <img
                          className='product-tabs__review-avatar'
                          src={user.image ? import.meta.env.VITE_BACKEND + user.image.url : ''}
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
                        <div className='product-tabs__review-attachments flex mt-20'>
                          {attachedPictures.map((p) => (
                            <img
                              key={p.url}
                              src={import.meta.env.VITE_BACKEND + p.url}
                              className='product-tabs__review-attach'
                              alt=''
                              onClick={openAttachmentsModal(attachedPictures)}
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
    </>
  )
}
