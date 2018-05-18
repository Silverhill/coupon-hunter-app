import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Palette } from 'coupon-components-native/styles';
import { Typo } from 'coupon-components-native';
import { Query } from 'react-apollo';
import uuid from 'uuid/v4';

import Campaign from '../Campaigns/Campaign';
import { Queries, Subscriptions } from '../../graphql';

let unsubscribe = null;
const MyRedeemCoupons = ({ onPressCampaign, scrollEventThrottle, onScroll }) => {
  _keyExtractor = (item, index) => uuid();

  _renderItem = ({ item }) => {
    const { campaign: _campaign, code, id, status } = item;
    const campaign = {
      ..._campaign,
      status,
      code,
      id,
    };

    return (
      <Campaign
        campaign={campaign}
        hideTotalCoupons
        small
        onPress={onPressCampaign}
      />
    );
  }

  return (
    <Query query={Queries.MY_REDEEMED_COUPONS}>
    {({ loading, data, error, subscribeToMore }) => {
      if(loading) return <Typo.TextBody>Loading...</Typo.TextBody>;
      else if(error) return <Typo.TextBody>{`Error:${error.name} ${error.message}`}</Typo.TextBody>

      // FIXME: Agregar un componente que ejecute en componentDidMount una sola vez la subscripción
      if(!unsubscribe) {
        unsubscribe = subscribeToMore({
          document: Subscriptions.REDEEMED_COUPON,
          updateQuery: (prev, { subscriptionData }) => {
            if(!subscriptionData.data) return prev;
            const { redeemedCoupon } = subscriptionData.data;

            // console.log('REDEEMED COUPON', redeemedCoupon)
            return {
              ...prev,
              myRedeemedCoupons: [...prev.myRedeemedCoupons, redeemedCoupon],
            }
          }
        })
      }

      return (
        <ScreenContent>
          <FlatList
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            contentContainerStyle={{ paddingTop: 10 }}
            scrollEventThrottle={scrollEventThrottle}
            onScroll={onScroll}
            data={data.myRedeemedCoupons}
          />
        </ScreenContent>
      );
    }}
    </Query>
  )
}

const ScreenContent = styled(View)`
  flex: 1;

  ${props => props.center && css`
    justify-content: center;
    align-items: center;
  `}
`;

export default MyRedeemCoupons;