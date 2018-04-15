import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Typo } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { removeAuthenticationAsync } from '../../services/auth';
import { injectIntl } from 'react-intl';

import CouponCover from './CouponCover';
import CouponDescription from './CouponDescription';
import CompanyProfileRow from './CompanyProfileRow';
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
  catchCoupon = (catched) => {
    const { navigation, onClose } = this.props;
    if(!navigation) return;

    if(onClose) {
      if(catched) navigation.navigate('Profile');
      else console.log('Atrapa cupon!');

      onClose();
    }
  }

  render() {
    const campaign = this.props;
    const { onClose = () => null, intl, startAt = '', endAt = '', status } = campaign;

    // Formated Date
    const startDate = intl
      .formatDate(startAt, { month: 'short', day: 'numeric' })
      .toUpperCase();
    const endDate = intl
      .formatDate(endAt, { month: 'short', day: 'numeric', year: 'numeric' })
      .toUpperCase();
    const date = `${startDate} - ${endDate}`;

    // TODO: Cambiar el estado al correcto cuando este definido.
    let catched = false;
    if(status === 'hunted') catched = true;

    return (
      <ContainerScene>
        <ScrollView>
          <CouponCover
            catched={catched}
            background={campaign.image}
            date={date}
            title={campaign.title}
            companyName={((campaign || {}).maker || {}).name}
            couponsCount={campaign.totalCoupons}
            couponsCountCaption="Disponibles"
          />

          <CouponDescription catched={catched} qrCode=''>
            <Typo.TextBody>{campaign.customMessage}</Typo.TextBody>
            <Typo.TextBody>{campaign.description}</Typo.TextBody>
          </CouponDescription>

          <CompanyProfileRow
            avatar={campaign.avatarSource}
            name={((campaign || {}).maker || {}).name}
            slogan={((campaign || {}).maker || {}).slogan}
            button={{
              title: catched ? 'Ver Perfil' : 'Obtener Cupon',
              onPress: () => this.catchCoupon(catched),
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

export default injectIntl(CouponDetailScene);