import { combineReducers } from 'redux';

import itemsReducer from './itemsReducer';
import slidesReducer from './slidesReducer';
import favoritesReducer from './favoritesReducer';
import cartItemsReducer from './cartItemsReducer';
import removeReducer from './removeReducer';
import currentProductReducer from './currentProductReducer';

const rootReducer = combineReducers({
  items: itemsReducer,
  slides: slidesReducer,
  favorites: favoritesReducer,
  cartItems: cartItemsReducer,
  remove: removeReducer,
  currentProduct: currentProductReducer,
})

export default rootReducer;