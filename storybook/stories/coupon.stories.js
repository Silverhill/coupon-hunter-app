import React, { Component } from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { Coupon } from 'coupon-components-native';

import CenterView from './CenterView'

const story = storiesOf('Coupon', module)
story.addDecorator(getStory => <CenterView>{getStory()}</CenterView>)

story.add('Simple Coupon', () => (
  <Coupon
    imageSource={{ uri: "https://images.unsplash.com/photo-1481070414801-51fd732d7184?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=82203e4d57fc0d3bdd8ffc0f66d09763&auto=format&fit=crop&w=1525&q=80" }}
    avatarSource={{ uri: "https://images.unsplash.com/profile-1481466571593-63d100a3cbd1?dpr=2&auto=format&fit=crop&w=64&h=64&q=60&cs=tinysrgb&crop=faces&bg=fff" }}
    numberOfCoupons={ 50 }
    title="2x1 en Hamburguesas Mexicanas"
    subTitle="Carbon Burguer"
    date="11 de Marzo - 12 de Abril"
  />
))