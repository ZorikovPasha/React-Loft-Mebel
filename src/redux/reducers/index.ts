import { combineReducers } from 'redux';

import itemsReducer from './itemsReducer';
import slidesReducer from './slidesReducer';

const rootReducer = combineReducers({
  itemsReducer,
  slidesReducer,
})

export default rootReducer;