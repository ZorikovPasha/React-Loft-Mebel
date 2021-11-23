import { combineReducers } from 'redux';

import itemsReducer from './itemsReducer';
import slidesReducer from './slidesReducer';
import favoritesReducer from './favoritesReducer';

const rootReducer = combineReducers({
  itemsReducer,
  slidesReducer,
  favoritesReducer
})

export default rootReducer;