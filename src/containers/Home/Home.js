import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Text, ScrollView, AsyncStorage, StatusBar } from 'react-native';
import { Button, NavBar } from 'coupon-components-native';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { HEADER_AUTHENTICATION_KEY, SCENE_KEY_LOGIN } from '../../constants';
import { query } from '../../services/graphql';
import { FormattedDate, injectIntl } from 'react-intl';

const TodayContainer = styled(ScrollView)`
  flex: 1;
  background-color: white;
`;

@connect(null)
@graphql(query.getMyInfo)
class Home extends Component {

  render() {
    const { title, data: { loading, error, me }, intl } = this.props;

    if(loading) return <Text>Loading...</Text>
    else if(error) return <Text>{error.message}</Text>

    return (
      <TodayContainer>
        <NavBar
          title={title}
          date={intl.formatDate(Date.now(), {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
          })}
          avatarProps={{
            source: {uri: 'https://i.pinimg.com/originals/11/0f/00/110f0057f178a5f1357925aad67a9dd4.png'},
          }}
        />

        <Text>Welcome {me.name}</Text>
        <Button title='Log Out' onPress={this.logOut} />
      </TodayContainer>
    )
  }
}

export default injectIntl(Home)