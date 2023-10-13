import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Fuse from 'fuse.js'

import { Footer } from '../components/layout/Footer'
import { Loader } from '../components/common/Loader'
import { MobMenu } from '../components/layout/MobMenu'
import { Header } from '../components/layout/Header/Header'
import { publicRoutes, authRoutes, WithPathname } from './routes'
import { useAuth } from '../hooks/useAuth'
import { fetchItemsThunkCreator } from '../redux/actions/items'
import { getProducts } from '../redux/getters'
import '../scss/style.scss'
import { Snackbar } from '../components/common/snackBar'
import { editSearchActionCreator } from '../redux/actions/search'

export const AppRouter = () => {
  const [isMobMenuOpen, setMobMenuOpen] = React.useState(false)

  const dispatch = useDispatch()
  const products = useSelector(getProducts)

  React.useLayoutEffect(() => {
    dispatch(fetchItemsThunkCreator())
  }, [])

  React.useEffect(() => {
    const searchData = products.map((p) => ({
      title: p.name,
      link: `/products/${p.id}`,
      texts: [] as string[]
    }))

    const payload = {
      searchEngine: new Fuse(searchData, { keys: ['title', 'texts'] })
    }
    dispatch(editSearchActionCreator(payload))
  }, [products])

  useAuth()

  return (
    <BrowserRouter>
      <div className='wrapper'>
        <Snackbar />

        <MobMenu
          isMobMenuOpen={isMobMenuOpen}
          setMobMenuOpen={setMobMenuOpen}
        />
        <Header
          isMobMenuOpen={isMobMenuOpen}
          setMobMenuOpen={setMobMenuOpen}
        />
        <main className='main'>
          <React.Suspense fallback={<Loader rootElClass='loader loader--vertical' />}>
            <Switch>
              {authRoutes.map(({ path, component, exact }) => (
                <Route
                  path={path}
                  key={path}
                  render={() => <WithPathname>{component}</WithPathname>}
                  exact={exact}
                />
              ))}
              {publicRoutes.map(({ path, component, exact }) => (
                <Route
                  path={path}
                  key={path}
                  render={() => <WithPathname>{component}</WithPathname>}
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
