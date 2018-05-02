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
import { compose, Mutation } from 'react-apollo';

import CouponCover from './CouponCover';
import CouponDescription from './CouponDescription';
import CompanyProfileRow from './CompanyProfileRow';
import { graphqlService, statusService } from '../../services';
import QRCode from './QRCode';

// Graphql
import { Mutations } from '../../graphql';

class CouponDetailScene extends Component {
  goToMakerProfile = () => {
    const { maker = {}, navigation, onClose } = this.props;

    if(onClose) {

      if(!navigation) {
        console.warn(`We need pass navigation props in this component ${CouponDetailScene.name}`)
        return
      };

      navigation.navigate('Maker', { ...maker });
      onClose();
    }
  }

  catchCoupon = async (campaignId, mutation) => {
    const { intl, onClose } = this.props;
    try {
      await mutation.captureCoupon({ variables: { campaignId } });
      //TODO: remover estas alertas por las alertar propias cuando estén creadas
      onClose();
      Alert.alert(intl.formatMessage({ id: "commons.messages.alert.couponHunted" }));
    } catch (error) {
      console.log(error.message);
      //TODO: remover estas alertas por las alertar propias cuando estén creadas
      Alert.alert(intl.formatMessage({ id: "commons.messages.alert.onlyOneCoupon" }))
    }
  }



  render() {
    const campaign = this.props;
    const { onClose = () => null, intl, startAt = '', endAt = '', status, withoutMakerProfile = false, huntedCoupons, code = '' } = campaign;

    const availableText = intl
      .formatMessage(
        { id: "couponDetailScene.couponAvailable"},
        { totalCoupons: String(campaign.totalCoupons) })
      .match(/([a-z])\w+/gi)[0];

    const startDate = intl
      .formatDate(startAt, { month: 'short', day: 'numeric' })
      .toUpperCase();
    const endDate = intl
      .formatDate(endAt, { month: 'short', day: 'numeric', year: 'numeric' })
      .toUpperCase();
    const date = `${startDate} - ${endDate}`;

    // FIXME: Cambiar el estado al correcto cuando este definido.
    let hunted = false;
    if(status === 'hunted') hunted = true;

    return (
      <ContainerScene>
        <ScrollView>
          <CouponCover
            catched={hunted}
            background={campaign.image}
            date={date}
            title={campaign.title}
            companyName={((campaign || {}).maker || {}).name}
            couponsCount={campaign.totalCoupons}
            couponsCountCaption={availableText}
            code={code}
          />

          <CouponDescription catched={hunted} qrCode={hunted ? code : ''}>
            <Typo.TextBody>{campaign.customMessage}</Typo.TextBody>
            <Typo.TextBody>{campaign.description}</Typo.TextBody>
          </CouponDescription>

          {!withoutMakerProfile && (
            <View>
              <CompanyProfileRow
                avatar={campaign.avatarSource}
                name={((campaign || {}).maker || {}).name}
                slogan={((campaign || {}).maker || {}).slogan}
                button={{
                  title: <FormattedMessage id="commons.viewProfile" />,
                  onPress: this.goToMakerProfile,
                  big: true,
                  backgroundColor: Palette.secondaryAccent.css(),
                }}
              />
              </View>
            )}
            {!hunted && !(huntedCoupons > 0) && (
              <Mutation
                mutation={Mutations.CAPTURE_COUPON}
                refetchQueries={['allCampaignsAndMe', 'myCoupons', 'campaignsByMakerId']}
              >{(captureCoupon) => (
                <CaptureButton
                  title="Capturar Cupon"
                  rightIcon="md-download"
                  pill
                  onPress={() => this.catchCoupon(campaign.id, {captureCoupon})}
                  iconColor={Palette.white.css()}
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

export default compose(
  graphqlService.mutation.captureCoupon,
)(injectIntl(CouponDetailScene));