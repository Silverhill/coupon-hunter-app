import React from 'react';
import { View, StatusBar } from 'react-native';
import styled from 'styled-components/native';

const StatusB = styled(View)`
  height: 20;
  background-color: white;
`;

const WhiteStatusBar = (props) => {
  return(
    <React.Fragment>
      <StatusBar barStyle="dark-content"/>
      <StatusB />
    </React.Fragment>
  );
};

export default WhiteStatusBar;