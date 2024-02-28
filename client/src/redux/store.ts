import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

export type RootState = ReturnType<typeof rootReducer>

const composeEnhancer =
  ((import.meta.env.NDDE_ENV === 'development' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) as typeof compose) || compose
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

export default store
