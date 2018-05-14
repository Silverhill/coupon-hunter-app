
import React, { Component } from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { PhotoPicker, Typo } from 'coupon-components-native';

import CenterView from './CenterView'

const story = storiesOf('Photo Picker', module)
story.addDecorator(getStory => <CenterView>{getStory()}</CenterView>)

story.add('Basic Picker', () => (
  <View style={{flex: 1, alignSelf: 'stretch'}}>
    <PhotoPicker />
  </View>
))
