import { combineReducers } from 'redux'

import { itemsReducer } from './itemsReducer'
import { userReducer } from './userReducer'
import { pathnameReducer } from './pathnameReducer'

const rootReducer = combineReducers({
  items: itemsReducer,
  user: userReducer,
  pathname: pathnameReducer
})

export default rootReducer
