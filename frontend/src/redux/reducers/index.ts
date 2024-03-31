import { combineReducers } from 'redux'

import { itemsReducer } from './itemsReducer'
import { userReducer } from './userReducer'
import { errorsReducer } from './errors'

export const rootReducer = combineReducers({
  items: itemsReducer,
  user: userReducer,
  errors: errorsReducer
})
