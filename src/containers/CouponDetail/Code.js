import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Palette } from 'coupon-components-native/styles';
import _QRCode from 'react-native-qrcode';
import chroma from 'chroma-js';

class Code extends Component {
  render() {
    const { value, bgColor } = this.props;

    let fgColor;
    const color = bgColor && chroma(bgColor).darken(1.5).css();
    return (
      <_QRCode
        value={value}
        size={260}
        bgColor={color || Palette.accent.css()}
        fgColor={fgColor || Palette.white.css()}
      />
    );
  }
};

Code.propTypes = {
  value: PropTypes.string,
}

export default Code;