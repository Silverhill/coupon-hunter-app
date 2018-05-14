import React, { Component } from 'react'
import { View } from 'react-native';
import { Typo } from 'coupon-components-native';
import MyCoupons from '../../components/User/MyCoupons';

export default class ExploreScene extends Component {
  render() {
    return (
      <View>
        <Typo.Title>Explore</Typo.Title>
        <MyCoupons />
      </View>
    )
  }
}
