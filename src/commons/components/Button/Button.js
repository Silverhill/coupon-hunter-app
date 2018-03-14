import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import { Palette } from '../../styles';
import Typo from '../Typography';
import { Ionicons } from '@expo/vector-icons';

const StyledButton = styled(View)`
  height: 45;
  background-color: ${props => {
    if (props.disabled) return Palette.neutral;
    else if (props.backgroundColor) return props.backgroundColor;
    return Palette.accent;
  }};
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

const Button = ({ title, pill, backgroundColor, textColor, onPress, style, disabled, leftIcon, rightIcon, iconColor, ...rest }) => {
  const button = (
    <StyledButton backgroundColor={backgroundColor} pill={pill} disabled={disabled} style={disabled ? style : null}>
      {leftIcon && <LeftIcon name={leftIcon} size={20} color={iconColor ? iconColor : Palette.dark.css()} />}
      <Typo.TextBody small bolder inverted color={textColor}>{title}</Typo.TextBody>
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


Button.defaultProps = {
  title: 'Button',
};

Button.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  style: PropTypes.any,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
};

export default Button;
