import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, NativeModules } from 'react-native';
import { AppLoading, DangerZone } from 'expo';
import { connect, Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';

import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { BatchHttpLink } from "apollo-link-batch-http";
import { ApolloProvider } from 'react-apollo';
import { toIdValue } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory';

import { getAuthenticationAsync, isAuthorized } from './services/auth';

// Redux
import store from './store';

// Routes
import StackNavigator from './routes';

// Assets
import assets from './assets';

// Configs
import config from '../config';
import messages from './messages';
import { intlService, assetsService } from './services';

import 'intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
addLocaleData([...en, ...es]);

const { Localization } = DangerZone;

export default class Scenes extends Component {
  state = {
    locale: null,
    appIsReady: false,
    authorized: false,
    token: null,
  }

  async componentWillMount() {
    const locale = await this.getCurrentLocale();

    try {
      const { authorized, token } = await isAuthorized();
      await this.preLoadingAssets();
      await this.setState({ locale, authorized, token, appIsReady: true });
    } catch (error) {
      console.log('SCENES ERROR', error);
    }

    const { authorized } = this.state;
  }

  async preLoadingAssets() {
    await assetsService.cacheImages(assets.images);
  }

  client = (token) => {
    // const httpLink = new HttpLink({ uri: config.graphqlEndpoint });
    const link = createUploadLink({ uri: config.graphqlEndpoint });

    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext(({headers = {} }) => {
        return {
          ...headers,
          headers: { authentication: token }
        };

      });

      return forward(operation);
    });

    const cache = new InMemoryCache({
      cacheRedirects: {
        Query: {
          allCampaigns: (_, { id }) => toIdValue(cache.config.dataIdFromObject({ __typename: 'PaginatedCampaigns', id })),
        },
      },
      dataIdFromObject: object => object.key || null,
    });

    const stateLink = withClientState({ cache })

    return new ApolloClient({
      // link: concat(authMiddleware, link),
      link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors)
            graphQLErrors.map(({ message, locations, path }) =>
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
              ),
            );
          if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        authMiddleware,
        stateLink,
        link,
      ]),
      cache,
    });
  }

  async getCurrentLocale() {
    const currentLocale = await Localization.getCurrentLocaleAsync();
    let locale;
    if (/^es/.test(currentLocale)) locale = 'es';
    else if (/^en/.test(currentLocale)) locale = 'en';
    else locale = 'es';

    return locale;
  }

  handleChangeLoginState = async (authorized = false, token) => {
    if(token && authorized) {
      await this.setState({ token, authorized });
    }
  }

  render() {
    const { locale, appIsReady, authorized, token } = this.state;

    if (!appIsReady && !authorized) {
      return <AppLoading />
    }

    const client = this.client(token);
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <IntlProvider
            locale={locale}
            messages={intlService.flattenMessages(messages[locale])}
            textComponent={Text}
          >
            <StackNavigator screenProps={{ changeLoginState: this.handleChangeLoginState }}/>
          </IntlProvider>
        </Provider>
      </ApolloProvider>
    );
  }
}