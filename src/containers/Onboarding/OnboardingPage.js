import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native';
import { Button, Typo } from 'coupon-components-native';
import styled from 'styled-components/native';
import { Palette } from 'coupon-components-native/styles';
import { FormattedMessage } from 'react-intl';
import { LinearGradient, BlurView } from 'expo';

const Page = ({ onDone, onSkip, backgroundColor, title, message, uri, source }) => {
  const currentSource = uri ? { uri } : source;

  return (
    <PageContainer bgColor={backgroundColor}>
      <Body>
        <ImageCard source={currentSource} resizeMode='contain'/>
      </Body>

      {onSkip && (
        <OnSkip onPress={onSkip}>
          <Typo.TextBody bold color={Palette.white.css()}><FormattedMessage id="commons.skip" /></Typo.TextBody>
        </OnSkip>
      )}

      <Footer colors={['#FF974D', '#FD3886']}>
        <Title center inverted bold>{title}</Title>
        <Typo.TextBody center inverted>{message}</Typo.TextBody>
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
  align-items: center;
  justify-content: center;
`;

const BlurViewContainer = styled(BlurView)`
  height: 100%;
  width: 100%;
`;

const Footer = styled(LinearGradient)`
  height: 40%;
  width: 100%;
  align-self: stretch;
  position: absolute;
  bottom: 0;
  padding-top: 30;
  padding-horizontal: 40;
  align-items: center;
  justify-content: flex-start;
`;


const ImageCard = styled(Image)`
  width: 90%;
  position: absolute;
  top: 10;
`;


const Title = styled(Typo.Header)`
  margin-bottom: 10;
`;

const OnSkip = styled(TouchableOpacity)`
  position: absolute;
  top: 40;
  right: 30;
  background-color: ${Palette.dark};
  padding: 5px 10px;
  border-radius: 15;
`;

const PhantomButton = styled(Button)`
  width: 200;
  position: absolute;
  bottom: 80;
`;


export default Page;