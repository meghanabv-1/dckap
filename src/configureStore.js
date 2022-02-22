import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createStore } from 'redux';
import cartReducer from './components/reducers/cartReducer';

const persistConfig = {
  key: 'cart',
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer);

export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
}
  