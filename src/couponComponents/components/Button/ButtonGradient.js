import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import { Palette } from '../../styles';
import Typo from '../Typography';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';


const StyledButton = styled(LinearGradient)`
  height: 45;
  border-radius: ${props => props.pill ? 50 : 3};
  justify-content: center;
  align-items: center;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.3;
  shadow-radius: 2;
  flex-direction: row;
`;

const LeftIcon = styled(Ionicons)`
  margin-right: 5;
  background-color: transparent;
`;

const RightIcon = styled(Ionicons)`
  margin-left: 5;
  background-color: transparent;
`;

const ButtonGradient = ({ title, onPress, style, disabled, leftIcon, rightIcon, iconColor, pill, ...rest }) => {
  const alphaChannel = 0.4;
  const button = (
    <StyledButton
      pill={pill}
      colors={disabled ? [Palette.gradientOne.alpha(alphaChannel).css(), Palette.gradientTwo.alpha(alphaChannel).css()] : ['#fffd35', '#ff007c']}
      start={[-1, 0]}
      end={[1, 0]}
      style={disabled ? style : null}
    >
      {leftIcon && <LeftIcon name={leftIcon} size={20} color={iconColor ? iconColor : Palette.dark.css()} />}
      <Typo.TextBody small inverted bolder>{title}</Typo.TextBody>
      {rightIcon && <RightIcon name={rightIcon} size={20} color={iconColor ? iconColor : Palette.dark.css()} />}
    </StyledButton>
  );

  if (disabled) return button;
  return (
    <TouchableOpacity onPress={onPress} style={style} { ...rest }>
      {button}
    </TouchableOpacity>
  );
};


ButtonGradient.defaultProps = {
  title: 'Button',
};

ButtonGradient.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  style: PropTypes.any,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
};

export default ButtonGradient;
