import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native';
import { Form, Input, TopBar, Loader, Typo } from 'coupon-components-native';
import styled from 'styled-components/native';
import { withApollo, Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Queries, Mutations } from '../../graphql';
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

  handleSubmit = async (form, signUp) => {
    const { logInAsync, client, navigation, screenProps } = this.props;

    // Show loading until request it's ok
    this.showLoading();
    try {
      const signUpRes = await signUp({
        variables: {
          ...form
        }
      });

      const signInRes = await client.query({
        query: Queries.SIGN_IN,
        variables: { email: form.email, password: form.password },
      });
      const { data: { signIn: { token } } } = signInRes;
      await logInAsync(token);

      const { logged } = this.props.auth;

      if(logged) {
        await screenProps.changeLoginState(logged, token);
        navigation.navigate('App');
      }
    } catch (error) {
      console.log(error);
    }

    this.showLoading(false);
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
        <Mutation mutation={Mutations.SIGN_UP}>{(signUp, { data }) => {
          return (
            <Form
              steps={this._renderSteps}
              onSubmit={(form) => this.handleSubmit(form, signUp)}
            />
          );
        }}</Mutation>

        <Loader visible={waitingSignUp} />
      </Container>
    )
  }
}

export default withApollo(injectIntl(RegisterScreen));