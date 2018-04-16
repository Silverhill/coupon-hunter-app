import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, StatusBar, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Button, Typo } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { removeAuthenticationAsync } from '../../services/auth';
import { injectIntl } from 'react-intl';
import { compose } from 'react-apollo';

import CouponCover from './CouponCover';
import CouponDescription from './CouponDescription';
import CompanyProfileRow from './CompanyProfileRow';
import { graphqlService } from '../../services';
import QRCode from './QRCode';

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

class CouponDetailScene extends Component {
  catchCoupon = async ({ campaign, hunted }) => {
    const { navigation, onClose, maker = {}, captureCoupon, intl } = this.props;

    if(onClose) {
      if(hunted) {
        if(!navigation) {
          console.warn(`We need pass navigation props in this component ${this.contructor.name}`)
          return
        };

        navigation.navigate('Maker', { ...maker });
      }
      else {
        try {
          await captureCoupon(campaign.id);
          //TODO: remover estas alertas por las alertar propias cuando estén creadas
          Alert.alert(intl.formatMessage({ id: "commons.messages.alert.couponHunted" }));
        } catch (error) {
          console.log(error.message);
          //TODO: remover estas alertas por las alertar propias cuando estén creadas
          Alert.alert(intl.formatMessage({ id: "commons.messages.alert.onlyOneCoupon" }))
        }

      }

      onClose();
    }
  }

  render() {
    const campaign = this.props;
    const { onClose = () => null, intl, startAt = '', endAt = '', status } = campaign;

    const startDate = intl
      .formatDate(startAt, { month: 'short', day: 'numeric' })
      .toUpperCase();
    const endDate = intl
      .formatDate(endAt, { month: 'short', day: 'numeric', year: 'numeric' })
      .toUpperCase();
    const date = `${startDate} - ${endDate}`;

    // TODO: Cambiar el estado al correcto cuando este definido.
    let hunted = false;
    if(status === 'hunted') hunted = true;

    console.log(status);

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
            couponsCountCaption="Disponibles"
          />

          <CouponDescription catched={hunted} qrCode=''>
            <Typo.TextBody>{campaign.customMessage}</Typo.TextBody>
            <Typo.TextBody>{campaign.description}</Typo.TextBody>
          </CouponDescription>

          <CompanyProfileRow
            avatar={campaign.avatarSource}
            name={((campaign || {}).maker || {}).name}
            slogan={((campaign || {}).maker || {}).slogan}
            button={{
              title: hunted ? 'Ver Perfil' : 'Obtener Cupon',
              onPress: () => this.catchCoupon({ campaign, hunted }),
            }}
          />
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

export default compose(
  graphqlService.mutation.captureCoupon,
)(injectIntl(CouponDetailScene));