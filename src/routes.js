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
import ProfileEditScene from './containers/Profile/ProfileEditScene';
import ProfileMakerScene from './containers/Profile/ProfileMakerScene';
import CouponDetailScene from './containers/CouponDetail/CouponDetailScene';
import WalletScene from './containers/Wallet/WalletScene';
import ExploreScene from './containers/Explore/ExploreScene';
import NotificationsScene from './containers/Notifications/NotificationsScene';
import OnboardingScene from './containers/Onboarding/OnboardingScene';

// Assets
import arrow_left_c from './assets/images/arrow-left-c.png'
import MyRedeemCoupons from './components/User/MyRedeemedCoupons';

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

// Common NavigationOptions
const commonNavigationOptions = {
  tabBarVisible: false
}

// Profile Stack
const ProfileStack = StackNavigator({
  Profile: { screen: ProfileScene },
  ProfileEdit: { screen: ProfileEditScene, navigationOptions: { ...commonNavigationOptions } },
}, {
  initialRouteName: 'Profile',
  navigationOptions: {
    header: null,
    gesturesEnabled: false,
   },
})

// Home Stack
const HomeStack = StackNavigator({
  Home: { screen: HomeScreen },
  Maker: { screen: ProfileMakerScene, navigationOptions: { ...commonNavigationOptions } },
},{
  navigationOptions: {
    header: null,
  }
})

// Wallet Stack
const WalletStack = StackNavigator({
  Wallet: { screen: WalletScene },
  Maker: { screen: ProfileMakerScene, navigationOptions: { ...commonNavigationOptions } },
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
  Notifications: { screen: NotificationsScene },
  Profile: { screen: ProfileStack },
},
{
  initialRouteName: 'Home',
  swipeEnabled: false,
  lazyLoad: true,
  animationEnabled: false,
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;

      // console.log(navigation.state)

      let iconName;
      switch (routeName) {
        case 'Home':
          iconName = 'compass';
          break;
        case 'Wallet':
          iconName = 'wallet';
          break;
        case 'Profile':
          iconName = 'user';
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
  }),
});

// Modal Stack
const ModalStack = StackNavigator({
  CouponDetails: { screen: CouponDetailScene }
},{
  mode: 'modal',
  headerMode: 'none',
})

// Onboarding Stack
const OnboardingStack = StackNavigator({
  Onboarding: { screen: OnboardingScene }
}, {
  navigationOptions: {
    header: null,
  }
})


export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    Onboarding: OnboardingStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);