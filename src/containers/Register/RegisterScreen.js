import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native';
import { Form, Input, TopBar } from 'coupon-components-native';
import styled from 'styled-components/native';
import { compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';

import { graphqlService } from '../../services';
import * as userActions from '../../actions/userActions';
import { SCENE_KEY_TABBAR } from '../../constants';

const Container = styled(View)`
  flex: 1;
  background-color: white;
`;

@connect(null, {
  logInAsync: userActions.loginAsync,
})
class RegisterScreen extends Component {
  static navigationOptions = {
    title: 'Crear Cuenta',
  }

  handleSubmit = async (form) => {
    const { logInAsync, signUp, client, navigation } = this.props;

    try {
      const signUpRes = await signUp(form);

      const { data: { signUp: signUpResponse } } = signUpRes;

      const signInRes = await client.query({
        query: graphqlService.query.signIn,
        variables: {
          email: form.email,
          password: form.password,
        }
      });

      const { data: { signIn: { token } } } = signInRes;
      const { logged } = await logInAsync(token);

      if(logged) navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      return;
    }
  }

  render() {
    const nextButtonTitle = 'Siguiente';
    const steps = [
      {
        id: 0,
        name: 'email',
        title: 'Escribe una dirección de email',
        description: 'Necesitas registar una dirección de correo electronico para acceder más tarde a tu cuenta',
        button: { title: nextButtonTitle },
        input: { placeholder: 'hunter@coupon.com', autoCapitalize: 'none' }
      },
      {
        id: 1,
        name: 'name',
        title: 'Cual es tu nombre?',
        description: 'Escribe el nombre por el cual puedas ser reconocido',
        button: { title: nextButtonTitle },
        input: { placeholder: 'QPon Hunter' }
      },
      {
        id: 2,
        name: 'password',
        title: 'Ingresa tu contraseña',
        description: 'Crea una contraseña segura para tu cuenta',
        button: { title: 'Crear Cuenta' },
        input: { placeholder: 'Contraseña super segura', secureTextEntry: true }
      },
    ];

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <Form
          steps={steps}
          onSubmit={this.handleSubmit}
        />
      </Container>
    )
  }
}

export default withApollo(compose(
  graphqlService.mutation.signUp,
)(RegisterScreen));