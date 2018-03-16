import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

import { Palette, Typography } from '../../styles';

const TextBody = styled(Text)`
  font-weight: ${(props) => {
    if(props.bolder) return '900';
    return 'normal';
  }};
  background-color: transparent;
  color: ${props => {
    if (props.color) return props.color
    else if (props.inverted) return Palette.white
    else if (props.highlight) return Palette.accent
    else if (props.error) return Palette.error
    else if (props.secondary) return Palette.secondary
    else if (props.disabled) return Palette.neutral
    return Palette.text
  }};
  font-size: ${props => {
    if (props.small) return Typography.size.small
    else if (props.lead) return Typography.size.medium
    return Typography.size.regular
  }}
`

export default TextBody
