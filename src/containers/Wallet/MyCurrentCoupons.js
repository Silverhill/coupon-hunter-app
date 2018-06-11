import React, { PureComponent } from 'react'
import { View, ActivityIndicator, FlatList, Modal } from 'react-native';
import { Typo, HeaderBar, Coupon } from 'coupon-components-native';
import styled, { css } from 'styled-components/native';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { Palette } from 'coupon-components-native/styles';
import uuid from 'uuid/v4';

import CouponDetailScene from '../CouponDetail/CouponDetailScene';
import MyCoupons from '../../components/User/MyCoupons';

const WalletContainer = styled(View)`
  flex: 1;
  background-color: white;
`;

const Container = styled(View)`
  height: 100%;
`;

class MyCurrentCoupons extends PureComponent {
  state = {
    modalVisible: false,
    error: '',
    currentDetails: {},
  }

  pressCoupon = (campaign) => {
    this.setState({ currentDetails: campaign, modalVisible: true });
  }

  handleCloseModal = () => {
    this.setState({ modalVisible: false, currentDetails: {} });
  }

  render() {
    const { modalVisible, currentDetails } = this.state;
    const { navigation, scrollEventThrottle, onScroll } = this.props;
    if(!navigation) console.warn('Require pass navigation props to MyCurrentCoupons Component');

    return (
      <WalletContainer>
        <Container>
          <MyCoupons
            onPressCampaign={this.pressCoupon}
            onScroll={onScroll}
            scrollEventThrottle={scrollEventThrottle}
          />
        </Container>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
        >
          <CouponDetailScene
            navigation={navigation}
            onClose={this.handleCloseModal}
            campaign={currentDetails}
          />
        </Modal>
      </WalletContainer>
    )
  }
}

export default MyCurrentCoupons;