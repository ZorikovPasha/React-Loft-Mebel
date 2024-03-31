import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import { Provider } from 'react-redux'

import { Layout } from '../layout'
import '../scss/style.scss'
import { store } from '../redux/store'

interface AppPropsWithLayout extends AppProps {
  Component: NextPage
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
