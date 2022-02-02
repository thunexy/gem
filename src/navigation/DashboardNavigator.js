import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CardStyleInterpolators} from '@react-navigation/stack';
import React from 'react';
import {Platform} from 'react-native';
import {text} from '../../assets/styles/styles';
import {IconGen} from '../components/IconGenerator/IconGenerator';
import {scale} from '../lib/utils/scaleUtils';
import {Dashboard} from '../screens/Dashboard/Dashboard';
import HomeNavigator from './HomeNavigator';
const pageTransition = Platform.select({
  ios: CardStyleInterpolators.forHorizontalIOS,
  android: CardStyleInterpolators.forRevealFromBottomAndroid,
});

const HomeStack = createBottomTabNavigator();
// FIXME: VerifyTokenPhoneNumber, VerifyPhoneNumber, PinSelection are supposed to be in a Switch Navigator, but that no longer exists, so rethink navigators for those
export default function DashboardNavigator(props) {
  return (
    <HomeStack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: pageTransition,
        headerShown: false,
      }}
      tabBarOptions={{
        activeTintColor: '#4A476F',
        tabStyle: {paddingVertical: scale(4)},
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeNavigator}
        initialParams={{backgroundColor: '#FFFFFF'}}
        options={() => ({
          tabBarLabel: 'Home',
          tabBarLabelStyle: {fontFamily: text.helonik},
          tabBarIcon: () => <IconGen tag="home" />,
        })}
      />
      <HomeStack.Screen
        name="Activity"
        component={Dashboard}
        initialParams={{backgroundColor: '#FFFFFF'}}
        options={() => ({
          tabBarLabel: 'Activity',
          tabBarLabelStyle: {fontFamily: text.helonik},
          tabBarIcon: () => <IconGen tag="activity" />,
        })}
      />
      <HomeStack.Screen
        name="Add Money"
        component={Dashboard}
        initialParams={{backgroundColor: '#FFFFFF'}}
        options={() => ({
          tabBarLabel: 'Add Money',
          tabBarLabelStyle: {fontFamily: text.helonik},
          tabBarIcon: () => <IconGen tag="addMoney" />,
        })}
      />
      <HomeStack.Screen
        name="Accounts"
        component={Dashboard}
        initialParams={{backgroundColor: '#FFFFFF'}}
        options={() => ({
          tabBarLabel: 'Accounts',
          tabBarLabelStyle: {fontFamily: text.helonik},
          tabBarIcon: () => <IconGen tag="accounts" />,
        })}
      />
      <HomeStack.Screen
        name="Profile"
        component={Dashboard}
        initialParams={{backgroundColor: '#FFFFFF'}}
        options={() => ({
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {fontFamily: text.helonik},
          tabBarIcon: () => <IconGen tag="profile" />,
        })}
      />
    </HomeStack.Navigator>
  );
}
