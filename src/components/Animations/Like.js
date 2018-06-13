import React, { Component } from 'react';
import LottieView from 'lottie-react-native';
import { Animated, Easing, View } from 'react-native';
import styled from 'styled-components/native';
import animation from '../../assets/animations/task_complete.json';

class Like extends Component {
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
    const { size = 100, style } = this.props
    return (
      <Container style={style}>
        <LottieView
          source={animation}
          progress={this.progress}
          style={{
            width: size,
            height: size,
            transform: [{ scale: 2 }],
            position: 'absolute'
          }}
        />
      </Container>
    );
  }
};

const Container = styled(View)`
  flex: 1
  align-items: center;
  justify-content: center;
`;

export default Like;