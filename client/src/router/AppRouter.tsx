import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Footer } from '../components/layout/Footer'
import { Loader } from '../components/common/Loader'
import { MobMenu } from '../components/layout/MobMenu'
import { Header } from '../components/layout/Header/Header'
import { publicRoutes, authRoutes } from './routes'
import { useAuth } from '../hooks/useAuth'
import { fetchItemsThunkCreator } from '../redux/actions/items'
import { getUserData } from '../redux/getters'
import '../scss/style.scss'

export const AppRouter = () => {
  const [isMobMenuOpen, setMobMenuOpen] = React.useState(false)

  const dispatch = useDispatch()

  React.useLayoutEffect(() => {
    dispatch(fetchItemsThunkCreator())
  }, [])

  const { isLoggedIn, cart } = useSelector(getUserData)
  useAuth()

  console.log('cart', cart)

  return (
    <BrowserRouter>
      <div className='wrapper'>
        <MobMenu
          isMobMenuOpen={isMobMenuOpen}
          setMobMenuOpen={setMobMenuOpen}
        />
        <Header
          isMobMenuOpen={isMobMenuOpen}
          setMobMenuOpen={setMobMenuOpen}
        />
        <main className='main'>
          <React.Suspense fallback={<Loader />}>
            <Switch>
              {isLoggedIn &&
                authRoutes.map(({ path, component, exact }) => (
                  <Route
                    path={path}
                    key={path}
                    component={component}
                    exact={exact}
                  />
                ))}
              {publicRoutes.map(({ path, component, exact }) => (
                <Route
                  path={path}
                  key={path}
                  component={component}
                  exact={exact}
                />
              ))}
            </Switch>
          </React.Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
