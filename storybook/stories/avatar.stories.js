import React, { Component } from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { Avatar } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';

import CenterView from './CenterView'

const story = storiesOf('Avatar', module)
story.addDecorator(getStory => <CenterView>{getStory()}</CenterView>)

story.add('Simple Avatar', () => (
  <React.Fragment>
    <Avatar
      borderColor={Palette.primary}
      source={{ uri: "https://i.pinimg.com/originals/11/0f/00/110f0057f178a5f1357925aad67a9dd4.png" }}
    />
    <Avatar
      source={{ uri: "https://i.pinimg.com/originals/11/0f/00/110f0057f178a5f1357925aad67a9dd4.png" }}
    />
  </React.Fragment>
))