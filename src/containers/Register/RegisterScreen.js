import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native';
import { Form, Input, TopBar, Loader, Typo } from 'coupon-components-native';
import styled from 'styled-components/native';
import { compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import { graphqlService } from '../../services';
import * as userActions from '../../actions/userActions';
import { SCENE_KEY_TABBAR } from '../../constants';

const Container = styled(View)`
  flex: 1;
  background-color: white;
`;

@connect(state =>({
  auth: state.user.auth,
}),{
  logInAsync: userActions.loginAsync,
})
class RegisterScreen extends Component {
  static navigationOptions = {
    headerTitle: <Typo.TextBody bold><FormattedMessage id="commons.signIn" /></Typo.TextBody>,
  }

  state = {
    waitingSignUp: false,
  }

  showLoading = (showing = true) => {
    this.setState({ waitingSignUp: showing });
  }

  handleSubmit = async (form) => {
    const { logInAsync, signUp, client, navigation, screenProps } = this.props;

    // Show loading until request it's ok
    this.showLoading();

    try {
      const signUpRes = await signUp(form);
      const { data: { signUp: signUpResponse } } = signUpRes;

      const signInRes = await client.query({
        query: graphqlService.query.signIn,
        variables: { email: form.email, password: form.password },
      });
      const { data: { signIn: { token } } } = signInRes;
      await logInAsync(token);

      const { logged } = this.props.auth;

      if(logged) {
        await screenProps.changeLoginState(logged, token);

        this.showLoading(false);
        navigation.navigate('App');
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  get _renderSteps(){
    const { intl } = this.props;
    const nextButtonTitle = intl.formatMessage({id: 'commons.next'});
    const steps = [
      {
        id: 0,
        name: 'email',
        title: intl.formatMessage({id: 'registerScreen.form.fields.email.title'}),
        description: intl.formatMessage({id: 'registerScreen.form.fields.email.message'}),
        button: { title: nextButtonTitle },
        input: { placeholder: 'hunter@coupon.com', autoCapitalize: 'none' }
      },
      {
        id: 1,
        name: 'name',
        title: intl.formatMessage({id: 'registerScreen.form.fields.name.title'}),
        description: intl.formatMessage({id: 'registerScreen.form.fields.name.message'}),
        button: { title: nextButtonTitle },
        input: { placeholder: 'QPon Hunter' }
      },
      {
        id: 2,
        name: 'password',
        title: intl.formatMessage({id: 'registerScreen.form.fields.password.title'}),
        description: intl.formatMessage({id: 'registerScreen.form.fields.password.message'}),
        button: { title: intl.formatMessage({id: 'commons.createAccount'}) },
        input: { placeholder: intl.formatMessage({id: 'registerScreen.form.fields.password.placeholder'}), secureTextEntry: true }
      },
    ];

    return steps;
  }

  render() {
    const { waitingSignUp } = this.state;

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <Form
          steps={this._renderSteps}
          onSubmit={this.handleSubmit}
        />

        <Loader visible={waitingSignUp} />
      </Container>
    )
  }
}

export default withApollo(compose(
  graphqlService.mutation.signUp,
)(injectIntl(RegisterScreen)));