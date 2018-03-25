import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Button } from 'coupon-components-native';
import style from 'styled-components/native';
import { Actions } from 'react-native-router-flux';

export default class Home extends Component {
  itemExist = async () => {
    const authentication = await AsyncStorage.getItem('authentication');
    return authentication || null;
  }

  logOut = async () => {
    Actions.login();
    await AsyncStorage.removeItem('authentication');
  }

  render() {
    const { title } = this.props;

    return (
      <View>
        <Text>Welcome {title}</Text>
        <Button title='Log Out' onPress={this.logOut} />
      </View>
    )
  }
}