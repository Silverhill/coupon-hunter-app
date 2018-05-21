import React, { Component } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Coupon } from 'coupon-components-native';
import { Mutation } from 'react-apollo';
import uuid from 'uuid/v4';
import gql from 'graphql-tag';
import { injectIntl } from 'react-intl';
import { Mutations, Queries } from '../../graphql';
import { statusService } from '../../services';

class Campaign extends Component{
  state = {
    alertVisible: false,
  }

  updateCampaigns = (cache, { data: { captureCoupon: { campaign, ...coupon } } }) => {
    const { allCampaigns } = cache.readQuery({ query: Queries.ALL_CAMPAIGNS });

    try {
      const { myCoupons } = cache.readQuery({ query: Queries.MY_COUPONS });
      const newCoupon = { ...coupon, campaign }
      cache.writeQuery({ query: Queries.MY_COUPONS, data: { myCoupons: myCoupons.concat(newCoupon) } });
    } catch (err) {/*console.log(err);*/}

    const campaigns = ((allCampaigns || {}).campaigns || []).map((_campaign, i) => {
      if(campaign.id === _campaign.id) {
        return {
          ..._campaign,
          canHunt: false,
          remainingCoupons: campaign.remainingCoupons,
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

  _getTranslatedStatus = (status) => {
    const { intl } = this.props;
    const labelTranslated = intl.formatMessage({ id: status.id });
    return { ...status, label: labelTranslated }
  }

  render(){
    const { alertVisible } = this.state;
    const { campaign, onPress = () => null, onHunt, intl, hideTag, hideTotalCoupons, small, hasBeenCatched = () => null } = this.props;
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

    let currentStatus = statusService.getCurrentStatus(campaign.status);
    if(!campaign.canHunt && currentStatus.key !== 'expired' && currentStatus.key !== 'redeemed') {
      currentStatus = statusService.getCurrentStatus(statusService.constants.HUNTED);
    }

    let intlFormattedStatus = this._getTranslatedStatus(currentStatus);

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
            totalCoupons={campaign.remainingCoupons}
            small={small}
            status={intlFormattedStatus}
            key={uuid()}
            hideTag={hideTag}
            hideTotalCoupons={hideTotalCoupons}
            onPress={() => {onPress(campaign)}}
            tagButton={{
              onPress: currentStatus.key === 'available' && currentStatus.key !== 'hunted' && (async () => {
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
                          remainingCoupons: campaign.remainingCoupons - 1,
                        },
                        __typename: 'CouponHunted',
                      },
                    },
                  });

                  setTimeout(() => {
                    hasBeenCatched(true);
                  }, 300)
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
    );
  }
}

// Styles
const StyledCoupon = styled(Coupon)`
  margin-bottom: 10;
`;

export default injectIntl(Campaign);