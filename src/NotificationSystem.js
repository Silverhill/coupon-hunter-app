import React, { Component } from 'react';
import { Typo, CustomAlert } from 'coupon-components-native';
import { connect } from 'react-redux';
import { View } from 'react-native';
import * as notificationActions from './actions/notificationActions';

@connect(store => ({
  alert: store.notifications.alert,
}),{
  hideAlert: notificationActions.hideAlert,
})
export default class NotificationSystem extends Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.alert.isDisplaying === true) {
      this.alert.show();
    }else if(nextProps.alert.isDisplaying === false) {
      this.alert.close();
    }
  }

  render() {
    const { alert, hideAlert } = this.props;
    const defaultActions = alert.content.actions.length || [
      {
        text: 'Ok',
        type: 'cancel',
        onPress: () => { hideAlert() },
      },
    ];

    const AlertContent = (
      <View>
        <Typo.Header>Hola! akdhfkadjf akfdjks f Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem quibusdam provident sed, dicta aliquam, ipsa qui possimus assumenda placeat voluptate doloremque sunt veritatis. Repudiandae eaque rem, non in nesciunt iusto.</Typo.Header>
      </View>
    );

    return (
      <CustomAlert
        ref={ref => (this.alert = ref)}
        actions={defaultActions}
        alertContent={alert.content.alertContent}
        message={alert.content.message}
      />
    );
  }
}