import React from 'react'
import { Provider } from 'react-redux'
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import store from './redux/store'
import { AppRouter } from './router/AppRouter'

export const App: React.FC = () => {
  return (
    // <QueryClientProvider client={new QueryClient()}>
    <Provider store={store}>
      <AppRouter />
    </Provider>
    // </QueryClientProvider>
  )
}
