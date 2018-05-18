import React, { Component } from 'react';
import LottieView from 'lottie-react-native';
import { Animated, Easing } from 'react-native';
import animation from '../../assets/animations/checked_done_.json';


class RedeemedConfirmation extends Component {
  progress = new Animated.Value(0)

  componentDidMount = () => {
    Animated.timing(this.progress, {
      toValue: 1,
      duration: 1250,
      delay: 200,
      easing: Easing.linear,
    }).start();
  }

  render() {
    return (
      <LottieView
        source={animation}
        progress={this.progress}
      />
    );
  }
};

export default RedeemedConfirmation;