import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/native';
import { View } from 'react-native';
import { Typo } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';
import _QRCode from 'react-native-qrcode';

const Container = styled(View)`
  box-shadow: 5px 5px 5px ${Palette.dark.alpha(0.4).css()};
  padding: 20px 20px;
  background-color: white;
  position: absolute;
  height: 290;
  width: 290;
  align-self: center;
  border-radius: 10;
  top: -90;
  margin: 20px 20px;
  justify-content: center;
  align-items: center;
`;

const QRCode = ({ children, value }) => {
  return (
    <Container>
      <_QRCode
        value={value}
        size={260}
        bgColor={Palette.accent.css()}
        fgColor='white'
      />
    </Container>
  );
};

QRCode.propTypes = {
  children: PropTypes.string,
  typoProps: PropTypes.any,
  catched: PropTypes.bool,
}

export default QRCode;