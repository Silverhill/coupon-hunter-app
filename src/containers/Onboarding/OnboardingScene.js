import React, { Component } from 'react';
import { AsyncStorage, View, TouchableOpacity, StatusBar } from 'react-native';
import { Palette } from 'coupon-components-native/styles';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import OnboardingPage from './OnboardingPage';

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
        <StatusBar barStyle='light-content' />
        <Swiper
          loop={false}
          activeDot={<View style={{backgroundColor: 'white', width: 8, height: 15, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
          dotStyle={{ alignSelf: 'flex-end', 'backgroundColor': Palette.white.alpha(0.5).css() }}
        >
          <OnboardingPage
            onSkip={this.onSkip}
            title='Bienvenido Hunter!'
            uri='https://images.unsplash.com/photo-1522204605090-c9a2ae146cb3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0147eeb73ae17cd12d9f3d9523ba01a6&auto=format&fit=crop&w=2091&q=80'
            message='Diviertete capturando coupones'/>
          <OnboardingPage
            backgroundColor={Palette.dark}
            onSkip={this.onSkip}
            uri='https://images.unsplash.com/photo-1507412306066-2977c0e91a68?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aba7f52648017e9500343100cea8baee&auto=format&fit=crop&w=2000&q=80'
            title='Bienvenido Hunter!'
            message='Diviertete capturando coupones'/>
          <OnboardingPage
            title='Bienvenido Hunter!'
            uri='https://images.unsplash.com/photo-1493807742375-fbc46d996e8f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6f0038573a81b1169576b6674a3ce202&auto=format&fit=crop&w=1076&q=80'
            message='Diviertete capturando coupones'
            onDone={this.onSkip}/>
        </Swiper>
      </Container>
    );
  }
};

const Container = styled(View)`
  flex: 1;
`;

export default OnboardingScene;