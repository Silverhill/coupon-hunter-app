import { NativeModules  } from 'react-native';
import url from 'url'
const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);

module.exports = {
  graphqlEndpoint: `http://${hostname}:3000/graphql`,
};
