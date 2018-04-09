import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native';
import { Form, Input, Loader } from 'coupon-components-native';
import styled from 'styled-components/native';
import { withApollo  } from 'react-apollo';
import { connect } from 'react-redux';

import { graphqlService } from '../../services';
import * as userActions from '../../actions/userActions';
import { SCENE_KEY_TABBAR } from '../../constants';

const Container = styled(View)`
  flex: 1;
  background-color: white;
`;

@connect(state => ({
  auth: state.user.auth,
}), {
  logInAsync: userActions.loginAsync,
})
class SignInScreen extends Component {
  static navigationOptions = {
    title: 'Ingreso',
  }

  state = {
    waitingSignIn: false,
  }

  showLoading = (showing = true) => {
    this.setState({ waitingSignIn: showing });
  }

  handleSubmit = async (form) => {
    const { client: { query }, logInAsync, navigation } = this.props;
    this.showLoading();

    try {
      const res = await query({
        query: graphqlService.query.signIn,
        variables: { email: form.email, password: form.password },
      });

      const { data: { signIn } } = res;

      await logInAsync(signIn.token);
      const { screenProps, auth, navigation } = this.props;

      if(auth.logged) {
        await screenProps.changeLoginState(auth.logged, signIn.token);

        setTimeout(() => {
          this.showLoading(false);
          navigation.navigate('App');
        }, 4000)
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  get _renderFormSteps() {
    const steps = [
      {
        id: 0,
        name: 'email',
        title: 'Escribe la dirección de email',
        description: 'Para acceder necesitas tu dirrección de email con la que te registraste',
        button: { title: 'Siguiente' },
        input: { placeholder: 'hunter@coupon.com', autoCapitalize: 'none' }
      },
      {
        id: 1,
        name: 'password',
        title: 'Ingresa tu contraseña',
        description: 'Inicia sesión con tu contraseña de Coupon',
        button: { title: 'Ingresar' },
        input: { placeholder: 'Contraseña super segura', secureTextEntry: true }
      },
    ];

    return steps;
  }

  render() {
    const { client } = this.props;
    const { waitingSignIn } = this.state;

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <Form
          steps={this._renderFormSteps}
          onSubmit={this.handleSubmit}
        />

        <Loader visible={waitingSignIn} />
      </Container>
    )
  }
}

export default withApollo(SignInScreen);