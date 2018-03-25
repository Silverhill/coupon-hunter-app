import React from 'react';
import decode from 'jwt-decode';
import { Text, AsyncStorage } from 'react-native';
import { Stack, Scene, Router, Actions } from 'react-native-router-flux';
import {
  SCENE_KEY_EXPLORE,
  SCENE_KEY_NOTIFICATIONS,
  SCENE_KEY_TODAY,
  SCENE_KEY_WALLET,
  SCENE_KEY_TABBAR,
  HEADER_AUTHENTICATION_KEY,
} from './constants';

// Redux
import store from './store';
import * as userActions from './actions/userActions';

// Import Pages
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';

const redirectIfLogged = async () => {
  const notAuthorized = false;
  const authenticated = true;

  const token = await AsyncStorage.getItem(HEADER_AUTHENTICATION_KEY);
  if(!token) return notAuthorized;

  try {
    const { exp } = decode(token);
    const date = new Date();

    if(exp < date.getTime() / 1000) {
      await AsyncStorage.removeItem(HEADER_AUTHENTICATION_KEY);
      return notAuthorized;
    }

  } catch(err) {
    await AsyncStorage.removeItem(HEADER_AUTHENTICATION_KEY);
    return notAuthorized;
  }

  return authenticated;
}

const verifyAuth = async (props) => {
  const authenticated = await redirectIfLogged();
  if(authenticated) Actions.reset(SCENE_KEY_TABBAR);
}

const AllRoutes = () => (
  <Router>
    <Stack key="root">
      <Scene key="login" component={Login} initial onEnter={verifyAuth}/>

      <Scene key={SCENE_KEY_TABBAR} tabs tabBarStyle={{ backgroundColor: '#FFFFFF' }}>
        <Scene key={SCENE_KEY_TODAY} title="Hoy" component={() => <Text>Today</Text>} />
        <Scene key={SCENE_KEY_WALLET} title="Wallet" component={() => <Text>Wallet</Text>} />
        <Scene key={SCENE_KEY_EXPLORE} title="Explorar" component={() => <Text>Explorar</Text>} />
        <Scene key={SCENE_KEY_NOTIFICATIONS} title="Notificaciones" component={() => <Text>Notificaciones</Text>} />
      </Scene>
    </Stack>
  </Router>
);

export default AllRoutes;