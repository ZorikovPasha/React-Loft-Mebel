import React, { Suspense } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Footer } from '../components/layout/Footer'
import { Loader } from '../components/common/Loader'
import { MobMenu } from '../components/layout/MobMenu'
import { Header } from '../components/layout/Header/Header'
import { publicRoutes, authRoutes, initialRoute } from './routes'
import { getIsAuth } from '../redux/getters'
import { useAuth } from '../hooks/useAuth'
import { fetchItemsThunkCreator } from '../redux/actions/items'
import '../scss/style.scss'
import '../../node_modules/slick-carousel/slick/slick.css'

const AppRouter: React.FC = () => {
  const [isMobMenuOpen, setMobMenuOpen] = React.useState(false)

  const dispatch = useDispatch()
  dispatch(fetchItemsThunkCreator('?sort=asc'))

  const isAuth = useSelector(getIsAuth)
  useAuth()

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
            <Suspense
              fallback={<Loader />}
              key={path}
            >
              <Route
                path={path}
                component={component}
                exact={exact}
              />
            </Suspense>
          ))}
          {isAuth &&
            authRoutes.map(({ path, component, exact }) => (
              <Suspense
                fallback={<Loader />}
                key={path}
              >
                <Route
                  path={path}
                  component={component}
                  exact={exact}
                />
              </Suspense>
            ))}
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default AppRouter
