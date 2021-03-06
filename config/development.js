import { NativeModules  } from 'react-native';
import url from 'url'
const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);

module.exports = {
  graphqlEndpoint: `http://${hostname}:7001/graphql`,
  wsEndpoint: `ws://${hostname}:7001/subscriptions`,
};
