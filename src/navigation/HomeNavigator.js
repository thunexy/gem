import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {Platform} from 'react-native';
import {Dashboard} from '../screens/Dashboard/Dashboard';
import OpenBalance from '../screens/Dashboard/OpenBalance/OpenBalance';
import DetailsReady from '../screens/Dashboard/OpenBalance/OpenUSD/DetailsReady';
import FaceCapture from '../screens/Dashboard/OpenBalance/OpenUSD/FaceCapture';
import VerifyAddress from '../screens/Dashboard/OpenBalance/OpenUSD/VerifyAddress';
import VerifyIdentity from '../screens/Dashboard/OpenBalance/OpenUSD/VerifyIdentity';
import FundingRequest from '../screens/FundAccount/FundingRequest';
import HowMuch from '../screens/FundAccount/HowMuch';
import HowTo from '../screens/FundAccount/HowTo';
import RequestFrom from '../screens/FundAccount/RequestFrom';
import WireTransfer from '../screens/FundAccount/WireTransfer';
import ProfileComplete from '../screens/Onboarding/ProfileComplete';
import Step1 from '../screens/Onboarding/Step1';
import Step2 from '../screens/Onboarding/Step2';
import Step3 from '../screens/Onboarding/Step3';
import ReceiveAmount from '../screens/Transfer/ReceiveAmount';
import TransferAmount from '../screens/Transfer/TransferAmount';
import SelectCountry from '../screens/Transfer/components/CountryModal';
import Beneficiary from '../screens/Transfer/Beneficiary';
const pageTransition = Platform.select({
  ios: CardStyleInterpolators.forHorizontalIOS,
  android: CardStyleInterpolators.forRevealFromBottomAndroid,
});

const HomeStack = createStackNavigator();
// FIXME: VerifyTokenPhoneNumber, VerifyPhoneNumber, PinSelection are supposed to be in a Switch Navigator, but that no longer exists, so rethink navigators for those
export default function HomeNavigator(props) {
  return (
    <HomeStack.Navigator
      initialRouteName={'Dashboard'}
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: pageTransition,
        headerShown: false,
      }}>
      <HomeStack.Screen name="SelectCountry" component={SelectCountry} />
      <HomeStack.Screen name="Beneficiary" component={Beneficiary} />

      <HomeStack.Screen
        name="Dashboard"
        component={Dashboard}
        initialParams={{backgroundColor: '#CFBEFF'}}
      />

      <HomeStack.Screen
        name="VerifyIdentity"
        component={VerifyIdentity}
        initialParams={{backgroundColor: '#6939FF'}}
      />
      <HomeStack.Screen
        name="VerifyAddress"
        component={VerifyAddress}
        initialParams={{backgroundColor: '#6939FF'}}
      />
      <HomeStack.Screen
        name="FaceCapture"
        component={FaceCapture}
        initialParams={{backgroundColor: '#6939FF'}}
      />
      <HomeStack.Screen
        name="DetailsReady"
        component={DetailsReady}
        initialParams={{backgroundColor: '#FAF2EB'}}
      />
      <HomeStack.Screen
        name="HowMuch"
        component={HowMuch}
        initialParams={{backgroundColor: '#DCF995'}}
      />
      <HomeStack.Screen
        name="WireTransfer"
        component={WireTransfer}
        initialParams={{backgroundColor: '#DCF995'}}
      />
      <HomeStack.Screen
        name="HowTo"
        component={HowTo}
        initialParams={{backgroundColor: '#DCF995'}}
      />
      <HomeStack.Screen
        name="RequestFrom"
        component={RequestFrom}
        initialParams={{backgroundColor: '#DCF995'}}
      />
      <HomeStack.Screen
        name="FundingRequest"
        component={FundingRequest}
        initialParams={{backgroundColor: '#DCF995'}}
      />
      <HomeStack.Screen
        name="Step1"
        component={Step1}
        initialParams={{backgroundColor: '#6939FF'}}
      />
      <HomeStack.Screen
        name="Step2"
        component={Step2}
        initialParams={{backgroundColor: '#6939FF'}}
      />
      <HomeStack.Screen
        name="Step3"
        component={Step3}
        initialParams={{backgroundColor: '#6939FF'}}
      />
      <HomeStack.Screen
        name="ProfileComplete"
        component={ProfileComplete}
        initialParams={{backgroundColor: '#FFF'}}
      />
      <HomeStack.Screen
        name="OpenBalance"
        component={OpenBalance}
        initialParams={{backgroundColor: '#FAF2EB'}}
      />
      <HomeStack.Screen
        name="TransferAmount"
        component={TransferAmount}
        initialParams={{backgroundColor: '#F7C57C'}}
      />
      <HomeStack.Screen
        name="ReceiveAmount"
        component={ReceiveAmount}
        initialParams={{backgroundColor: '#F7C57C'}}
      />
    </HomeStack.Navigator>
  );
}
