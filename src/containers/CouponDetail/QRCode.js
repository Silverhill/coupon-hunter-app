import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/native';
import { View, Animated, Easing } from 'react-native';
import { Typo } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';
import Code from './Code';
import RedeemedConfirmation from './RedeemedConfimation';
import { connect } from 'react-redux';
import * as notificationActions from '../../actions/notificationActions';

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

@connect(null, {
  showAlert: notificationActions.showAlert,
})
class QRCode extends Component {
  // componentWillReceiveProps(nextProps) {
  //   const { showAlert } = this.props;
  //   if(nextProps.redeemed) {
  //     showAlert({ message: 'Tu promoción se ha reclamado exitosamente' });
  //   }
  // }

  render() {
    const { value, redeemed = false, catched, bgColor, showAlert} = this.props;
    return (
      <Container>
        {!redeemed && <Code bgColor={bgColor} value={value} />}
        {redeemed && <RedeemedConfirmation />}
      </Container>
    );
  }
};

QRCode.propTypes = {
  catched: PropTypes.bool,
  value: PropTypes.string,
  redeemed: PropTypes.bool,
}

export default QRCode;