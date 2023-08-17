import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Footer } from '../components/layout/Footer'
import { Loader } from '../components/common/Loader'
import { MobMenu } from '../components/layout/MobMenu'
import { Header } from '../components/layout/Header/Header'
import { publicRoutes, authRoutes, initialRoute } from './routes'
import { useAuth } from '../hooks/useAuth'
import { fetchItemsThunkCreator } from '../redux/actions/items'
import '../scss/style.scss'
import { getUserData } from '../redux/getters'
import { ROUTES } from '../utils/const'

export const AppRouter = () => {
  const [isMobMenuOpen, setMobMenuOpen] = React.useState(false)

  const dispatch = useDispatch()
  dispatch(fetchItemsThunkCreator())

  const { isLoggedIn } = useSelector(getUserData)
  useAuth()

  console.log('isAuth', isLoggedIn)

  return (
    <div className='wrapper'>
      <BrowserRouter>
        <MobMenu
          isMobMenuOpen={isMobMenuOpen}
          setMobMenuOpen={setMobMenuOpen}
        />
        <Header
          isMobMenuOpen={isMobMenuOpen}
          setMobMenuOpen={setMobMenuOpen}
        />
        <main className='main'>
          <Route
            path={initialRoute.path}
            component={initialRoute.component}
            exact={initialRoute.exact}
          />
          {publicRoutes.map(({ path, component, exact }) => (
            <React.Suspense
              fallback={<Loader />}
              key={path}
            >
              <Route
                path={path}
                component={component}
                exact={exact}
              />
            </React.Suspense>
          ))}
          {isLoggedIn ? (
            authRoutes.map(({ path, component, exact }) => (
              <React.Suspense
                fallback={<Loader />}
                key={path}
              >
                <Route
                  path={path}
                  component={component}
                  exact={exact}
                />
              </React.Suspense>
            ))
          ) : (
            <Redirect to={ROUTES.Login} />
          )}
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  )
}
