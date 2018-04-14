import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/native';
import { View } from 'react-native';
import { Typo } from 'coupon-components-native';
import QRCode from './QRCode';

const Container = styled(View)`
  padding: 20px 20px;
  align-items: flex-start;
  ${({ catched }) => catched && css`padding-top: 240`};
`;

const upperCaseText = (text = '') => text.toUpperCase();

const CouponDescription = ({ children, qrCode = '', catched = false }) => {
  return (
    <Container catched={catched}>
      {catched && <QRCode catched={catched} />}
      {children}
    </Container>
  );
};

CouponDescription.propTypes = {
  children: PropTypes.any,
  typoProps: PropTypes.any,
  catched: PropTypes.bool,
}

export default CouponDescription;