import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetStaticProps, NextPage } from 'next'

import { Card } from '../components/common/card'
import { CartItem } from '../components/Cart/CartItem'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Empty } from '../components/common/Empty'
import { getUserData } from '../redux/getters'
import { useBreadcrumbs } from '../hooks/useBreadcrumbs'
import { PublicApiClient, UserApiClient } from '../api'
import { editUserActionCreator } from '../redux/actions/userAction'
import { isDataOfFurniture, isGetOrdersResponseSuccessfull, isSuccessfullMakeOrderResponse } from '../api/types'
import { Loader } from '../components/common/Loader'
import { ROUTES } from '../utils/const'
import { Modal } from '../components/common/Modal'
import { toggleSnackbarOpen } from '../redux/actions/errors'
import { Button } from '../components/common/Button'
import { IProcessedFurniture, sanitizeFurnitureItem, splitPriceWithSpaces } from '../utils'
import { IOrder } from '../redux/reducers/userReducer'
import { revalidate } from '../utils/const'
import Head from 'next/head'

const ModalContent = () => {
  return (
    <>
      <h3 className='popup-message__title'>We do not know who you are(</h3>
      <p className='popup-message__text'>Please log in.</p>
      <Link href={ROUTES.Login}>
        <a className='popup-message__btn'>Log in</a>
      </Link>
    </>
  )
}

interface ICollectedCartItem {
  furnitureId: number
  cartItemId: number
  name: string
  imageUrl: string
  price: number | null
  quintity: number
  dimension: {
    width: number
    length: number
    height: number
  }[]
  color: string
}

interface IProps {
  pageData: {
    furniture: IProcessedFurniture[]
  }
}

const Cart: NextPage<IProps> = ({ pageData }) => {
  const { furniture } = pageData
  const { favorites, isLoggedIn, cart } = useSelector(getUserData)

  const breadcrumbs = useBreadcrumbs()

  const collectedProductsInCart =
    cart?.reduce((accum: ICollectedCartItem[], next) => {
      const currentItem = furniture.find((item) => item.id === next.furnitureId)
      if (!currentItem || typeof currentItem.id !== 'number') {
        return accum
      }

      const currentPrice =
        typeof currentItem.priceNew === 'string' && currentItem.priceNew
          ? parseFloat(currentItem.priceNew)
          : typeof currentItem.priceOld === 'string' && currentItem.priceOld
          ? parseFloat(currentItem.priceOld)
          : null

      return accum.concat([
        {
          furnitureId: currentItem.id,
          cartItemId: next.id,
          name: currentItem.name ?? '',
          imageUrl: currentItem.image?.url ?? '',
          price: currentPrice,
          quintity: next.quintity,
          dimension: currentItem.dimensions?.map(({ width, length, height }) => ({ width, length, height })) ?? [],
          color: next.color
        }
      ])
    }, []) ?? []

  const quintity = collectedProductsInCart.reduce((accum, next) => {
    return accum + next.quintity
  }, 0)
  const total = collectedProductsInCart.reduce((accum, next) => {
    return next.price ? accum + next.price * next.quintity : 0
  }, 0)
  const totalToRender = splitPriceWithSpaces(total)
  const youMayAlsoLikeThese = cart.length
    ? furniture.filter((item) => (item.rating && typeof item.rating === 'string' ? parseFloat(item.rating) > 4 : false))
    : []

  const discountedProducts = furniture.filter((p) => {
    if (typeof p.priceOld === 'string' && typeof p.priceNew === 'string') {
      return parseFloat(p.priceOld) - parseFloat(p.priceNew) > 0
    } else {
      return false
    }
  })

  const dispatch = useDispatch()
  const router = useRouter()

  const [modalLoginOpened, setModalLoginOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const onLoginModalClose = () => {
    setModalLoginOpened(false)
    document.body.classList.remove('lock')
  }

  const onRegisterOrder = async () => {
    if (!isLoggedIn) {
      setModalLoginOpened(true)
      document.body.classList.add('lock')
      return
    }

    setIsLoading(true)

    try {
      const response = await UserApiClient.makeOrder()
      setIsLoading(false)

      if (!isSuccessfullMakeOrderResponse(response)) {
        return dispatch(toggleSnackbarOpen())
      }

      const ordersResponse = await UserApiClient.getOrders()
      if (ordersResponse && isGetOrdersResponseSuccessfull(ordersResponse)) {
        const processedOrders: IOrder[] = []
        ordersResponse.orders?.forEach((o) => {
          processedOrders.push({
            id: o.id,
            userId: o.userId,
            name: o.name,
            status:
              o.status === 'CREATED' || o.status === 'WORKING' || o.status === 'COMPLETED' || o.status === 'CANCELED'
                ? o.status
                : null,
            createdAt: o.createdAt,
            updatedAt: o.updatedAt,
            items: Array.isArray(o.items) ? o.items : []
          })
        })

        router.push(ROUTES.Profile + '?tab=orders').then(() => {
          // removing cart items last gracefully only after profile page is shown
          const payload = {
            cart: [],
            orders: processedOrders
          }
          dispatch(editUserActionCreator(payload))
        })
      }
    } catch (error) {
      setIsLoading(false)
      dispatch(toggleSnackbarOpen())
    }
  }

  return (
    <>
      <Head>
        <title>Your cart</title>
        <meta
          name='description'
          content='Loft furniture for your slick modern designes'
        />
      </Head>

      {isLoading && <Loader rootElClass='loader--fixed' />}
      {modalLoginOpened && (
        <Modal
          onModalClose={onLoginModalClose}
          content={<ModalContent />}
        />
      )}
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {isLoggedIn ? (
        <>
          <section className='cart'>
            <div className='container'>
              {collectedProductsInCart.length ? (
                <>
                  <div className=''>
                    <p className='cart__bottom-total'>Items: {quintity}</p>
                    <p className='cart__bottom-total'>
                      Total cost:
                      <span className='fw-500'> {totalToRender}$</span>
                    </p>
                  </div>
                  <div className='mt-20'>
                    {collectedProductsInCart.map((item) => (
                      <CartItem
                        key={item.name + item.color + item.quintity}
                        item={item}
                      />
                    ))}
                  </div>
                  <div className='cart__bottom flex items-center mt-40'>
                    <p className='cart__bottom-total'>
                      Total cost:
                      <span className='fw-500'> {totalToRender}$</span>
                    </p>
                    <Button
                      title='Submit order'
                      type='button'
                      className='cart__bottom-btn btn'
                      onClick={onRegisterOrder}
                    >
                      Submit order
                    </Button>
                  </div>
                </>
              ) : (
                <Empty text='There is nothing in here('></Empty>
              )}
            </div>
          </section>
          {youMayAlsoLikeThese.length ? (
            <section className='sales mt-30'>
              <div className='container'>
                <h6 className='sales__title'>You may also like:</h6>
                <div className='sales__items sales__items--cart'>
                  {youMayAlsoLikeThese.map((product) => (
                    <Card
                      key={product.id}
                      product={product}
                      isFavorite={typeof product.id === 'number' ? favorites.includes(product.id) : false}
                    />
                  ))}
                </div>
              </div>
            </section>
          ) : null}
          {discountedProducts.length ? (
            <section className='sales mt-30'>
              <div className='container'>
                <h6 className='sales__title'>These products under sale wont last long without you!</h6>
                <div className='sales__items sales__items--cart'>
                  {discountedProducts.map((product) => (
                    <Card
                      key={product.id}
                      product={product}
                      isFavorite={typeof product.id === 'number' ? favorites.includes(product.id) : false}
                    />
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </>
      ) : (
        <div className='container'>
          <Empty text='There is nothing in here('>
            <p className='favorites__empty-p mt-20'>Please login to see your cart</p>
          </Empty>
        </div>
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps<IProps> = async () => {
  let allProducts: IProcessedFurniture[] = []
  try {
    const furniture = await PublicApiClient.getFurniture('')
    if (isDataOfFurniture(furniture)) {
      allProducts = furniture.all.map(sanitizeFurnitureItem)
    }
  } catch (error) {
    console.log('error')
  }

  return {
    props: {
      pageData: {
        furniture: allProducts
      }
    },
    revalidate
  }
}

export default Cart
