import React, { Component } from 'react';
import { Text, ScrollView, AsyncStorage, StatusBar, View,  Modal } from 'react-native';
import { Button, HeaderBar, Coupon } from 'coupon-components-native';
import styled from 'styled-components/native';
import { FormattedMessage } from 'react-intl';
import uuid from 'uuid/v4';

import { authService, statusService } from '../../services';
import CouponDetailScene from '../CouponDetail/CouponDetailScene';
import AllCampaigns from '../../components/Campaigns/AllCampaigns';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    header: null,
  }

  state = {
    modalVisible: false,
    currentDetails: {},
    error: null,
  }

  goToProfile = () => {
    const { navigation } = this.props;
    navigation.navigate('Profile');
  }

  pressCoupon = (campaign) => {
    this.setState({ currentDetails: campaign, modalVisible: true });
  }

  handleCloseModal = () => {
    this.setState({ modalVisible: false, currentDetails: {} });
  }

  render() {
    const { navigation } = this.props;

    return (
      <TodayContainer>
        <CampaignsContainer>
          <AllCampaigns onPressCampaign={this.pressCoupon} />
        </CampaignsContainer>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <CouponDetailScene
            navigation={navigation}
            onClose={this.handleCloseModal}
            {...this.state.currentDetails}
          />
        </Modal>
      </TodayContainer>
    )
  }
}

const TodayContainer = styled(View)`
  flex: 1;
  background-color: white;
`;

const StyledCoupon = styled(Coupon)`
  margin-bottom: 10;
`;

const CampaignsContainer = styled(View)`
  flex: 1;
`;

const HeaderBarContainer = styled(View)`
  margin-bottom: 20;
`;

export default HomeScreen;