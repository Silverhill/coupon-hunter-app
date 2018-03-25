import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

const StatusB = styled(View)`
  height: 20;
  background-color: white;
`;

const WhiteStatusBar = (props) => {
  return(
    <StatusB />
  );
};

export default WhiteStatusBar;