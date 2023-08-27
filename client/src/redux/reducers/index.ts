import { combineReducers } from 'redux'

import { itemsReducer } from './itemsReducer'
import { userReducer } from './userReducer'
import { pathnameReducer } from './pathnameReducer'
import { errorsReducer } from './errors'

const rootReducer = combineReducers({
  items: itemsReducer,
  user: userReducer,
  pathname: pathnameReducer,
  errors: errorsReducer
})

export default rootReducer
