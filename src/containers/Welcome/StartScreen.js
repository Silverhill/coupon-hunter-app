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
import { Input, Button, Card, Typo, ButtonGradient, NavBar, Loader } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';
import { colors } from 'coupon-components-native/styles/palette';
import { FormattedMessage } from 'react-intl';
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

const ContainerButton = styled(Button)`
  margin-bottom: 10;
  width: 100%;
`;

@connect(null, {
  loginAsync: userActions.loginAsync,
})
class StartScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  navigateTo = (route) => {
    if(!route) return;

    const { navigation: { navigate } } = this.props;
    navigate(route);
  }

  goToRegisterScene = () => this.navigateTo('Register');
  goToSignInScene = () => this.navigateTo('Login');

  get accessButtons() {
    return (
      <Card marginBetweenChildrens centerItemsVertical centerItemsHorizontal height={200}>
        <FormattedMessage id="startScreen.fbButton">{(txt) => (
          <ContainerButton iconColor={Palette.white.css()} leftIcon="logo-facebook" pill backgroundColor={colors.facebook} title={txt} />
        )}</FormattedMessage>

        <FormattedMessage id="startScreen.twButton">{(txt) => (
          <ContainerButton iconColor={Palette.white.css()} leftIcon="logo-twitter" pill backgroundColor={colors.twitter} title={txt} />
        )}</FormattedMessage>

        <TouchableOpacity onPress={this.goToSignInScene}>
          <Link highlight><FormattedMessage id="startScreen.signInEmail" /></Link>
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
                    <Typo.TextBody>
                      <FormattedMessage id="startScreen.newAccount"/>
                    </Typo.TextBody>

                    <TouchableOpacity onPress={this.goToRegisterScene}>
                      <Typo.TextBody highlight bold><FormattedMessage id="commons.createAccount"/></Typo.TextBody>
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

export default compose(login)(StartScreen);