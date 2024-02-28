import ReactDOM from 'react-dom'
import { App } from './App'
// @ts-expect-error: React should be in scope when useing jsx
import React from 'react'
import { disableReactDevTools } from './utils'

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}
ReactDOM.render(<App />, document.getElementById('root'))
