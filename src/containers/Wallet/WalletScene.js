import React, { Component } from 'react'
import { View, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { Typo, HeaderBar } from 'coupon-components-native';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components/native';
import { Palette } from 'coupon-components-native/styles';
import uuid from 'uuid/v4';
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

const HeaderBarContainer = styled(View)`
  margin-bottom: 5;
`;

const LabelTab = styled(Typo.TextBody)`
  padding-vertical: 5;
`;

const keyRoutes = {
  HUNTED: 'hunted',
  USED: 'used'
};
class WalletScene extends Component {
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
  _renderHeader = props => (
    <TabBar
      {...props}
      style={{ backgroundColor: Palette.white }}
      renderLabel={({ route, focused  }) => {
        const title = `walletScreen.tabs.${route.key}`;
        return <LabelTab bold highlight={focused}><FormattedMessage id={title}/></LabelTab>
      }}
      indicatorStyle={{ backgroundColor: Palette.accent, height: 5 }}
    />
  )
  _renderScene = SceneMap({
    hunted: () => <MyCurrentCoupons navigation={this.props.navigation} />,
    used: () => <MyOldCoupons />,
  });

  render() {
    return (
      <WalletContainer>
        <HeaderBarContainer>
          <FormattedMessage id="walletScreen.titlePage">{(txt) => (
            <HeaderBar
              title={txt}
              avatarOptions={{
                source: {uri: 'https://i.pinimg.com/originals/11/0f/00/110f0057f178a5f1357925aad67a9dd4.png'},
                onPress: this.goToProfile,
              }}
            />
          )}</FormattedMessage>
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

export default WalletScene;