import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Text, View, AsyncStorage } from 'react-native';
import { Button } from 'coupon-components-native';
import style from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { HEADER_AUTHENTICATION_KEY, SCENE_KEY_LOGIN } from '../../constants';
import { query } from '../../services/graphql';

@connect(null)
@graphql(query.getMyInfo)
export default class Home extends Component {

  render() {
    const { title, data: { loading, error, me } } = this.props;

    if(loading) return <Text>Loading...</Text>
    else if(error) return <Text>{error.message}</Text>

    return (
      <View>
        <Text>Welcome {me.name}</Text>
        <Button title='Log Out' onPress={this.logOut} />
      </View>
    )
  }
}