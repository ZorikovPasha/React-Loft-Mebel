import { combineReducers } from 'redux';

import itemsReducer from './itemsReducer';
import favoritesReducer from './favoritesReducer';
import cartItemsReducer from './cartItemsReducer';
import currentProductReducer from './currentProductReducer';

const rootReducer = combineReducers({
  items: itemsReducer,
  favorites: favoritesReducer,
  cartItems: cartItemsReducer,
  currentProduct: currentProductReducer,
})

export default rootReducer;