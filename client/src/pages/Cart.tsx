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
  price: number
  quintity: number
  dimension: {
    width: number
    length: number
    height: number
  }[]
  color: string
}

const Cart: React.FC = () => {
  const dispatch = useDispatch()

  const history = useHistory()
  const items = useSelector(getProducts)
  const { favorites, isLoggedIn, cart, orders } = useSelector(getUserData)

  const breadcrumbs = useBreadcrumbs()

  const [modalLoginOpened, setModalLoginOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const collectedItems =
    cart?.reduce((accum: ICollectedCartItem[], next) => {
      const currentItem = items.find((item) => item.id === next.furnitureId)
      if (!currentItem) {
        return accum
      }
      return [
        ...accum,
        {
          furnitureId: currentItem.id,
          cartItemId: next.id,
          name: currentItem.name,
          imageUrl: currentItem.image?.url ?? '',
          price: parseFloat(currentItem.priceNew ? currentItem.priceNew : currentItem.priceOld),
          quintity: next.quintity,
          dimension: currentItem.dimensions?.map(({ width, length, height }) => ({ width, length, height })) ?? [],
          color: next.color
        }
      ]
    }, []) ?? []

  const quintity = collectedItems.reduce((accum, next) => {
    return accum + next.quintity
  }, 0)
  const total = collectedItems.reduce((accum, next) => {
    return accum + next.price * next.quintity
  }, 0)

  const youMayAlsoLikeThese = cart.length ? items.filter((item) => parseFloat(item.rating) > 4) : []

  const onLoginModalClose = () => {
    setModalLoginOpened(false)
    document.documentElement.classList.remove('lock')
  }

  const onRegisterOrder = () => {
    if (!isLoggedIn) {
      setModalLoginOpened(true)
      document.documentElement.classList.add('lock')
      return
    }

    setIsLoading(true)

    UserApiClient.makeOrder()
      .then((data) => {
        setIsLoading(false)
        if (!isSuccessfullMakeOrderResponse(data)) {
          return dispatch(toggleSnackbarOpen())
        }

        const payload = {
          cart: [],
          orders: [
            ...orders,
            {
              ...data.order,
              items: !data.order.items ? [] : data.order.items
            }
          ]
        }
        dispatch(editUserActionCreator(payload))
        history.push(ROUTES.Profile + '?tab=orders')
      })
      .then(() => {
        dispatch(toggleSnackbarOpen())
      })
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
          {collectedItems.length ? (
            <>
              <div className='cart__top'>
                <p>Your cart:</p>
                <p>
                  <span className='cart__top-num'>Items: {quintity}</span>
                </p>
              </div>
              {collectedItems.map((item) => (
                <CartItem
                  key={item.name + item.color + item.quintity}
                  item={item}
                />
              ))}
              <div className='cart__bottom'>
                <p className='cart__bottom-total'>
                  Total cost:
                  <span> {total} P</span>
                </p>
                <Button
                  title='Submit order'
                  type='button'
                  className='btn'
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
                  isFavorite={favorites.includes(product.id)}
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
