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
  state = {
    capturedCampaign: {},
  }

  updateCampaigns = (cache, { data }) => {
    const { capturedCampaign } = this.state;
    const { allCampaigns, me } = cache.readQuery({ query: Queries.ALL_CAMPAIGNS_AND_ME });

    const campaigns = ((allCampaigns || {}).campaigns || []).map((item, i) => {
      if(capturedCampaign.id === item.id) {
        return {
          ...capturedCampaign,
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
        me: { ...me },
      }
    });
  }

  updateMyCoupons = (cache, { data }) => {
    const { capturedCampaign } = this.state;
    const d = cache.readQuery({ query: Queries.MY_COUPONS });

    console.log(d);
  };

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
        // refetchQueries={['allCampaignsAndMe', 'myCoupons', 'campaignsByMakerId']}
        update={(cache, data) => {
          // this.updateCampaigns(cache, data);
          // this.updateMyCoupons(cache, data);
        }}
      >{(captureCoupon) => (

        <StyledCoupon
          {...campaign}
          key={uuid()}
          onPress={() => onPress(campaign)}
          tagButton={{
            onPress: async () => {
              if(campaign.huntedCoupons > 0) return;
              if(onHunt) onHunt();

              // this.setState({ capturedCampaign: campaign });

              try {
                await captureCoupon({
                  variables: { campaignId: campaign.id },
                  optimisticResponse: {
                    __typename: 'Mutation',
                    allCampaigns: {
                      //FIXME: solucionar esto que tienen que ver con el intl
                    }
                  },
                });
                Alert.alert(intl.formatMessage({ id: "commons.messages.alert.couponHunted" }));
              } catch (error) {
                Alert.alert(intl.formatMessage({ id: "commons.messages.alert.onlyOneCoupon" }))
              }
            }
          }}
          startAt={startAt}
          endAt={endAt}
        />
      )}</Mutation>
    );
  }
}

// Styles
const StyledCoupon = styled(Coupon)`
  margin-bottom: 10;
`;

export default injectIntl(Campaign);