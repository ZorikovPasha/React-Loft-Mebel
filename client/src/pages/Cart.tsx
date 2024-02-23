import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { Card } from '../components/common/card'
import { CartItem } from '../components/Cart/CartItem'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Empty } from '../components/common/Empty'
import { getProducts, getUserData } from '../redux/getters'
import { useBreadcrumbs } from '../hooks/useBreadcrumbs'
import { UserApiClient } from '../api'
import { editUserActionCreator } from '../redux/actions/userAction'
import { isSuccessfullMakeOrderResponse } from '../api/types'
import { Loader } from '../components/common/Loader'
import { ROUTES } from '../utils/const'
import { Modal } from '../components/common/Modal'
import { toggleSnackbarOpen } from '../redux/actions/errors'
import { Button } from '../components/common/Button'
import { splitPriceWithSpaces } from '../utils'

const ModalContent: React.FC = () => {
  return (
    <>
      <h3 className='popup-message__title'>We do not know who you are(</h3>
      <p className='popup-message__text'>Please log in.</p>
      <Link
        to={ROUTES.Login}
        className='popup-message__btn'
      >
        Log in
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

const Cart = () => {
  const dispatch = useDispatch()

  const history = useHistory()
  const items = useSelector(getProducts)
  const { favorites, isLoggedIn, cart, orders } = useSelector(getUserData)

  const breadcrumbs = useBreadcrumbs()

  const [modalLoginOpened, setModalLoginOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const collectedProductsInCart =
    cart?.reduce((accum: ICollectedCartItem[], next) => {
      const currentItem = items.find((item) => item.id === next.furnitureId)
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
    ? items.filter((item) => (item.rating && typeof item.rating === 'string' ? parseFloat(item.rating) > 4 : false))
    : []

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

      const payload = {
        cart: [],
        orders: orders.concat(
          Object.assign(response.order, {
            items: response.order.items ?? []
          })
        )
      }
      dispatch(editUserActionCreator(payload))
      history.push(ROUTES.Profile + '?tab=orders')
    } catch (error) {
      dispatch(toggleSnackbarOpen())
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      {modalLoginOpened && (
        <Modal
          onModalClose={onLoginModalClose}
          content={<ModalContent />}
        />
      )}
      <Breadcrumbs breadcrumbs={breadcrumbs} />
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
            <Empty text='There is nothing in here(' />
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
    </>
  )
}

export default Cart
