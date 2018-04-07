import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Typo } from 'coupon-components-native';

const Container = styled(View)`
  padding: 20px 20px
`;

const Description = styled(Typo.TextBody)``;

const upperCaseText = (text = '') => text.toUpperCase();

const CouponDescription = ({ children, ifNotDescription = 'No tenemos descripción', ...typoProps }) => {
  return (
    <Container>
      <Description {...typoProps}>{children || ifNotDescription}</Description>
    </Container>
  );
};

CouponDescription.propTypes = {
  children: PropTypes.string,
  typoProps: PropTypes.any,
}

export default CouponDescription;