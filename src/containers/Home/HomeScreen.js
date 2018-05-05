import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose, Query } from 'react-apollo';
import { Text, ScrollView, AsyncStorage, StatusBar, View, Alert, Modal, SectionList } from 'react-native';
import { Button, HeaderBar, Coupon } from 'coupon-components-native';
import styled from 'styled-components/native';
import { FormattedDate, injectIntl, FormattedMessage } from 'react-intl';
import { withApollo } from 'react-apollo';
import uuid from 'uuid/v4';
import moment from 'moment';

import { HEADER_AUTHENTICATION_KEY } from '../../constants';
import { authService, intl, statusService } from '../../services';
import CouponDetailScene from '../CouponDetail/CouponDetailScene';
import AllCampaigns from '../../components/Campaigns/AllCampaigns';

import * as userActions from '../../actions/userActions';
import * as campaignsActions from '../../actions/campaignsActions';

@connect(state => ({
  user: state.user,
  // campaigns: state.campaigns,
}), {
  setUserProfile: userActions.setUserProfile,
  // setCampaigns: campaignsActions.setCampaigns,
})
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
          <AllCampaigns
            onPressProfile={this.goToProfile}
            onPressCampaign={this.pressCoupon}
          />
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

export default injectIntl(HomeScreen);