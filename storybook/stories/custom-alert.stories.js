import React, { Component } from 'react';
import { View, Button } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { CustomAlert, Typo } from 'coupon-components-native';

import CenterView from './CenterView'

const story = storiesOf('Alerts', module)
story.addDecorator(getStory => <CenterView>{getStory()}</CenterView>)

class CustomAlertClass extends Component {
  state = {
    visible: false,
  }

  visibleModal = (visible = true) => {
    this.setState({ visible });
  }

  render() {
    const alert = new CustomAlert;
    const actionsAlert = [
      {
        text: 'Ok, Sure!',
      },
      {
        text: 'Close',
        onPress: () => this.visibleModal(false),
      },
      {
        text: 'No, thanks',
        type: 'cancel',
        onPress: () => console.log('No, thanks'),
      },
    ];

    const AlertContent = (
      <View>
        <Typo.Header>Hola!  akdhfkadjf akfdjks f Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem quibusdam provident sed, dicta aliquam, ipsa qui possimus assumenda placeat voluptate doloremque sunt veritatis. Repudiandae eaque rem, non in nesciunt iusto.</Typo.Header>
      </View>
    );

    return (
      <View>
        <Button title='Show Alert' onPress={() => this.setState({ visible: !this.state.visible })} />
        <CustomAlert
          open={this.state.visible}
          actions={actionsAlert}
          alertContent={AlertContent}
        />
      </View>
    );
  }
}

story.add('Custom Alert', () => (
  <CustomAlertClass />
))