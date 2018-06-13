import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import { Animated, View } from 'react-native';
import styled from 'styled-components/native';
import { Typo } from 'coupon-components-native';
import loading from '../../assets/animations/il-loading.json';
import { Palette } from 'coupon-components-native/styles';

class Loading extends Component {
  state = {
    progress: new Animated.Value(0)
  }

  componentDidMount = () => {
    this.animation.play();
  }

  render() {
    const { size = 110, style, loadingText = '', textColor = Palette.accent.css() } = this.props
    return (
      <Container style={style}>
        <AnimationContainer size={size}>
          <LottieView
            ref={ref => this.animation = ref}
            source={loading}
            progress={this.state.progress}
            loop
            style={{
              width: size,
              height: size,
              position: 'absolute'
            }}
          />
          <TextLoading size={size} center bold small>{loadingText}</TextLoading>
        </AnimationContainer>
      </Container>
    );
  }
};

const Container = styled(View)`
  flex: 1
  align-items: center;
  justify-content: center;
  position: relative;
`;

const TextLoading = styled(Typo.TextBody)`
  position: absolute;
  top: ${props => props.size - 30};
  width: 150;
`;

const AnimationContainer = styled(View)`
  width: ${props => props.size};
  height: ${props => props.size};
  position: relative;
  align-items: center;
  justify-content: center;
`;

Loading.propTypes = {
  size: PropTypes.number,
  style: PropTypes.object,
  loadingText: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),
  textColor: PropTypes.string,
}

export default Loading;