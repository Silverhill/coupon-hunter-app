import React, { Component } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { Coupon } from 'coupon-components-native';
import { Mutation } from 'react-apollo';
import uuid from 'uuid/v4';
import gql from 'graphql-tag';
import { injectIntl } from 'react-intl';
import { Mutations, Queries } from '../../graphql';

class Campaign extends Component{
  updateCampaigns = (cache, { data: { captureCoupon: { campaign } } }) => {
    const { allCampaigns, me } = cache.readQuery({ query: Queries.ALL_CAMPAIGNS_AND_ME });

    const campaigns = ((allCampaigns || {}).campaigns || []).map((item, i) => {
      if(campaign.id === item.id) {
        return {
          ...item,
          huntedCoupons: 1,
        };
      }
      return item;
    });

    cache.writeQuery({
      query: Queries.ALL_CAMPAIGNS_AND_ME,
      data: {
        allCampaigns: {
          ...allCampaigns,
          campaigns,
        },
        me,
      }
    });
  }

  render(){
    const { campaign, onPress = () => null, onHunt, intl } = this.props;
    let startAt = (campaign || {}).startAt;
    let endAt = (campaign || {}).endAt;

    if(intl) {
      startAt = intl
        .formatDate(campaign.startAt, { month: 'short', day: 'numeric' })
        .toUpperCase();

      endAt = intl
        .formatDate(campaign.endAt, { month: 'short', day: 'numeric', year: 'numeric' })
        .toUpperCase();
    }

    return (
      <Mutation
        mutation={Mutations.CAPTURE_COUPON}
        // refetchQueries={['myCoupons']}
        variables={{ campaignId: campaign.id }}
        update={this.updateCampaigns}
        key={campaign.id}
      >{(captureCoupon, { loading, error }) => {
        return (
          <StyledCoupon
            {...campaign}
            key={uuid()}
            onPress={() => onPress(campaign)}
            tagButton={{
              onPress: async () => {
                if(campaign.huntedCoupons > 0) return;
                if(onHunt) onHunt();

                try {
                  await captureCoupon({
                    optimisticResponse: {
                      __typename: 'Mutation',
                      captureCoupon: {
                        id: -1,
                        status: 'hunted',
                        code: -1,
                        campaign,
                        __typename: 'CouponHunted',
                      },
                    },
                  });
                  Alert.alert(intl.formatMessage({ id: "commons.messages.alert.couponHunted" }));
                } catch (err) {
                  console.log(err);
                  Alert.alert(intl.formatMessage({ id: "commons.messages.alert.onlyOneCoupon" }))
                }
              },
            }}
            startAt={startAt}
            endAt={endAt}
          />
        );
      }}</Mutation>
    );
  }
}

// Styles
const StyledCoupon = styled(Coupon)`
  margin-bottom: 10;
`;

export default injectIntl(Campaign);