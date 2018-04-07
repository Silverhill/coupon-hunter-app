import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage,
  ImageBackground,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import { LinearGradient } from 'expo';
import { Input, Button, Card, Typo, ButtonGradient, NavBar } from 'coupon-components-native';

import { Palette } from 'coupon-components-native/styles';
import { colors } from 'coupon-components-native/styles/palette';
import LoginForm from './LoginForm';
import { login } from '../../services/graphql';
import * as userActions from '../../actions/userActions';
import * as CONSTANTS from '../../constants';

// Assets
import cplogo from '../../assets/images/coupon_hunter_logo.png';

const Container = styled(View)`
  flex: 1;
`;

const ContainerImage = styled(ImageBackground)`
  flex: 1;
`;

const Gradient = styled(LinearGradient)`
  flex: 1;
  align-items: center;
`

const ContainerCards = styled(View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-horizontal: 10;
  padding-vertical: 10;
`;

const InlineText = styled(View)`
  flex-flow: row nowrap;
`;

const Link = styled(Typo.TextBody)`
  margin-vertical: 10;
`

const NewAccountCard = styled(View)`
  height: 70;
  margin-top: 20;
`;

const Logo = styled(Image)`
  margin-top: 70;
`;

@connect(null, {
  loginAsync: userActions.loginAsync,
})
class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
    title: 'Inicio',
  }

  navigateTo = (route) => {
    if(!route) return;

    const { navigation: { navigate } } = this.props;
    navigate(route);
  }

  goToRegisterScene = () => this.navigateTo('Register');
  goToSignInScene = () => this.navigateTo('SignIn');

  get accessButtons() {
    return (
      <Card marginBetweenChildrens centerItemsVertical centerItemsHorizontal height={200}>
        <Button iconColor={Palette.white.css()} leftIcon="logo-facebook" pill backgroundColor={colors.facebook} title="Connectate con Facebook" />
        <Button iconColor={Palette.white.css()} leftIcon="logo-twitter" pill backgroundColor={colors.twitter} title="Connectate con Twitter" />

        <TouchableOpacity onPress={this.goToSignInScene}>
          <Link highlight>Ingresa con tu email</Link>
        </TouchableOpacity>
      </Card>
    )
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content"/>
        <ContainerImage source={{ uri: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c75e0437e819afdceeb3050a6bcdd71b&auto=format&fit=crop&w=953&q=80" }}>
          <Gradient colors={[Palette.dark.alpha(0.7).css(), 'transparent']}>
            <Logo source={cplogo} />

            <ContainerCards>
              {this.accessButtons}

              <NewAccountCard>
                <Card centerItemsVertical centerItemsHorizontal>
                  <InlineText>
                    <Typo.TextBody>Nuevo en Cupón?</Typo.TextBody>

                    <TouchableOpacity onPress={this.goToRegisterScene}>
                      <Typo.TextBody highlight bold>Crear una cuenta</Typo.TextBody>
                    </TouchableOpacity>
                  </InlineText>
                </Card>
              </NewAccountCard>
            </ContainerCards>

          </Gradient>
        </ContainerImage>
      </Container>
    )
  }
}

export default compose(login)(LoginScreen);