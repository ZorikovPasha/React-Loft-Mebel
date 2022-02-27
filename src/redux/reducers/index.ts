import { combineReducers } from 'redux';

import itemsReducer from './itemsReducer';
import favoritesReducer from './favoritesReducer';
import cartItemsReducer from './cartItemsReducer';

const rootReducer = combineReducers({
  items: itemsReducer,
  favorites: favoritesReducer,
  cartItems: cartItemsReducer,
})

export default rootReducer;