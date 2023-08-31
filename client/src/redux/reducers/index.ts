import { combineReducers } from 'redux'

import { itemsReducer } from './itemsReducer'
import { userReducer } from './userReducer'
import { pathnameReducer } from './pathnameReducer'
import { errorsReducer } from './errors'
import { searchReducer } from './search'

const rootReducer = combineReducers({
  items: itemsReducer,
  user: userReducer,
  pathname: pathnameReducer,
  errors: errorsReducer,
  search: searchReducer
})

export default rootReducer
