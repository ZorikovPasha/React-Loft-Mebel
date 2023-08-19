import { combineReducers } from 'redux'

import { itemsReducer } from './itemsReducer'
import { cartItemsReducer } from './cartItemsReducer'
import userReducer from './userReducer'
import { pathnameReducer } from './pathnameReducer'

const rootReducer = combineReducers({
  items: itemsReducer,
  cartItems: cartItemsReducer,
  user: userReducer,
  pathname: pathnameReducer
})

export default rootReducer
