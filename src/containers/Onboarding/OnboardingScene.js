import React, { Component } from 'react';
import { AsyncStorage, View, TouchableOpacity } from 'react-native';
import { Typo, Button } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { FormattedMessage } from 'react-intl';

const Page = ({ onDone, onSkip, backgroundColor }) => {
  return (
    <PageContainer bgColor={backgroundColor}>
      {onSkip && (
        <OnSkip onPress={onSkip}>
          <Typo.TextBody color={Palette.secondaryAccent.css()}><FormattedMessage id="commons.skip" /></Typo.TextBody>
        </OnSkip>
      )}

      {onDone && (
        <FormattedMessage id="commons.done">{(txt) => (
          <PhantomButton
            pill
            onPress={onDone}
            title={txt}
            backgroundColor={Palette.neutralLight.css()}
            textColor={Palette.dark.css()}
            shadow={false}
            borderColor={Palette.dark.css()}
            borderWidth={1}
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


class OnboardingScene extends Component {

  async componentWillMount() {
    const { navigation } = this.props;
    const followedOnboarding = await AsyncStorage.getItem('@followedOnboarding');
    if(followedOnboarding) { navigation.navigate('Auth'); }
  }

  onSkip = async () => {
    const { navigation } = this.props;

    await AsyncStorage.setItem('@followedOnboarding', 'true');
    navigation.navigate('Auth');
  }

  render() {
    return (
      <Container>
        <Swiper
          loop={false}
          dotColor={Palette.neutral.css()}
          activeDotColor={Palette.accent.css()}
          onIndexChanged={(index) => console.log(index)}
        >
          <Page onSkip={this.onSkip}/>
          <Page backgroundColor={Palette.dark} onSkip={this.onSkip}/>
          <Page onDone={this.onSkip}/>
        </Swiper>
      </Container>
    );
  }
};

const Container = styled(View)`
  flex: 1;
`;

export default OnboardingScene;