import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Palette } from 'coupon-components-native/styles';
import _QRCode from 'react-native-qrcode';

class Code extends Component {
  render() {
    const { value } = this.props;

    return (
      <_QRCode
        value={value}
        size={260}
        bgColor={Palette.accent.css()}
        fgColor='white'
      />
    );
  }
};

Code.propTypes = {
  value: PropTypes.string,
}

export default Code;