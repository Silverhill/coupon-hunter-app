import React from 'react';
import decode from 'jwt-decode';
import { Text, View, AsyncStorage } from 'react-native';
import { Stack, Scene, Router, Actions } from 'react-native-router-flux';
import { getAuthenticationAsync, removeAuthenticationAsync } from './services/auth';
import WhiteStatusBar from './components/WhiteStatusBar';

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

// Import Components
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';

const dispatchActionNotValidAuth = async () => {
  await removeAuthenticationAsync();
  store.dispatch(userActions.authNotValid());
}
const dispatchActionValidAuth = (token) => store.dispatch(userActions.authValid(token));

const ifUserLogged = async () => {
  const notAuthorized = false;
  const authenticated = true;

  const token = await getAuthenticationAsync();
  if (!token) {
    await dispatchActionNotValidAuth();
    return notAuthorized;
  }

  try {
    const { exp } = decode(token);
    const date = new Date();

    if(exp < date.getTime() / 1000) {
      await dispatchActionNotValidAuth()
      return notAuthorized;
    }

  } catch(err) {
    await dispatchActionNotValidAuth();
    return notAuthorized;
  }

  dispatchActionValidAuth(token);
  return authenticated;
}

const verifyAuth = async (props) => {
  const authenticated = await ifUserLogged();
  if(authenticated) Actions.reset(SCENE_KEY_TABBAR);
}

const commonProps = {
  navBar: WhiteStatusBar
}

const AllRoutes = () => (
  <Router>
    <Stack key="root">
      <Scene key="login" title="Login" component={Login} initial onEnter={verifyAuth}/>

      <Scene key={SCENE_KEY_TABBAR} tabs tabBarStyle={{ backgroundColor: '#FFFFFF' }}>
        <Scene key={SCENE_KEY_TODAY} title="Hoy" component={Home} {...commonProps} />
        <Scene key={SCENE_KEY_WALLET} title="Wallet" component={() => <Text>Wallet</Text>} hideNavBar {...commonProps}/>
        <Scene key={SCENE_KEY_EXPLORE} title="Explorar" component={() => <Text>Explorar</Text>} hideNavBar {...commonProps}/>
        <Scene key={SCENE_KEY_NOTIFICATIONS} title="Notificaciones" component={() => <Text>Notificaciones</Text>} hideNavBar {...commonProps}/>
      </Scene>
    </Stack>
  </Router>
);

export default AllRoutes;