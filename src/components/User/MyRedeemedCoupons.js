import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Palette } from 'coupon-components-native/styles';
import { Typo } from 'coupon-components-native';
import { Query } from 'react-apollo';
import uuid from 'uuid/v4';

import Campaign from '../Campaigns/Campaign';
import { Queries } from '../../graphql';


const MyRedeemCoupons = ({ onPressCampaign }) => {
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
        onPress={onPressCampaign}
      />
    );
  }

  return (
    <Query query={Queries.MY_REDEEMED_COUPONS}>
    {({ loading, data, error }) => {
      if(loading) return <Typo.TextBody>Loading...</Typo.TextBody>;
      else if(error) return <Typo.TextBody>{`Error:${error.name} ${error.message}`}</Typo.TextBody>

      return (
        <ScreenContent>
          <FlatList
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
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