import React, { PureComponent} from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Coupon } from 'coupon-components-native';
import { Mutation, Subscription } from 'react-apollo';
import uuid from 'uuid/v4';
import gql from 'graphql-tag';
import { injectIntl } from 'react-intl';
import { Mutations, Queries, Subscriptions } from '../../graphql';
import { statusService, UpdateQuery } from '../../services';

class Campaign extends PureComponent{
  _getTranslatedStatus = (status) => {
    const { intl } = this.props;
    const labelTranslated = intl.formatMessage({ id: status.id });
    return { ...status, label: labelTranslated }
  }

  render(){
    const {
      campaign,
      onPress = () => null,
      onHunt,
      intl,
      hideTag,
      hideTotalCoupons,
      small,
      hasBeenCatched = () => null,
      mutationProps,
    } = this.props;
    return (
      <Subscription subscription={Subscriptions.UPDATE_CAMPAIGN} variables={{ campaignId: campaign.id }}>{({ data, loading }) => {

        let dataCampaign = campaign;
        if('updatedCampaign' in (data || {})) {
          // Data for update the campaign.
          dataCampaign = {
            ...campaign,
            remainingCoupons: data.updatedCampaign.remainingCoupons
          }
        }

        let currentStatus = statusService.getCurrentStatus(dataCampaign.status);
        if(!dataCampaign.canHunt
          && currentStatus.key !== 'expired'
          && currentStatus.key !== 'redeemed'
          && currentStatus.key !== 'unavailable'
        ) {
          currentStatus = statusService.getCurrentStatus(statusService.constants.HUNTED);
        }

        let intlFormattedStatus = this._getTranslatedStatus(currentStatus);

        let startAt = (dataCampaign || {}).startAt;
        let endAt = (dataCampaign || {}).endAt;

        if(intl && startAt && endAt) {
          startAt = intl
            .formatDate(startAt, { month: 'short', day: 'numeric' })
            .toUpperCase();

          endAt = intl
            .formatDate(endAt, { month: 'short', day: 'numeric', year: 'numeric' })
            .toUpperCase();
        }


        return <Mutation
          mutation={Mutations.CAPTURE_COUPON}
          variables={{ campaignId: campaign.id }}
          update={UpdateQuery.campaigns}
          refetchQueries={['myCoupons']}
          key={campaign.id}
          {...mutationProps}
        >{(captureCoupon, { loading, error }) => {
          return (
            <StyledCoupon
              {...dataCampaign}
              totalCoupons={dataCampaign.remainingCoupons}
              small={small}
              status={intlFormattedStatus}
              key={dataCampaign.id}
              hideTag={hideTag}
              hideTotalCoupons={hideTotalCoupons}
              onPress={() => {onPress(dataCampaign)}}
              tagButton={{
                onPress: currentStatus.key === 'available' && currentStatus.key !== 'hunted' && (async () => {
                  if(!dataCampaign.canHunt) return;
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
                            ...dataCampaign,
                            canHunt: false,
                            remainingCoupons: dataCampaign.remainingCoupons,
                          },
                          __typename: 'CouponHunted',
                        },
                      },
                    });

                    setTimeout(() => {
                      hasBeenCatched(true);
                    }, 400)
                  } catch (err) {
                    console.log(err);
                    hasBeenCatched(false, err);
                  }
                })
              }}
              startAt={startAt}
              endAt={endAt}
            />
          );
        }}</Mutation>
      }}</Subscription>
    );
  }
}

// Styles
const StyledCoupon = styled(Coupon)`
  margin-bottom: 10;
`;

export default injectIntl(Campaign);