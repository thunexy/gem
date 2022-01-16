/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {persistStore} from 'redux-persist';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import store from './src/redux/store';
import {StyleSheet, Text, View} from 'react-native';
import useController, {AppContext} from './src/controllers/AppContext';
import AppNavigatior from './src/navigation/AppNavigatior';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';

const persistor = persistStore(store);

const {Provider} = AppContext;
const App = () => {
  const {state, dispatch} = useController();
  useEffect(() => {
    AsyncStorage.getItem('state').then(val => {
      if (val) {
        dispatch(JSON.parse(state));
      }
    });
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    return () => {
      AsyncStorage.setItem('state', JSON.stringify(state));
    };
  }, []);
  return (
    <Provider value={{...state, dispatch}}>
      <View style={{flex: 1}}>
        <ReduxProvider store={store}>
          <PersistGate persistor={persistor}>
            <AppNavigatior />
          </PersistGate>
        </ReduxProvider>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
