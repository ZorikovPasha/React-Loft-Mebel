import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { SalesItem } from '../components/common/SalesItem'
import { CartItem } from '../components/Cart/CartItem'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Empty } from '../components/common/Empty'
import { ModalInfo } from '../components/common/ModalInfo'
import { getProducts, getUserData } from '../redux/getters'
import { useBreadcrumbs } from '../hooks/useBreadcrumbs'
import { UserApiClient } from '../api'
import { setOrderStatusActionCreator } from '../redux/actions/cartItems'
import { setPathnameActionCreator } from '../redux/actions/pathname'

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
  colors: string[]
}

const Cart: React.FC = () => {
  const [modalLoginOpened, setModalLoginOpened] = React.useState(false)
  const dispatch = useDispatch()

  const items = useSelector(getProducts)
  const { favorites, isLoggedIn, cart } = useSelector(getUserData)

  const breadcrumbs = useBreadcrumbs()

  React.useLayoutEffect(() => {
    dispatch(setPathnameActionCreator(window.location.pathname))

    return () => {
      dispatch(setPathnameActionCreator('whatever'))
    }
  }, [])

  const onRegisterOrder = () => {
    if (!isLoggedIn) {
      setModalLoginOpened(true)
      document.documentElement.classList.add('lock')
      return
    }

    UserApiClient.makeOrder()
    dispatch(setOrderStatusActionCreator(true))
  }

  const onLoginModalClose: React.MouseEventHandler<HTMLButtonElement> = () => {
    setModalLoginOpened(false)
    document.documentElement.classList.remove('lock')
  }

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
          colors: currentItem.colors
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
  return (
    <>
      {modalLoginOpened && (
        <ModalInfo
          text='Пожалуйста, войдите в свою учетную запись'
          title='Мы не знаем, кто вы'
          link='/login'
          onModalClose={onLoginModalClose}
        />
      )}
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section className='cart'>
        <div className='container'>
          {collectedItems.length ? (
            <>
              <div className='cart__top'>
                <p>Ваша корзина</p>
                <p>
                  <span className='cart__top-num'>Items: {quintity}</span>
                </p>
              </div>
              {collectedItems.map((item) => (
                <CartItem
                  key={item.name}
                  item={item}
                />
              ))}
              <div className='cart__bottom'>
                <p className='cart__bottom-total'>
                  Итоговая стоимость:
                  <span> {total} P</span>
                </p>
                <button
                  className='btn'
                  onClick={onRegisterOrder}
                >
                  Оформить заказ
                </button>
              </div>
            </>
          ) : (
            <Empty text='Вы ничего не добавили в корзину(' />
          )}
        </div>
      </section>
      {youMayAlsoLikeThese.length ? (
        <section className='sales mt-30'>
          <div className='container'>
            <h3 className='sales__title'>Вам может понравиться</h3>
            <div className='sales__items sales__items--cart'>
              {youMayAlsoLikeThese.map((product) => (
                <SalesItem
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
