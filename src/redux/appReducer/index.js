import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

import createSensitiveStorage from 'redux-persist-sensitive-storage';

import authReducer from '../../screens/Auth/reducer/authReducer';
const sensitiveStorage = createSensitiveStorage({
  keychainService: 'myKeychain',
  sharedPreferencesName: 'mySharedPrefs',
  encrypt: true,
});

export default combineReducers({
  authentication: persistReducer(
    {
      key: 'authentication',
      storage: sensitiveStorage,
    },
    authReducer,
  ),
  // logs: logReducer,
});
