import React from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { Coupon } from 'coupon-components-native';
import { Mutation } from 'react-apollo';
import uuid from 'uuid/v4';
import gql from 'graphql-tag';
import { injectIntl } from 'react-intl';

// graphql
const CAPTURE_COUPON = gql`
  mutation captureCoupon($campaignId: String!) {
    captureCoupon(input: { campaignId: $campaignId }) {
      id
      status
      code
    }
  }
`;

const Campaign = ({ campaign, onPress = () => null, onHunt, intl }) => {

  let startAt = campaign.startAt;
  let endAt = campaign.endAt;
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
      mutation={CAPTURE_COUPON}
      refetchQueries={['allCampaignsAndMe', 'myCoupons']}
    >{(captureCoupon) => (

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
                variables: { campaignId: campaign.id }
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

// Styles
const StyledCoupon = styled(Coupon)`
  margin-bottom: 10;
`;

export default injectIntl(Campaign);