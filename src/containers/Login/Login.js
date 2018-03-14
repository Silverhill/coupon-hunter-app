import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import { Actions, ActionConst } from 'react-native-router-flux';

import { Input, Button } from '../../commons/components';
import LoginForm from './LoginForm';
import * as gql from '../../actions/graphql/queries';
import * as userActions from '../../actions/userActions';

@connect(null, {
  loginAsync: userActions.loginAsync,
  getAuthenticationAsync: userActions.getAuthenticationAsync,
})
class Login extends Component {
  goToHome = () => Actions.home();

  async componentWillMount() {
    const { getAuthenticationAsync } = this.props;
    const authentication = await getAuthenticationAsync();

    if(authentication) {
      this.goToHome();
    }
  }

  loginUser = async (values = {}) => {
    const { login, loginAsync } = this.props;
    const { email, password } = values;

    try {
      const res = await login(email, password);
      const { data: { login: _login } } = res;
      const token = _login.toString();

      const { logged } = await loginAsync(token);
      if(logged) this.goToHome();

    } catch (error) {
      console.log(error);
    }
  }

  handleChangeInput = (text, label) => {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [label]: text,
      }
    }))
  }

  render() {

    return (
      <View>
        <LoginForm onSubmit={this.loginUser} />
      </View>
    )
  }
}

export default compose(
  gql.login,
)(Login);