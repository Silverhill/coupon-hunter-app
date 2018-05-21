import React, { Component } from 'react'
import { View } from 'react-native';
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { CustomAlert, Typo } from 'coupon-components-native'
import { FormattedMessage } from 'react-intl'
import Like from '../Animations/Like'

class AlertCatchedCoupon extends Component {
  show = () => { this.alert.show() }
  close = () => { this.alert.close() }

  get actionsAlert() {
    const { intl } = this.props;
    const thanks = <FormattedMessage id='commons.thanks' />;

    return [
      { text: thanks, type: 'cancel' , onPress: () => this.close()},
    ]
  }

  get alertContent() {
    const couponCatched = <FormattedMessage id='commons.messages.alert.addedToWallet' />
    const SIZE = 200;

    return (
      <View style={{ width: SIZE, height: SIZE }}>
        <Like size={SIZE} style={{ top: 45 }}/>
        <Typo.Header center small bold>{couponCatched}</Typo.Header>
      </View>
    );
  }

  render() {
    const { actions } = this.props;
    return (
      <CustomAlert
        ref={ref => this.alert = ref}
        actions={this.actionsAlert}
        alertContent={this.alertContent}
      />
    )
  }
}

AlertCatchedCoupon.propTypes = {
  actions: PropTypes.array,
}

export default AlertCatchedCoupon;