import { combineReducers } from 'redux';

import itemsReducer from './itemsReducer';
import slidesReducer from './slidesReducer';
import favoritesReducer from './favoritesReducer';
import cartItemsReducer from './cartItemsReducer';

const rootReducer = combineReducers({
  itemsReducer,
  slidesReducer,
  favoritesReducer,
  cartItemsReducer,
})

export default rootReducer;