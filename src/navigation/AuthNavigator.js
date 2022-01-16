import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Platform} from 'react-native';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import ResetPassword from '../screens/Auth/ResetPassword';
import Otp from '../screens/Auth/Otp';
import OtpEmail from '../screens/Auth/OtpEmail';
import Welcome from '../screens/Auth/Welcome';
import PinLogin from '../screens/Auth/PinLogin';

const pageTransition = Platform.select({
  ios: CardStyleInterpolators.forHorizontalIOS,
  android: CardStyleInterpolators.forRevealFromBottomAndroid,
});

const AuthStack = createStackNavigator();
// FIXME: VerifyTokenPhoneNumber, VerifyPhoneNumber, PinSelection are supposed to be in a Switch Navigator, but that no longer exists, so rethink navigators for those
export default function Auth(props) {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: pageTransition,
        headerShown: false,
      }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen
        name="PinLogin"
        component={PinLogin}
        initialParams={{backgroundColor: '#6939FF'}}
      />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
      <AuthStack.Screen name="Otp" component={Otp} />
      <AuthStack.Screen name="OtpEmail" component={OtpEmail} />
      <AuthStack.Screen
        initialParams={{backgroundColor: '#0E81FF'}}
        name="Welcome"
        component={Welcome}
      />
    </AuthStack.Navigator>
  );
}
