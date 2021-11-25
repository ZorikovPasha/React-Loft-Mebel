import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export interface RootState {
  itemsReducer: { items: [] },
  slidesReducer: { slides: [] }, 
  favoritesReducer: { favorites: [] },
  cartItemsReducer: { cartItems: [], quintity: 0, totalCost: 0 },
  removeReducer: { cartItems: [], quintity: 0, totalCost: 0 },
  currentProductReducer: { id: 0 }
}

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) as typeof compose || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;