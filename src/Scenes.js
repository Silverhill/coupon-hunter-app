import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, NativeModules } from 'react-native';
import { Util, AppLoading } from 'expo';
import { connect, Provider } from 'react-redux';
import { Router } from 'react-native-router-flux';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { getAuthenticationAsync } from './services/auth';

// Redux
import store from './store';
const RouterWithRedux = connect()(Router);

// Routes
import AllRoutes from './routes';

// Configs
import config from '../config';

export default class Scenes extends Component {
  state = {
    locale: null,
    appIsReady: false,
    authentication: null,
  }

  async componentWillMount() {
    const locale = await this.getCurrentLocale();
    const authentication = await getAuthenticationAsync();

    this.setState({ locale, appIsReady: true, authentication });
  }

  client = () => {
    const { authentication } = this.state;

    const httpLink = new HttpLink({ uri: config.graphqlEndpoint });
    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext(({headers = {} }) => {
        return {
          headers: {
            authentication,
            ...headers
          }
        }

      });

      return forward(operation);
    });

    return new ApolloClient({
      link: concat(authMiddleware, httpLink),
      cache: new InMemoryCache(),
    });
  }

  async getCurrentLocale() {
    const currentLocale = await Util.getCurrentLocaleAsync();
    let locale;
    if (/^es/.test(currentLocale)) locale = 'es';
    else if (/^en/.test(currentLocale)) locale = 'en';
    else locale = 'es';

    return locale;
  }

  render() {
    const { locale, appIsReady } = this.state;

    if (appIsReady) {
      return (
        <ApolloProvider client={this.client()}>
          <Provider store={store}>
            <RouterWithRedux scenes={AllRoutes} />
          </Provider>
        </ApolloProvider>
      );
    }

    return <AppLoading/>;
  }
}