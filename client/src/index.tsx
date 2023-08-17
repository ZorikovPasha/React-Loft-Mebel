import ReactDOM from 'react-dom'
import { App } from './App'
// @ts-expect-error: React should be in scope when useing jsx
import React from 'react'

ReactDOM.render(<App />, document.getElementById('root'))
