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
  updateCampaigns = (cache, { data: { captureCoupon: { campaign, ...coupon } } }) => {
    const { allCampaigns } = cache.readQuery({ query: Queries.ALL_CAMPAIGNS });

    try {
      const { myCoupons } = cache.readQuery({ query: Queries.MY_COUPONS });
      const newCoupon = { ...coupon, campaign }
      cache.writeQuery({ query: Queries.MY_COUPONS, data: { myCoupons: [...myCoupons, newCoupon] } });
    } catch (err) {/*console.log(err);*/}

    const campaigns = ((allCampaigns || {}).campaigns || []).map((_campaign, i) => {
      if(campaign.id === _campaign.id) {
        return {
          ..._campaign,
          canHunt: false,
          totalCoupons: (_campaign.totalCoupons - _campaign.huntedCoupons),
        };
      }

      return _campaign;
    });

    const newDataAllCampaigns = {
      allCampaigns: {
        ...allCampaigns,
        campaigns,
      },
    };

    cache.writeQuery({ query: Queries.ALL_CAMPAIGNS, data: newDataAllCampaigns });
  }

  render(){
    const { campaign, onPress = () => null, onHunt, intl } = this.props;
    let startAt = (campaign || {}).startAt;
    let endAt = (campaign || {}).endAt;

    if(intl && startAt && endAt) {
      startAt = intl
        .formatDate(startAt, { month: 'short', day: 'numeric' })
        .toUpperCase();

      endAt = intl
        .formatDate(endAt, { month: 'short', day: 'numeric', year: 'numeric' })
        .toUpperCase();
    }

    return (
      <Mutation
        mutation={Mutations.CAPTURE_COUPON}
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
                if(!campaign.canHunt) return;
                if(onHunt) onHunt();

                try {
                  await captureCoupon({
                    optimisticResponse: {
                      __typename: 'Mutation',
                      captureCoupon: {
                        id: -1,
                        status: 'hunted',
                        code: -1,
                        campaign: {
                          ...campaign,
                          canHunt: false,
                          totalCoupons: (campaign.totalCoupons - campaign.huntedCoupons) - 1,
                        },
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