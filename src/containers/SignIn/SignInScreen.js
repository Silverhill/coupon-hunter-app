import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native';
import { Form, Input } from 'coupon-components-native';
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

  handleSubmit = async (form) => {
    const { client: { query }, logInAsync, navigation } = this.props;

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
        navigation.navigate('App');
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

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <Form
          steps={this._renderFormSteps}
          onSubmit={this.handleSubmit}
        />
      </Container>
    )
  }
}

export default withApollo(SignInScreen);