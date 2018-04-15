import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/native';
import { View } from 'react-native';
import { Typo } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';

const Container = styled(View)`
  box-shadow: 5px 5px 5px ${Palette.dark.alpha(0.4).css()};
  padding: 20px 20px;
  background-color: white;
  position: absolute;
  height: 290;
  border-radius: 10;
  top: -90;
  margin: 20px 20px;
  width: 100%;
`;

const upperCaseText = (text = '') => text.toUpperCase();

const QRCode = ({ children }) => {
  return (
    <Container>

    </Container>
  );
};

QRCode.propTypes = {
  children: PropTypes.string,
  typoProps: PropTypes.any,
  catched: PropTypes.bool,
}

export default QRCode;