import React, { PureComponent } from 'react'
import { View, Dimensions, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { Typo, HeaderBar } from 'coupon-components-native';
import { injectIntl } from 'react-intl';
import styled from 'styled-components/native';
import { Palette } from 'coupon-components-native/styles';
import uuid from 'uuid/v4';
import { Query } from 'react-apollo';
import { Constants } from 'expo';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import CouponDetailScene from '../CouponDetail/CouponDetailScene';
import MyCurrentCoupons from './MyCurrentCoupons';
import MyOldCoupons from './MyOldCoupons';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const WalletContainer = styled(View)`
  flex: 1;
  background-color: white;
`;

const HeaderBarContainer = styled(Animated.View)`
  margin-bottom: 0;
`;

const LabelTab = styled(Typo.TextBody)`
  padding-vertical: 5;
`;

const keyRoutes = {
  HUNTED: 'hunted',
  USED: 'used'
};

class WalletScene extends PureComponent {
  state = {
    index: 0,
    routes: [
      { key: keyRoutes.HUNTED },
      { key: keyRoutes.USED },
    ]
  }

  goToProfile = () => {
    const { navigation } = this.props;
    navigation.navigate('Profile');
  }

  _handleIndexChange = index => this.setState({ index });
  _renderHeader = props => {
    const { intl } = this.props;
    return (
      <TabBar
        {...props}
        style={{ backgroundColor: Palette.white, justifyContent: 'flex-end' }}
        renderLabel={({ route, focused  }) => {
          const title = `walletScreen.tabs.${route.key}`;
          return <LabelTab bold highlight={focused}>{intl.formatMessage({ id: title })}</LabelTab>
        }}
        indicatorStyle={{ backgroundColor: Palette.accent, height: 5 }}
      />
    )
  }

  _renderScene = SceneMap({
    hunted: () => (
      <MyCurrentCoupons
        navigation={this.props.navigation}
      />
    ),
    used: () => (
      <MyOldCoupons
        navigation={this.props.navigation}
      />
    ),
  });

  render() {
    const { intl } = this.props;
    const title = intl.formatMessage({ id: 'walletScreen.titlePage' });

    return (
      <WalletContainer>
        <HeaderBarContainer>
          <HeaderBar title={title} />
        </HeaderBarContainer>

        <TabViewAnimated
          style={{ flex: 1 }}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
          useNativeDriver
        />
      </WalletContainer>
    )
  }
}

export default injectIntl(WalletScene);