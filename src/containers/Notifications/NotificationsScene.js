import React, { Component } from 'react'
import { View, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Typo, HeaderBar, Notification } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';
import { injectIntl } from 'react-intl';
import uuid from 'uuid/v4';

// Notification Icons

class NotificationsScene extends Component {
  _keyExtractor = () => uuid();
  _renderItem = ({ item }) => {

    return (
      <Notification
        title='Reclamo de coupón'
        message='Hey Hunter! Coupon te acaba de  regalar un cupón dorado del 50% de descuento en Pizzeria Roma.'
        type={item.type}
      />
    );
  }

  render() {
    const { intl } = this.props;

    const pageTitle = intl.formatMessage({ id: 'notifications.titlePage' });

    const tmpData = [{type: 'star'}, {type: 'star'}, {type: 'confirmation'}, {type: 'account'}, {type: 'percent'}];
    return (
      <Container>
        <HeaderBarContainer>
          <HeaderBar title={pageTitle} />
        </HeaderBarContainer>

        {/*<FlatList
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          data={tmpData}
          ItemSeparatorComponent={SeparatorLine}
        />*/}
      </Container>
    )
  }
}

const Container = styled(View)`
  flex: 1;
`;

const HeaderBarContainer = styled(View)``;
const SeparatorLine = styled(View)`
  height: 1;
  background-color: ${Palette.neutral.alpha(0.3).css()};
`;

export default injectIntl(NotificationsScene);