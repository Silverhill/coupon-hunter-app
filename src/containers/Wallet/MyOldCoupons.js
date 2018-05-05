import React, { Component } from 'react'
import { View, ActivityIndicator, ScrollView, FlatList, Modal } from 'react-native';
import { Typo, HeaderBar, Coupon } from 'coupon-components-native';
import styled, { css } from 'styled-components/native';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { Palette } from 'coupon-components-native/styles';
import uuid from 'uuid/v4';

import CouponDetailScene from '../CouponDetail/CouponDetailScene';
import MyRedeemedCoupons from '../../components/User/MyRedeemedCoupons';

const WalletContainer = styled(ScrollView)`
  flex: 1;
  background-color: white;
  padding-top: 10;
`;

const Container = styled(View)`
  height: 100%;
`;

class MyCurrentCoupons extends Component {
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
    const { navigation } = this.props;
    if(!navigation) console.warn('Require pass navigation props to MyCurrentCoupons Component');

    return (
      <WalletContainer>
        <Container>
          <MyRedeemedCoupons onPressCampaign={this.pressCoupon}/>
        </Container>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
        >
          <CouponDetailScene
            navigation={navigation}
            onClose={this.handleCloseModal}
            {...currentDetails}
          />
        </Modal>
      </WalletContainer>
    )
  }
}

export default MyCurrentCoupons;