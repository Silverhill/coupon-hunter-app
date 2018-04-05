import React, { Component } from 'react'
import { View, Text } from 'react-native';
import { Button } from 'coupon-components-native';
import { removeAuthenticationAsync } from '../../services/auth';
import { connect } from 'react-redux';

@connect((state) => ({
  auth: state.user.auth,
}))
export default class ProfileScene extends Component {
  signOut = async () => {
    const { navigation, auth } = this.props;

    if(auth.logged) {
      await removeAuthenticationAsync();
      navigation.navigate('Auth');
    }
  }

  render() {
    return (
      <View>
        <Button title="Cerrar Sesión" onPress={this.signOut} />
      </View>
    )
  }
}
