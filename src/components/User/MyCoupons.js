import React, { PureComponent } from 'react'
import { View, FlatList, Image } from 'react-native';
import styled, { css } from 'styled-components/native';
import { Typo } from 'coupon-components-native';
import { Query } from 'react-apollo';
import { CacheManager } from "react-native-expo-image-cache";
import uuid from 'uuid/v4';

import Campaign from '../Campaigns/Campaign';
import { Queries, Subscriptions } from '../../graphql';
import coupon_catch from '../../assets/images/coupon_catch_example.png';


let unsubscribe = null;
class MyCoupons extends PureComponent {
  _keyExtractor = () => uuid();
  _renderItem = ({ item }) => {
    const { onPressCampaign } = this.props;
    const { campaign: _campaign, code, id, status } = item;

    // Add cached Images
    _campaign.image = CacheManager.get(_campaign.image).getPath();

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
        hideTag
        small
        hideTotalCoupons
      />
    );
  }

  render() {
    const { scrollEventThrottle, onScroll } = this.props;

    return (
      <Query query={Queries.MY_COUPONS}>
      {({ loading, data, error, subscribeToMore }) => {
        if(loading) return <Typo.TextBody>Loading...</Typo.TextBody>;
        else if(error) return <Typo.TextBody>{`Error:${error.name} ${error.message}`}</Typo.TextBody>

        const hasCoupons = data.myCoupons.length > 0;

        // FIXME: Agregar un componente que ejecute en componentDidMount una sola vez la subscripción
        if(!unsubscribe) {
          unsubscribe = subscribeToMore({
            document: Subscriptions.REDEEMED_COUPON,
            updateQuery: (prev, { subscriptionData }) => {
              if(!subscriptionData.data) return prev;
              const { redeemedCoupon } = subscriptionData.data;

              // TODO: necesitamos mejorar esta lógica de extracción de un coupon del array
              const myCouponsRemovedRedeemed = (prev.myCoupons || []).filter(coupon => coupon.code !== redeemedCoupon.code);
              return {
                ...prev,
                myCoupons: myCouponsRemovedRedeemed,
              }
            }
          })
        }

        return (
          <ScreenContent center={!hasCoupons}>
            {hasCoupons && (
              <FlatList
                contentContainerStyle={{ paddingTop: 10 }}
                scrollEventThrottle={scrollEventThrottle}
                onScroll={onScroll}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                data={data.myCoupons}
              />
            )}
            {!hasCoupons && (
              <EmptyContainer>
                <EmptyState resizeMode='contain' source={coupon_catch} />
                <Typo.TextBody secondary center>Cada vez que obtengas una promoción se guardará aquí en tu wallet, hasta que las puedas reclamar o que la campaña expire.</Typo.TextBody>
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

export default MyCoupons;