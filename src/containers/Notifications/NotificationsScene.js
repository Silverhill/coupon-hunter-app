import React, { Component } from 'react'
import { View, Image, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { Typo, HeaderBar, Notification } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';
import { injectIntl } from 'react-intl';
import uuid from 'uuid/v4';
import notification_empty from '../../assets/images/notifications.png';

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

        <EmptyNotificationContainer>
          <NotificationImage
            source={notification_empty}
            resizeMode='contain'
          />
          <Typo.TextBody secondary center>{intl.formatMessage({ id: 'notifications.emptyState.placeholder' })}</Typo.TextBody>
        </EmptyNotificationContainer>

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

const NotificationImage = styled(Image)`
  width: 250;
`;

const EmptyNotificationContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Container = styled(SafeAreaView)`
  flex: 1;
`;

const HeaderBarContainer = styled(View)``;
const SeparatorLine = styled(View)`
  height: 1;
  background-color: ${Palette.neutral.alpha(0.3).css()};
`;

export default injectIntl(NotificationsScene);