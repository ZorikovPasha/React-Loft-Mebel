import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Modal } from '../common/Modal'
import { AttachmentsPopupBody } from './attachmentsModal'
import { Button } from '../common/Button'
import { Empty } from '../common/Empty'
import { IProcessedFurniture, IProcessedReview } from '../../utils'
import { IImage } from '../../../../server/src/furniture/types'
import { UserApiClient } from '../../api'
import { isReviewWasHelpfullSuccess } from '../../api/types'
import { toggleSnackbarOpen } from '../../redux/actions/errors'
import { bumpReviewHelpCount, dumpReviewHelpCount } from '../../redux/actions/items'
import { getProductById, getUserData } from '../../redux/getters'

type NewReviewsType = Omit<IProcessedReview, 'attachedPictures'> & {
  attachedPictures: IImage[]
}

interface IProps {
  product: IProcessedFurniture
}

export const ProductTabs = ({ product: initialProduct }: IProps) => {
  const tabsContents = {
    features: {
      name: 'Specs'
    },
    reviews: {
      name: 'Reviews'
    }
  }

  const product = useSelector(getProductById(initialProduct.id)) ?? initialProduct
  const { isLoggedIn } = useSelector(getUserData)

  const specsToRender: string[][] = []
  product.specs?.split(';').forEach((string) => {
    if (string.trim().length > 0) {
      specsToRender.push(string.split(':'))
    }
  })

  const reviewsToRender: NewReviewsType[] = []
  product.reviews?.forEach((r) => {
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
  const attachmentsInModal = React.useRef<IImage[]>([])

  const userState = useSelector(getUserData)

  const [showAttachmentsModel, setShowAttachmentsModel] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<keyof typeof tabsContents>('features')
  const [helpfulReviews, setHelpfulReviews] = React.useState<number[]>([])

  const dispatch = useDispatch()

  React.useEffect(() => {
    setHelpfulReviews((prev) => {
      const newState: number[] = []
      userState.reviews.forEach((r) => {
        if (!prev.includes(r.id) && r.helpfulForThisUser) {
          newState.push(r.id)
        }
      })

      return [...prev, ...newState]
    })
  }, [userState.reviews, userState.reviews.length])

  const openAttachmentsModal = (attachedPictures: IImage[]) => () => {
    attachmentsInModal.current = attachedPictures
    document.body.classList.add('locked')
    setShowAttachmentsModel(true)
  }

  const onTabClick = (idx: keyof typeof tabsContents) => (e: React.MouseEvent) => {
    e.preventDefault()
    setActiveTab(idx)
  }

  const onAttachmentsodalClose = () => {
    setShowAttachmentsModel(false)
    document.body.classList.remove('locked')
  }

  const thisReviewIsHelpful = (reviewId: number | null) => async () => {
    if (!isLoggedIn) {
      return dispatch(toggleSnackbarOpen('You are not logged in. Please login.', 'warning'))
    }

    if (reviewId === null) {
      return
    }

    try {
      const res = await UserApiClient.thisReviewWasHelpfull(reviewId)
      if (isReviewWasHelpfullSuccess(res)) {
        if (res.wasHelpfull) {
          setHelpfulReviews((prev) => (prev.includes(reviewId) ? prev : [...prev, reviewId]))
          dispatch(bumpReviewHelpCount(product.id, reviewId))
        } else {
          setHelpfulReviews((prev) => prev.filter((number) => number !== reviewId))
          dispatch(dumpReviewHelpCount(product.id, reviewId))
        }
      } else if (res?.statusCode === 401) {
        // means user has not logged in
        dispatch(toggleSnackbarOpen('You are not logged in. Please login.', 'warning'))
      } else {
        dispatch(toggleSnackbarOpen())
      }
    } catch (error) {
      dispatch(toggleSnackbarOpen())
    }
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
                <div className='product-tabs__content-item'>
                  <div className='product-tabs__photos flex'>
                    {reviewsToRender.map(({ attachedPictures }) => {
                      return attachedPictures.map(({ url }) => (
                        <div
                          className='product-tabs__photo'
                          key={url}
                        >
                          <img
                            src={process.env.NEXT_PUBLIC_BACKEND + url}
                            alt=''
                          />
                        </div>
                      ))
                    })}
                  </div>

                  {reviewsToRender.length === 0 ? <Empty text='No reviews yet' /> : null}
                  {reviewsToRender.map(
                    ({ id, text, score, user, attachedPictures, createdAt, usersFoundThisHelpful }) => (
                      <div
                        className='product-tabs__review'
                        key={id}
                      >
                        <div className='flex items-center'>
                          <img
                            className='product-tabs__review-avatar'
                            src={
                              user && user?.image
                                ? process.env.NEXT_PUBLIC_BACKEND + user.image.url
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
                                  src={process.env.NEXT_PUBLIC_BACKEND + p.url}
                                  className='product-tabs__review-attach'
                                  alt=''
                                />
                              </div>
                            ))}
                          </div>
                        ) : null}
                        <p className='product-tabs__review-label mt-20'>Did this review help you?</p>
                        <button
                          type='button'
                          className={`product-tabs__review-button ${
                            typeof id === 'number' && helpfulReviews.includes(id) ? 'active' : ''
                          }`}
                          onClick={thisReviewIsHelpful(id)}
                        >
                          Yes {usersFoundThisHelpful}
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
