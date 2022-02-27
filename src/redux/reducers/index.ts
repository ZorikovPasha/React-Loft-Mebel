import { combineReducers } from 'redux';

import itemsReducer from './itemsReducer';
import favoritesReducer from './favoritesReducer';
import cartItemsReducer from './cartItemsReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  items: itemsReducer,
  favorites: favoritesReducer,
  cartItems: cartItemsReducer,
  auth: authReducer,
})

export default rootReducer;