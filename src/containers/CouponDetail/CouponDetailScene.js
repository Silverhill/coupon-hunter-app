import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, StatusBar, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ButtonGradient, Typo } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { removeAuthenticationAsync } from '../../services/auth';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Mutation } from 'react-apollo';

import CouponCover from './CouponCover';
import CouponDescription from './CouponDescription';
import CompanyProfileRow from './CompanyProfileRow';
import { statusService, UpdateQuery } from '../../services';
import QRCode from './QRCode';

// Graphql
import { Mutations } from '../../graphql';

class CouponDetailScene extends Component {
  goToMakerProfile = () => {
    const { campaign: { maker = {} }, navigation, onClose } = this.props;

    if(onClose) {
      if(!navigation) {
        console.warn(`We need pass navigation props in this component ${CouponDetailScene.name}`)
        return
      };

      navigation.navigate('Maker', { ...maker });
      onClose();
    }
  }

  render() {
    const { campaign, intl, onClose = () => null, withoutMakerProfile = false, hasBeenCatched = () => null } = this.props;
    const {
      startAt = '',
      endAt = '',
      status,
      huntedCoupons,
      totalCoupons,
      remainingCoupons,
      code = '',
      canHunt,
    } = campaign;

    const availableCoupons = remainingCoupons;

    const availableText = intl
      .formatMessage(
        { id: "couponDetailScene.couponAvailable"},
        { totalCoupons: String(availableCoupons) })
      .match(/([a-z])\w+/gi)[0];

    const startDate = intl
      .formatDate(startAt, { month: 'short', day: 'numeric' })
      .toUpperCase();
    const endDate = intl
      .formatDate(endAt, { month: 'short', day: 'numeric', year: 'numeric' })
      .toUpperCase();
    const date = `${startDate} - ${endDate}`;

    let hunted = false;
    if(status === 'hunted' || status === 'redeemed') hunted = true;

    return (
      <ContainerScene>
        <ScrollView>
          <CouponCover
            catched={hunted}
            backgroundImg={campaign.image}
            date={date}
            title={campaign.title}
            companyName={((campaign || {}).maker || {}).name}
            couponsCount={availableCoupons}
            couponsCountCaption={availableText}
            code={code}
          />

          <CouponDescription catched={hunted} qrCode={hunted ? code : ''} qrColor={(campaign || {}).background}>
            {((campaign || {}).office || {}).address && <Conditions>
              <Typo.Header bold>Dirección:</Typo.Header>
              <TermAndConditions>{campaign.office.address}</TermAndConditions>
            </Conditions>}

            <Conditions>
              <Typo.Header bold>Terminos y Condiciones:</Typo.Header>
              <TermAndConditions>{campaign.customMessage}</TermAndConditions>
            </Conditions>

            <Description>
              <Typo.Header bold>Descripción:</Typo.Header>
              <Typo.TextBody>{campaign.description}</Typo.TextBody>
            </Description>
          </CouponDescription>

          {!withoutMakerProfile && (
            <View>
              <CompanyProfileRow
                background={campaign.background}
                avatar={((campaign || {}).maker || {}).image}
                name={((campaign || {}).maker || {}).name}
                slogan={(((campaign || {}).office || {}).company || {}).slogan}
                button={{
                  title: <FormattedMessage id="commons.viewProfile" />,
                  onPress: this.goToMakerProfile,
                  big: true,
                  backgroundColor: Palette.secondaryAccent.css(),
                }}
              />
              </View>
            )}
            {canHunt && (
              <Mutation
                mutation={Mutations.CAPTURE_COUPON}
                update={UpdateQuery.campaigns}
                variables={{ campaignId: campaign.id }}
              >{(captureCoupon) => (
                <CaptureButton
                  title="Capturar Cupon"
                  pill
                  iconColor={Palette.white.css()}
                  onPress={async () => {
                    if(!campaign.canHunt) return;

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
                      onClose();

                      setTimeout(() => {
                        hasBeenCatched(true);
                      }, 300)
                    } catch (error) {
                      console.log(error);
                      hasBeenCatched(false, error);
                    }
                  }}
                />
              )}
              </Mutation>
            )}
        </ScrollView>

        <CloseButton onPress={onClose}>
          <Ionicons
            size={37}
            name="md-close-circle"
            color={Palette.white.alpha(0.8).css()}
          />
        </CloseButton>

        <StatusBar hidden/>
      </ContainerScene>
    )
  }
}

CouponDetailScene.propTypes = {

};


const ContainerScene = styled(View)`
  position: relative;
  background-color: white;
  flex: 1;
`;

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  top: 10;
  right: 10;
`;

const CaptureButton = styled(ButtonGradient)`
  margin-vertical: 30;
  margin-horizontal: 50;
  border-color: black;
`;

const Conditions = styled(View)`
  margin-bottom: 20;
  flex: 1;
`;

const Description = styled(View)`
  flex: 1;
`;

const TermAndConditions = styled(Typo.TextBody)`
  flex: 1;
`;

export default injectIntl(CouponDetailScene);