import React from 'react'
import { IFurniture, IImage, IReview } from '../../api/types'
import { Modal } from '../common/Modal'
import { AttachmentsPopupBody } from './attachmentsModal'
import { Button } from '../common/Button'
import { Empty } from '../common/Empty'

type NewReviewsType = Omit<IReview, 'attachedPictures'> & {
  attachedPictures: IImage[]
}

export const ProductTabs: React.FC<{ product: IFurniture }> = ({ product }) => {
  const { reviews, specs } = product

  const attachmentsInModal = React.useRef<IImage[]>([])

  const [showAttachmentsModel, setShowAttachmentsModel] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<keyof typeof tabsContents>('features')

  const tabsContents = {
    features: {
      name: 'Specs'
    },
    reviews: {
      name: 'Reviews'
    }
  }

  const openAttachmentsModal = (attachedPictures: IImage[]) => () => {
    attachmentsInModal.current = attachedPictures
    document.body.classList.add('locked')
    setShowAttachmentsModel(true)
  }

  const onTabClick = (idx: keyof typeof tabsContents) => (e: React.MouseEvent) => {
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

  const specsToRender: string[][] = []
  specs?.split(';').forEach((string) => {
    if (string.trim().length > 0) {
      specsToRender.push(string.split(':'))
    }
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
            <div className='flex gap-20'>
              {Object.entries(tabsContents).map(([key, props]) => (
                <Button
                  className={`profile__tab ${key === activeTab ? 'profile__tab--active' : ''}`}
                  key={key}
                  title={`Click ${props.name}`}
                  type='button'
                  onClick={onTabClick(key as keyof typeof tabsContents)}
                >
                  {props.name}
                </Button>
              ))}
            </div>

            <div className='product-tabs__content mt-30'>
              {activeTab === 'features' && (
                <div className='product-tabs__content-item product-content'>
                  <div className='product-content__box'>
                    {specsToRender.map((item, idx) => (
                      <div
                        className='product-content__row'
                        key={idx}
                      >
                        <div className='product-content__line'>
                          <p className='product-content__text product-content__text--left'>{item[0]}</p>
                          <div className='product-content__dots'></div>
                        </div>
                        <p className='product-content__text product-content__text--right'>{item[1]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className='product-tabs__content-item product-content'>
                  {reviewsToRender.length === 0 ? <Empty text='No reviews yet' /> : null}
                  {reviewsToRender.map(({ id, text, score, user, attachedPictures, createdAt }) => (
                    <div
                      className='product-tabs__review'
                      key={id}
                    >
                      <div className='flex items-center'>
                        <img
                          className='product-tabs__review-avatar'
                          src={
                            user && user?.image
                              ? import.meta.env.VITE_BACKEND + user.image.url
                              : '/images/user-stub.jpg'
                          }
                          alt=''
                        />
                        <div className='product-tabs__review-right'>
                          <p className='product-tabs__review-name'>{user?.userName}</p>
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
                              style={{ width: score ? (score / 5) * 95 : 0 }}
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
                        <div className='product-tabs__review-attachments flex mt-20 gap-20'>
                          {attachedPictures.map((p) => (
                            <div
                              key={p.url}
                              onClick={openAttachmentsModal(attachedPictures)}
                              className='product-tabs__review-attach-box relative'
                            >
                              <img
                                src={import.meta.env.VITE_BACKEND + p.url}
                                className='product-tabs__review-attach'
                                alt=''
                              />
                            </div>
                          ))}
                        </div>
                      ) : null}
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
