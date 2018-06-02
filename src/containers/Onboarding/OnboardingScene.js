import React, { Component } from 'react';
import { AsyncStorage, View, TouchableOpacity, StatusBar } from 'react-native';
import { Palette } from 'coupon-components-native/styles';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import OnboardingPage from './OnboardingPage';

// images
import fishing from '../../assets/images/fishing_coupons.png';
import upLevel from '../../assets/images/up_your_level.png';
import ecoAmbientalist from '../../assets/images/eco_ambientalist.png';
import gifter from '../../assets/images/gift.png';

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
          activeDot={<View style={{backgroundColor: 'white', width: 8, height: 15, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
          dotStyle={{ alignSelf: 'flex-end', 'backgroundColor': Palette.white.alpha(0.5).css() }}
        >
          <OnboardingPage
            onSkip={this.onSkip}
            backgroundColor={Palette.white.darken(0.2).css()}
            title='Bienvenido Hunter!'
            source={fishing}
            message='Ahora eres parte de nuestra red de coupon Hunters. Diviertete capturando y buscando coupones que aprecerán según tus preferencias '/>
          <OnboardingPage
            backgroundColor={Palette.white.darken(0.2).css()}
            onSkip={this.onSkip}
            source={upLevel}
            title='Sube tu nivel'
            message='Que buscar y reclamar cupones no sea aburrido, sube de nivel y gana puntos para mejorar como hunter, y ganar cupones'/>
          <OnboardingPage
            backgroundColor={Palette.white.darken(0.2).css()}
            onSkip={this.onSkip}
            source={ecoAmbientalist}
            title='Contribuye con el medio ambiente!'
            message='Una de nuestros objetivos principales es reducir el impacto negativo del medio ambiente. Ayudanos a evitar la palelería con coupones digitales'
            />

            <OnboardingPage
            backgroundColor={Palette.white.darken(0.2).css()}
            onDone={this.onSkip}
            source={gifter}
            title='Beneficiate con regalos!'
            message='Gana medallas que tienen recompensas únicas para tí, solo por cumplir con nuestros retos'/>
        </Swiper>
      </Container>
    );
  }
};

const Container = styled(View)`
  flex: 1;
`;

export default OnboardingScene;