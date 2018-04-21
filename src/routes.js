import React from 'react';
import { View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';
import { FormattedMessage } from 'react-intl';

import LoginScreen from './containers/Login/LoginScreen';
import StartScreen from './containers/Welcome/StartScreen';
import RegisterScreen from './containers/Register/RegisterScreen';
import HomeScreen from './containers/Home/HomeScreen';
import AuthLoadingScreen from './containers/AuthLoadingScreen/AuthLoadingScreen';
import ProfileScene from './containers/Profile/ProfileScene';
import ProfileMakerScene from './containers/Profile/ProfileMakerScene';
import CouponDetailScene from './containers/CouponDetail/CouponDetailScene';
import WalletScene from './containers/Wallet/WalletScene';
import ExploreScene from './containers/Explore/ExploreScene';
import NotificationsScene from './containers/Notifications/NotificationsScene';

// Assets
import arrow_left_c from './assets/images/arrow-left-c.png'

export const customBack = {
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
}

// Auth Stack
const AuthStack = StackNavigator({
  Welcome: { screen: StartScreen },
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
},{
  initialRouteName: 'Welcome',
  navigationOptions: ({ navigation }) => ({
    ...customBack,
  })
});

// Home Stack
const HomeStack = StackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScene },
  Maker: { screen: ProfileMakerScene },
},{
  navigationOptions: {
    header: null,
  }
})


const WalletStack = StackNavigator({
  Wallet: { screen: WalletScene },
  Profile: { screen: ProfileScene },
  Maker: { screen: ProfileMakerScene },
}, {
  navigationOptions: {
    header: null,
    title: 'Wallet'
  }
})

// App Stack
const AppStack = TabNavigator({
  Home: { screen: HomeStack, navigationOptions: { title: <FormattedMessage id="commons.titles.today" /> }  },
  Wallet: { screen: WalletStack },
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

// Modal Stack
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