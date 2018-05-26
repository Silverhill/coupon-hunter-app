import React from 'react'
import { View, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Typo } from 'coupon-components-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import uuid from 'uuid/v4';

import Campaign from './Campaign';
import { Queries } from '../../graphql';

const CampaignsByMakerId = ({ makerId, onPressCampaign, onCatchCampaign }) => {
  _keyExtractor = (item, index) => uuid();
  _renderItem = ({ item }) => (
    <Campaign
      campaign={item}
      onPress={onPressCampaign}
      mutationProps={{
        refetchQueries:['campaignsByMakerId'],
      }}
      hasBeenCatched={onCatchCampaign}
    />
  );

  return (
    <Query query={Queries.CAMPAIGNS_BY_MAKER_ID} variables={{ makerId }}>
    {({ loading, data, error }) => {
      if(loading) return <Typo.TextBody>Loading...</Typo.TextBody>;
      else if(error) return <Typo.TextBody>{`Error:${error.name} ${error.message}`}</Typo.TextBody>

      return (
        <ScreenContent>
          <FlatList
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            data={data.campaignsByMakerId}
          />
        </ScreenContent>
      );
    }}
    </Query>
  )
}

const ScreenContent = styled(View)`
  flex: 1;
`;

export default CampaignsByMakerId;