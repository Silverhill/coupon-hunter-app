import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native';
import { Form, Input, Loader, Typo } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';
import styled from 'styled-components/native';
import { ApolloConsumer, Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';

import { Queries } from '../../graphql';
import * as userActions from '../../actions/userActions';

const Container = styled(View)`
  flex: 1;
  background-color: white;
`;

@connect(store => ({
  auth: store.user.auth,
}), {
  logInAsync: userActions.loginAsync,
})
class LoginScreen extends Component {
  static navigationOptions = {
    headerTitle:  <Typo.TextBody bold><FormattedMessage id="commons.login" /></Typo.TextBody>,
    headerBackTitle: <Typo.TextBody bold><FormattedMessage id="commons.start" /></Typo.TextBody>,
  }

  state = {
    waitingSignIn: false,
  }

  showLoading = (showing = true) => {
    this.setState({ waitingSignIn: showing });
  }

  handleSubmit = async (form, client) => {
    const { logInAsync, navigation } = this.props;
    const { query } = client;

    this.showLoading();
    try {
      const res = await query({
        query: Queries.SIGN_IN,
        variables: { email: form.email, password: form.password },
      });

      const { data: { signIn } } = res;

      await logInAsync(signIn.token);
      const { screenProps, auth, navigation } = this.props;

      if(auth.logged) {
        await screenProps.changeLoginState(auth.logged, signIn.token);
      }

      // TODO: remove in production
      setTimeout(() => {
        this.showLoading(false);
        navigation.navigate('App');
      }, 2000);

    } catch (error) {
      console.log(error);
      this.showLoading(false);
    }

  }

  get _renderFormSteps() {
    const { intl } = this.props;
    const steps = [
      {
        id: 0,
        name: 'email',
        title: intl.formatMessage({id: 'loginScreen.form.fields.email.title'}),
        description: intl.formatMessage({id: 'loginScreen.form.fields.email.message'}),
        button: { title: intl.formatMessage({id: 'commons.next'}) },
        input: { placeholder: 'hunter@coupon.com', autoCapitalize: 'none' }
      },
      {
        id: 1,
        name: 'password',
        title: intl.formatMessage({ id: 'loginScreen.form.fields.password.title' }),
        description: intl.formatMessage({ id: 'loginScreen.form.fields.password.message' }),
        button: { title: intl.formatMessage({ id: 'commons.login' }), rightIcon: 'md-log-in', iconColor: Palette.white.css() },
        input: { placeholder: intl.formatMessage({ id: 'loginScreen.form.fields.password.placeholder' }), secureTextEntry: true }
      },
    ];

    return steps;
  }

  render() {
    const { waitingSignIn } = this.state;
    const { intl } = this.props;

    return (
      <ApolloConsumer>{client => {
        return (
          <Container>
            <StatusBar barStyle="dark-content"/>
            <Form
              steps={this._renderFormSteps}
              onSubmit={(form) => this.handleSubmit(form, client)}
            />
            <Loader visible={waitingSignIn} loadingText={intl.formatMessage({id: 'loginScreen.loading'})}/>
          </Container>
        );
      }}</ApolloConsumer>
    )
  }
}

export default injectIntl(LoginScreen);