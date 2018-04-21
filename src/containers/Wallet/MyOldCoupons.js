import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Palette } from 'coupon-components-native/styles';
import { Typo } from 'coupon-components-native';

const Container = styled(ScrollView)`
  flex: 1;
  background-color: ${Palette.secondaryAccent};
`;

export default class MyOldCoupons extends Component {
  render(){
    return (
      <Container contentContainerStyle={{ alignItems: "center","justifyContent": "center" }}>
      </Container>
    )
  }
}