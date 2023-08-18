import { combineReducers } from 'redux'

import { itemsReducer } from './itemsReducer'
import { cartItemsReducer } from './cartItemsReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  items: itemsReducer,
  cartItems: cartItemsReducer,
  user: userReducer
})

export default rootReducer
