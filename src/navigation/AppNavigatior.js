import React, {useContext, useRef, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
// import AuthNavigator from './AuthNavigator';
// import Toast from '../components/Toast/Toast';
import {connect} from 'react-redux';
// import {hideToast} from '../components/Toast/actions/toastActions';

// import {handleError} from '../lib/utils/helpers';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import StatusBar from '../components/StatusBar/StatusBar';
import {Platform, Text, View} from 'react-native';
import {handleError} from '../lib/utils/helpers';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
// import Alert from '../components/Alert/Alert';

const pageTransition = Platform.select({
  ios: CardStyleInterpolators.forHorizontalIOS,
  android: CardStyleInterpolators.forRevealFromBottomAndroid,
});

export const MainStack = createStackNavigator();
function handleFirstConnectivityChange(isConnected, removeToast) {
  // removeToast();
  !isConnected &&
    handleError(
      null,
      'Poor internet connection. Please check your network and try again.',
      'error',
      0,
    );
}

function getActiveRoute(navigationState) {
  const route = navigationState.routes[navigationState?.index || 0];
  if (route.state) {
    return getActiveRoute(route.state);
  }
  return route;
}

function App(props) {
  const unsubscribe = useRef(false);
  // const {alert} = useContext(AppContext);
  const navigationRef = useRef(null);
  const [statusBarStyle, setStatusBarStyle] = useState(null);

  React.useEffect(() => {
    unsubscribe.current = NetInfo.addEventListener(state => {
      handleFirstConnectivityChange(state.isConnected, props.hideToast);
    });
    return () => {};
  }, []);
  return (
    <>
      <StatusBar style={statusBarStyle} />
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          onStateChange={state => {
            if (!state) {
              return;
            }
            setStatusBarStyle(getActiveRoute(state).params);
          }}>
          {/* {!!props.toastShow && (
            <Toast
              show={props.toastShow}
              title={props.toastTitle}
              type={props.toastType}
              message={props.toastMessage ? props.toastMessage.toString() : ''}
              onClickHandler={props.hideToast}
            />
          )}
          {alert && <Alert {...alert} />} */}
          <MainStack.Navigator
            screenOptions={{
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              cardStyleInterpolator: pageTransition,
              headerBackTitleVisible: false,
            }}
            headerMode="none">
            {props.auth.isLoggedIn ? (
              <MainStack.Screen
                name="HomeNavigator"
                component={HomeNavigator}
              />
            ) : (
              <MainStack.Screen
                name="AuthNavigator"
                component={AuthNavigator}
              />
            )}
          </MainStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.authentication,
  };
};

const mapDispatchToProps = {
  // hideToast,
  // setLaunchType,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
