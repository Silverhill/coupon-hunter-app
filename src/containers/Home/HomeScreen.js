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
import { query } from '../../services/graphql';
import { graphqlService, authService, intl, statusService } from '../../services';
import CouponDetailScene from '../CouponDetail/CouponDetailScene';

import * as userActions from '../../actions/userActions';
import * as campaignsActions from '../../actions/campaignsActions';

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
    refreshing: false,
    error: null,
  }

  captureCoupon = async (campaign) => {
    const { captureCoupon: huntCoupon, intl } = this.props;
    if(campaign.huntedCoupons > 0) return;

    try {
      await huntCoupon(campaign.id);

      //TODO: remover estas alertas por las alertar propias cuando estén creadas
      Alert.alert(intl.formatMessage({ id: "commons.messages.alert.couponHunted" }));
    } catch (error) {
      console.log(error.message);
      //TODO: remover estas alertas por las alertar propias cuando estén creadas
      Alert.alert(intl.formatMessage({ id: "commons.messages.alert.onlyOneCoupon" }))
    }
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

  _keyExtractor = (item, index) => uuid();
  _renderSectionHeader = ({ title, hasProfile, date, data }) => {
    const { intl } = this.props;

    return (
      <HeaderBarContainer>
        <HeaderBar
          title={title}
          date={date}
          avatarOptions={hasProfile && {
            source: {uri: 'https://i.pinimg.com/originals/11/0f/00/110f0057f178a5f1357925aad67a9dd4.png'},
            onPress: this.goToProfile,
          }}
        />
      </HeaderBarContainer>
    );
  }

  renderCoupon = ({item: campaign, index, section}) => {
    const { intl } = this.props;

    const startAt = intl
      .formatDate(campaign.startAt, { month: 'short', day: 'numeric' })
      .toUpperCase();

    const endAt = intl
      .formatDate(campaign.endAt, { month: 'short', day: 'numeric', year: 'numeric' })
      .toUpperCase();

    return (
      <StyledCoupon
        {...campaign}
        key={campaign.id}
        onPress={() => this.pressCoupon(campaign)}
        tagButton={{onPress: () => this.captureCoupon(campaign)}}
        startAt={startAt}
        endAt={endAt}
      />
    );
  }

  campaigns(allCampaigns) {
    let today = [];
    let restOfDays = [];

    (allCampaigns || []).forEach(campaign => {
      if(campaign.startAt >= moment().hour(0) && campaign.startAt <= moment().hour(23)) {
        today = today.concat(campaign);
      } else {
        restOfDays = restOfDays.concat(campaign);
      }
    });

    return { today, restOfDays };
  }

  currentSections(allCampaigns) {
    const { intl } = this.props;

    let sections = [];
    const formattedToday = intl.formatDate(Date.now(), { year: 'numeric', month: 'long', day: '2-digit' });
    const todayTitle = intl.formatMessage({ id: 'todayScreen.today' });
    const restOfDaysTitle = intl.formatMessage({ id: 'todayScreen.otherDays' });

    const campaigns = this.campaigns(allCampaigns);

    if(campaigns.today.length > 0) {
      todaySection = { title: todayTitle, data: campaigns.today, hasProfile: true, date: formattedToday };
      restSection = { title: restOfDaysTitle, data: campaigns.restOfDays };
      sections = sections.concat(todaySection, restSection);
    }else if (!campaigns.today.length) {
      todaySection = { title: restOfDaysTitle, data: campaigns.restOfDays, hasProfile: true };
      sections = sections.concat(todaySection);
    }

    return sections;
  }

  render() {
    const { refreshing } = this.state;
    const { intl, navigation, setUserProfile } = this.props;

    return (
      <TodayContainer>
      <CampaignsContainer>
        <Query query={graphqlService.query.composedMeAllCampaigns}>{
          ({ data, fetchMore, error, loading }) => {

            if(loading) return <Text>Loading...</Text>
            else if(error) return <Text>{error.message}</Text>

            return (
              <SectionList
                keyExtractor={this._keyExtractor}
                renderItem={this.renderCoupon}
                renderSectionHeader={({section}) =>
                  this._renderSectionHeader({
                    title: section.title,
                    hasProfile: section.hasProfile,
                    date: section.date,
                    data: data.me,
                  })
                }
                sections={this.currentSections(data.allCampaigns.campaigns)}
                refreshing={refreshing}
                onRefresh={async () => {
                  this.setState({ refreshing: true });

                  await fetchMore({
                    updateQuery: (prev, newResult) => {
                      if(!newResult) return prev;

                      const newData = {
                        ...prev,
                        ...newResult.fetchMoreResult,
                      };

                      return newData;
                    }
                  });

                  this.setState({ refreshing: false });
                }}
                stickySectionHeadersEnabled
              />
            );
          }}</Query>
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

export default withApollo(compose(
  graphqlService.mutation.captureCoupon,
)(injectIntl(HomeScreen)));