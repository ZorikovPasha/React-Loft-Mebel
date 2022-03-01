import { combineReducers } from 'redux';

import itemsReducer from './itemsReducer';
import favoritesReducer from './favoritesReducer';
import cartItemsReducer from './cartItemsReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  items: itemsReducer,
  favorites: favoritesReducer,
  cartItems: cartItemsReducer,
  auth: authReducer,
  user: userReducer
})

export default rootReducer;