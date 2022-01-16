// General storage (NSUSerDefaults for iOS or SharedPreferences for Android)
import AsyncStorage from '@react-native-community/async-storage';

// All reducers used across the app
import rootReducer from './appReducer/index';

// Redux
import {applyMiddleware, createStore} from 'redux';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 0,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  // applyMiddleware(logger),
  applyMiddleware(thunk),
);

export default store;
