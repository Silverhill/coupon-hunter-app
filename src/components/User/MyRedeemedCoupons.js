import React, { PureComponent } from 'react';
import { View, FlatList, Image } from 'react-native';
import styled, { css } from 'styled-components/native';
import { CacheManager } from "react-native-expo-image-cache";
import { Typo } from 'coupon-components-native';
import { Query } from 'react-apollo';
import uuid from 'uuid/v4';

import Campaign from '../Campaigns/Campaign';
import { Queries, Subscriptions } from '../../graphql';
import coupon_redeemed from '../../assets/images/coupon_redeemed_example.png';

let unsubscribe = null;
class MyRedeemCoupons extends PureComponent {
  _keyExtractor = () => uuid();

  _renderItem = ({ item }) => {
    const { onPressCampaign } = this.props;
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

  render () {
    const { scrollEventThrottle, onScroll } = this.props;
    return (
      <Query query={Queries.MY_REDEEMED_COUPONS}>
      {({ loading, data, error, subscribeToMore }) => {
        if(loading) return <Typo.TextBody>Loading...</Typo.TextBody>;
        else if(error) return <Typo.TextBody>{`Error:${error.name} ${error.message}`}</Typo.TextBody>

        const hasCoupons = data.myRedeemedCoupons.length > 0;

        // FIXME: Agregar un componente que ejecute en componentDidMount una sola vez la subscripción
        if(!unsubscribe) {
          unsubscribe = subscribeToMore({
            document: Subscriptions.REDEEMED_COUPON,
            updateQuery: (prev, { subscriptionData }) => {
              if(!subscriptionData.data) return prev;
              const { redeemedCoupon } = subscriptionData.data;

              return {
                ...prev,
                myRedeemedCoupons: [...prev.myRedeemedCoupons, redeemedCoupon],
              }
            }
          })
        }

        const redeemedData = data.myRedeemedCoupons.map((coupon) => {
          const { campaign: _campaign, code, id, status } = coupon;

          const campaign = {
            ..._campaign,
            status,
            code,
            id,
          };

          return campaign;
        });

        return (
          <ScreenContent center={!hasCoupons}>
            {hasCoupons && (
              <FlatList
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                contentContainerStyle={{ paddingTop: 10 }}
                scrollEventThrottle={scrollEventThrottle}
                onScroll={onScroll}
                data={data.myRedeemedCoupons}
              />
            )}
            {!hasCoupons && (
              <EmptyContainer>
                <EmptyState resizeMode='contain' source={coupon_redeemed} />
                <Typo.TextBody secondary center>Cada vez que una promoción se use exitosamente aparecerá como canjeada en esta sección de tu wallet.</Typo.TextBody>
              </EmptyContainer>
            )}
          </ScreenContent>
        );
      }}
      </Query>
    )
  }
}

const ScreenContent = styled(View)`
  flex: 1;

  ${props => props.center && css`
    justify-content: center;
    align-items: center;
  `}
`;

const EmptyContainer = styled(View)`
  justify-content: center;
  align-items: center;
  padding-horizontal: 40;
`;

const EmptyState = styled(Image)`
  width: 200;
  margin-bottom: 20;
`;


export default MyRedeemCoupons;