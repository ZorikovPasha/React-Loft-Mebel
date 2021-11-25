import { combineReducers } from 'redux';

import itemsReducer from './itemsReducer';
import slidesReducer from './slidesReducer';
import favoritesReducer from './favoritesReducer';
import cartItemsReducer from './cartItemsReducer';
import removeReducer from './removeReducer';
import currentProductReducer from './currentProductReducer';

const rootReducer = combineReducers({
  itemsReducer,
  slidesReducer,
  favoritesReducer,
  cartItemsReducer,
  removeReducer,
  currentProductReducer
})

export default rootReducer;