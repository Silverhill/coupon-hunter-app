import React from 'react';
import { Stack, Scene, Router } from 'react-native-router-flux';

// Import Pages
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';

const AllRoutes = () => (
  <Router>
    <Stack key="root">
      <Scene key="login" component={Login} renderLeftButton={null} />
      <Scene key="home" component={Home} renderLeftButton={null} />
    </Stack>
  </Router>
);

export default AllRoutes;