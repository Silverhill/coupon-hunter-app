import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator, SwitchNavigator } from 'react-navigation';

import { TopBar } from 'coupon-components-native';
import LoginScreen from './containers/Login/LoginScreen';
import SignInScreen from './containers/SignIn/SignInScreen';
import RegisterScreen from './containers/Register/RegisterScreen';
import HomeScreen from './containers/Home/HomeScreen';
import AuthLoadingScreen from './containers/AuthLoadingScreen/AuthLoadingScreen';
import ProfileScene from './containers/Profile/ProfileScene';
import CouponExtendedScene from './containers/CouponExtended/CouponExtendedScene';

// Assets
import arrow_left_c from './assets/images/arrow-left-c.png'

const AuthStack = StackNavigator({
  Login: { screen: LoginScreen },
  SignIn: { screen: SignInScreen },
  Register: { screen: RegisterScreen },
},{
  initialRouteName: 'Login',
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTitleStyle: {
      fontWeight: '900',
    },
    headerBackImage: arrow_left_c,
    headerBackTitleStyle: {
      color: 'black',
      fontSize: 14,
    },
  })
});

const AppStack = StackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScene },
  CouponExtended: { screen: CouponExtendedScene }
},
{
  navigationOptions: {
    header: null
  }
});

export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);