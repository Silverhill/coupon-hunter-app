import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { removeAuthenticationAsync } from '../../services/auth';

import CouponCover from './CouponCover';
import CouponDescription from './CouponDescription';
import CompanyProfileRow from './CompanyProfileRow';

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

export default class CouponDetailScene extends Component {
  render() {
    const campaign = this.props;
    const { onClose = () => null } = campaign;

    return (
      <ContainerScene>
        <ScrollView>
          <CouponCover
            background={campaign.imageSource}
            date={campaign.date}
            title={campaign.title}
            companyName={((campaign || {}).maker || {}).name}
            couponsCount={campaign.numberOfCoupons}
            couponsCountCaption="Disponibles"
          />
          <CouponDescription>
            {campaign.description}
          </CouponDescription>

          <CompanyProfileRow
            avatar={campaign.avatarSource}
            name={((campaign || {}).maker || {}).name}
            slogan={((campaign || {}).maker || {}).slogan}
            button={{
              title: 'Obtener Cupon'
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