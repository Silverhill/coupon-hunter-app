import React from 'react'
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, Typo } from 'coupon-components-native';
import styled from 'styled-components/native';
import { Palette } from 'coupon-components-native/styles';
import { FormattedMessage } from 'react-intl';
import { LinearGradient, BlurView } from 'expo';

const Page = ({ onDone, onSkip, backgroundColor, title, message, uri }) => {
  return (
    <PageContainer bgColor={backgroundColor}>
      <Body>
        <Card>
          <ImageCard source={{ uri }} />
        </Card>
      </Body>

      {onSkip && (
        <OnSkip onPress={onSkip}>
          <Typo.TextBody color={Palette.white.css()}><FormattedMessage id="commons.skip" /></Typo.TextBody>
        </OnSkip>
      )}

      <Footer colors={['#FF974D', '#FD3886']}>
        <Title inverted bold>{title}</Title>
        <Typo.TextBody inverted>{message}</Typo.TextBody>
      </Footer>
      {onDone && (
        <FormattedMessage id="commons.done">{(txt) => (
          <PhantomButton
            pill
            onPress={onDone}
            title={txt}
            backgroundColor={Palette.neutralLight.css()}
            textColor={Palette.dark.css()}
            shadow={false}
            // borderColor={Palette.dark.css()}
            // borderWidth={1}
          />
        )}
        </FormattedMessage>
      )}
    </PageContainer>
  )
}

const PageContainer = styled(View)`
  flex: 1;
  background-color: ${props => props.bgColor || Palette.neutralLight };
  position: relative;
  justify-content: center;
  align-items: center;
`;

const Body = styled(View)`
  width: 100%;
  height: 100%;
  background-color: #3a3d4c;
  align-items: center;
  justify-content: center;
`;

const BlurViewContainer = styled(BlurView)`
  height: 100%;
  width: 100%;
`;

const Footer = styled(LinearGradient)`
  height: 300;
  width: 100%;
  align-self: stretch;
  position: absolute;
  bottom: 0;
  padding-top: 30;
  padding-horizontal: 40;
  align-items: center;
  justify-content: flex-start;
`;

const Card = styled(View)`
  border-radius: 10;
  overflow: hidden;
  width: 80%;
  height: 60%;
  bottom: 80;
  box-shadow: 5px 1px 5px ${Palette.dark.alpha(0.2).css()};
`;

const ImageCard = styled(ImageBackground)`
  background-color: white;
  border-radius: 10;
  width: 100%;
  height: 100%;
`;


const Title = styled(Typo.Header)`
  margin-bottom: 10;
`;

const OnSkip = styled(TouchableOpacity)`
  position: absolute;
  top: 40;
  right: 30;
`;

const PhantomButton = styled(Button)`
  width: 200;
  position: absolute;
  bottom: 80;
`;


export default Page;