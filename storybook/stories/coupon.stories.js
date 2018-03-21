import React, { Component } from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { Coupon } from 'coupon-components-native';

import CenterView from './CenterView'

const story = storiesOf('Coupon', module)
story.addDecorator(getStory => <CenterView>{getStory()}</CenterView>)

story.add('Simple Coupon', () => (
  <Coupon />
))