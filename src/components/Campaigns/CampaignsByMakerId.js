import React from 'react'
import { View, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Typo } from 'coupon-components-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import uuid from 'uuid/v4';

import Campaign from './Campaign';

const CAMPAIGNS_BY_MAKER_ID = gql`
query campaignsByMakerId($makerId: String!){
  campaignsByMakerId(makerId: $makerId){
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
  }
}
`;

const CampaignsByMakerId = ({ makerId, onPressCampaign }) => {
  _keyExtractor = (item, index) => uuid();
  _renderItem = ({ item }) => {

    return (
      <Campaign
        campaign={item}
        onPress={onPressCampaign}
      />
    );
  }

  return (
    <Query query={CAMPAIGNS_BY_MAKER_ID} variables={{ makerId }}>
    {({ loading, data, error }) => {
      if(loading) return <Typo.TextBody>Loading...</Typo.TextBody>;
      else if(error) return <Typo.TextBody>{`Error:${error.name} ${error.message}`}</Typo.TextBody>

      return (
        <FlatList
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
          data={data.campaignsByMakerId}
        />
      );
    }}
    </Query>
  )
}

export default CampaignsByMakerId;