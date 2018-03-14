import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import { Palette } from '../../styles';
import Typo from '../Typography';
import { Ionicons } from '@expo/vector-icons';

const StyledButton = styled(View)`
  height: 45;
  width: 45;
  border-radius: 22.5;
  justify-content: center;
  align-items: center;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.3;
  shadow-radius: 2;
  flex-direction: row;
  background-color: ${props => {
    if(props.disabled) return Palette.neutralLight;
    else if (props.backgroundColor) return props.backgroundColor;
    return Palette.accent
  }};
`;

const Icon = styled(Ionicons)`
  background-color: transparent;
`;

const RoundButton = ({ onPress, backgroundColor, style, disabled, icon, iconColor, color, ...rest }) => {
  const alphaChannel = 0.4;
  const button = (
    <StyledButton
      disabled={disabled}
      backgroundColor={backgroundColor}
      style={disabled ? style : null}
    >
      {icon && <Icon name={icon} size={20} color={iconColor ? iconColor : Palette.dark.css()} />}
    </StyledButton>
  );

  if (disabled) return button;
  return (
    <TouchableOpacity onPress={onPress} style={style} { ...rest }>
      {button}
    </TouchableOpacity>
  );
};


RoundButton.defaultProps = {
  title: 'Button',
};

RoundButton.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  style: PropTypes.any,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
};

export default RoundButton;
