import React, { PureComponent } from 'react'
import { View, SectionList } from 'react-native';
import styled from 'styled-components/native';
import { Typo, HeaderBar } from 'coupon-components-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import uuid from 'uuid/v4';
import moment from 'moment';
import { injectIntl } from 'react-intl';

import Campaign from './Campaign';

// graphq
import { Queries } from '../../graphql';

class AllCampaigns extends PureComponent {
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
      <Query query={Queries.ALL_CAMPAIGNS_AND_ME} variables={{ limit: 30 }}>{
        ({ data, fetchMore, error, loading }) => {

          if(loading) return <Typo.TextBody>Loading...</Typo.TextBody>
          else if(error) return <Typo.TextBody>{error.message}</Typo.TextBody>

          const { allCampaigns: { campaigns } } = data;
          return (
            <SectionList
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              sections={this._currentSections(campaigns)}
              renderSectionHeader={({section}) =>
                this._renderSectionHeader({
                  title: section.title,
                  hasProfile: section.hasProfile,
                  date: section.date,
                  data: data.me,
                })
              }
              onEndReachedThreshold={0.2}
              onEndReached={async () => {
                try {
                  await fetchMore({
                    variables: { skip: campaigns.length },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult || fetchMoreResult.allCampaigns.totalCount === data.length) return prev;

                      const newData = { ...prev, allCampaigns: {
                          ...fetchMoreResult.allCampaigns,
                          campaigns: [...prev.allCampaigns.campaigns, ...fetchMoreResult.allCampaigns.campaigns]
                        },
                      };
                      return newData;
                    }
                  });
                } catch (error) {
                  return;
                }
              }
              }
              refreshing={refreshing}
              onRefresh={async () => {
                this.setState({ refreshing: true });

                await fetchMore({
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if(!fetchMoreResult) return prev;

                    const newData = {
                      ...prev,
                      ...fetchMoreResult,
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