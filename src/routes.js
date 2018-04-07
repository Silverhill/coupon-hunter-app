import React from 'react';
import { View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';

import { TopBar } from 'coupon-components-native';
import LoginScreen from './containers/Login/LoginScreen';
import SignInScreen from './containers/SignIn/SignInScreen';
import RegisterScreen from './containers/Register/RegisterScreen';
import HomeScreen from './containers/Home/HomeScreen';
import AuthLoadingScreen from './containers/AuthLoadingScreen/AuthLoadingScreen';
import ProfileScene from './containers/Profile/ProfileScene';
import CouponDetailScene from './containers/CouponDetail/CouponDetailScene';

// Assets
import arrow_left_c from './assets/images/arrow-left-c.png'
import WalletScene from './containers/Wallet/WalletScene';
import ExploreScene from './containers/Explore/ExploreScene';
import NotificationsScene from './containers/Notifications/NotificationsScene';

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

const HomeStack = StackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScene },
},{
  navigationOptions: {
    header: null,
    title: 'Today'
  }
})

const AppStack = TabNavigator({
  Home: { screen: HomeStack },
  Wallet: { screen: WalletScene },
  Explore: { screen: ExploreScene },
  Notifications: { screen: NotificationsScene },
},
{
  initialRouteName: 'Home',
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;

      let iconName;
      switch (routeName) {
        case 'Home':
          iconName = 'calendar';
          break;
        case 'Wallet':
          iconName = 'wallet';
          break;
        case 'Explore':
          iconName = 'compass';
          break;
        case 'Notifications':
          iconName = 'bell';
          break;
        default:
          break;
      }

      return <Entypo name={iconName} size={25} color={tintColor} />;
    },
    header: null
  })
});

const ModalStack = StackNavigator({
  CouponDetails: { screen: CouponDetailScene }
},{
  mode: 'modal',
  headerMode: 'none',
})

export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    Modal: ModalStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);