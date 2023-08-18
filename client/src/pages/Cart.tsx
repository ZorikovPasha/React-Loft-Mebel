import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { SalesItem } from '../components/common/SalesItem'
import { CartItem } from '../components/Cart/CartItem'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Empty } from '../components/common/Empty'
import { Loader } from '../components/common/Loader'
import { ModalInfo } from '../components/common/ModalInfo'
import {
  getCartItems,
  getTotalCost,
  getProducts,
  getOrderStatus,
  getCartLoadingState,
  getUserData,
  getCartItemsQuintity
} from '../redux/getters'
import { useBreadcrumbs } from '../hooks/useBreadcrumbs'
import { UserApiClient } from '../api'
import { resetCartActionCreator } from '../redux/actions/cartItems'
import { setOrderStatusActionCreator } from '../redux/actions/cartItems'

const Cart: React.FC = () => {
  const [modalLoginOpened, setModalLoginOpened] = React.useState(false)
  const dispatch = useDispatch()

  const cartItems = useSelector(getCartItems)
  const quintity = useSelector(getCartItemsQuintity)
  const total = useSelector(getTotalCost)
  const items = useSelector(getProducts)
  const { favorites, isLoggedIn } = useSelector(getUserData)
  const isOrderMade = useSelector(getOrderStatus)
  const isLoaded = useSelector(getCartLoadingState)

  const breadcrumbs = useBreadcrumbs()

  const onRegisterOrder = () => {
    if (!isLoggedIn) {
      setModalLoginOpened(true)
      document.documentElement.classList.add('lock')
      return
    }

    UserApiClient.makeOrder()
    dispatch(resetCartActionCreator())
    dispatch(setOrderStatusActionCreator(true))
  }

  const onLoginModalClose: React.MouseEventHandler<HTMLButtonElement> = () => {
    setModalLoginOpened(false)
    document.documentElement.classList.remove('lock')
  }

  const collectedItems = cartItems
    ?.map((cartItem) => {
      const currentItem = items.find((item) => item.id === cartItem.id)
      if (!currentItem) {
        return
      }

      return {
        furnitureId: currentItem.id,
        cartItemId: cartItem.id,
        name: currentItem.name,
        imageUrl: currentItem.image?.url ?? '',
        price: parseFloat(currentItem.priceNew ? currentItem.priceNew : currentItem.priceOld),
        quintity: cartItem.quintity,
        dimension: currentItem.dimensions,
        colors: currentItem.colors
      }
    })
    .filter((c) => Boolean(c))

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
          {!isLoaded && isLoggedIn ? (
            <Loader />
          ) : !cartItems.length ? (
            <Empty text={`${isOrderMade ? 'Ваш заказ успешно добавлен!' : 'Вы ничего не добавили в корзину('}`} />
          ) : (
            <>
              <div className='cart__top'>
                <p>Ваша корзина</p>
                <p>
                  <span className='cart__top-num'>Предметов: {quintity}</span>
                </p>
              </div>
              {collectedItems.map((item) =>
                item ? (
                  <CartItem
                    key={item.name}
                    item={item}
                  />
                ) : null
              )}
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
          )}
        </div>
      </section>
      {cartItems.length ? (
        <section className='sales'>
          <div className='container'>
            <h3 className='sales__title'>Вам может понравиться</h3>
            <div className='sales__items sales__items--cart'>
              {items &&
                items
                  .filter((item) => item.id < 4)
                  .map((product) => (
                    <SalesItem
                      key={product.id}
                      product={product}
                      isFavorite={favorites.includes(product.id)}
                    />
                  ))}
            </div>
          </div>
        </section>
      ) : (
        ''
      )}
    </>
  )
}

export default Cart
