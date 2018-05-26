import { NativeModules  } from 'react-native';
import url from 'url'
const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);

module.exports = {
  graphqlEndpoint: 'https://coupon-backend.herokuapp.com/graphql',
  wsEndpoint: `ws://coupon-backend.herokuapp.com/subscriptions`,
};
