import React, { Component } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { isAuthorized } from '../../services/auth';
// Actions
import * as userActions from '../../actions/userActions';

const Container = styled(View)`
  flex: 1;
`;

@connect(store => ({
  auth: store.user.auth,
  alert: store.notifications.alert,
}), {
  loginAsync: userActions.loginAsync,
})
export default class AuthLoadingScreen extends Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async() => {
    const { loginAsync, navigation } = this.props;
    const { authorized, token } = await isAuthorized();
    try {
      await loginAsync(token);
      navigation.navigate(authorized ? 'App' : 'Onboarding');
    } catch (error) {
      console.log('DEBUG ERROR',error);
    }
  }

  render() {
    return (
      <Container>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </Container>
    );
  }
}