import { combineReducers } from 'redux';

import itemsReducer from './itemsReducer';
import slidesReducer from './slidesReducer';
import favoritesReducer from './favoritesReducer';
import cartItemsReducer from './cartItemsReducer';
import removeReducer from './removeReducer';

const rootReducer = combineReducers({
  itemsReducer,
  slidesReducer,
  favoritesReducer,
  cartItemsReducer,
  removeReducer
})

export default rootReducer;