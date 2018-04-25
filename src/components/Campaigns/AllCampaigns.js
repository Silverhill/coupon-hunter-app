import React, { Component } from 'react'
import { View, SectionList } from 'react-native';
import styled from 'styled-components/native';
import { Typo, HeaderBar } from 'coupon-components-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import uuid from 'uuid/v4';
import moment from 'moment';
import { injectIntl } from 'react-intl';

import Campaign from './Campaign';

// graphql
export const ALL_CAMPAIGNS_AND_ME = gql`
  query allCampaignsAndMe($withMe: Boolean = true) {
    me @include(if: $withMe){
      name
      role
      email
      image
    }

    allCampaigns(sortField: "startAt", sortDirection: -1) {
      campaigns {
        id
        startAt
        endAt
        country
        city
        totalCoupons
        huntedCoupons
        redeemedCoupons
        status
        title
        description
        customMessage
        deleted
        initialAgeRange
        finalAgeRange
        createdAt
        couponsHuntedByMe
        maker {
          id
          name
          provider
          role
        }
      }
    }
  }
`;

class AllCampaigns extends Component {
  state = {
    refreshing: false,
  }

  goToProfile = () => {
    const { onPressProfile } = this.props;
    if(onPressProfile) onPressProfile();
  }

  _keyExtractor = (item, index) => uuid();
  _renderItem = ({ item }) => {
    const { onPressCampaign} = this.props;
    return <Campaign campaign={item} onPress={onPressCampaign}/>
  }

  _renderSectionHeader = ({ title, hasProfile, date, data }) => {
    let sourceImage;
    if((data || {}).image) {
      sourceImage = { source: { uri: data.image } };
    }

    return (
      <HeaderBarContainer>
        <HeaderBar
          title={title}
          date={date}
          avatarOptions={hasProfile && {
            ...sourceImage,
            onPress: this.goToProfile,
          }}
        />
      </HeaderBarContainer>
    );
  }

  _campaigns(allCampaigns) {
    let today = [];
    let restOfDays = [];

    (allCampaigns || []).forEach(campaign => {
      if(campaign.startAt >= moment().hour(-1) && campaign.startAt <= moment().hour(23)) {
        today = today.concat(campaign);
      } else {
        restOfDays = restOfDays.concat(campaign);
      }
    });

    return { today, restOfDays };
  }

  _currentSections = (allCampaigns) => {
    const { intl } = this.props;

    let sections = [];
    const formattedToday = intl.formatDate(Date.now(), { year: 'numeric', month: 'long', day: '2-digit' });
    const todayTitle = intl.formatMessage({ id: 'todayScreen.today' });
    const restOfDaysTitle = intl.formatMessage({ id: 'todayScreen.otherDays' });

    const campaigns = this._campaigns(allCampaigns);

    let todaySection;
    let restSection;
    if(campaigns.today.length > 0) {
      todaySection = { title: todayTitle, data: campaigns.today, hasProfile: true, date: formattedToday };
      restSection = { title: restOfDaysTitle, data: campaigns.restOfDays };
      sections = sections.concat(todaySection, restSection);
    }else if (!campaigns.today.length) {
      todaySection = { title: restOfDaysTitle, data: campaigns.restOfDays, hasProfile: true, date: formattedToday };
      sections = sections.concat(todaySection);
    }

    return sections;
  }

  render() {
    const { refreshing } = this.state;

    return (
      <Query query={ALL_CAMPAIGNS_AND_ME}>{
        ({ data, fetchMore, error, loading }) => {

          if(loading) return <Typo.TextBody>Loading...</Typo.TextBody>
          else if(error) return <Typo.TextBody>{error.message}</Typo.TextBody>

          return (
            <SectionList
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              sections={this._currentSections(data.allCampaigns.campaigns)}
              renderSectionHeader={({section}) =>
                this._renderSectionHeader({
                  title: section.title,
                  hasProfile: section.hasProfile,
                  date: section.date,
                  data: data.me,
                })
              }
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
    )
  }

}

const HeaderBarContainer = styled(View)`
  margin-bottom: 20;
`;

export default injectIntl(AllCampaigns);