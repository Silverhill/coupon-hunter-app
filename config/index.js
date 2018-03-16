import _ from 'lodash';
import { Constants } from 'expo'
import development from './development';
import production from './production';

const REACT_NATIVE_ENV = Constants.manifest.env.REACT_NATIVE_ENV;

let currentEnv = production;
if(REACT_NATIVE_ENV === 'development') currentEnv = development;

const all = {
  env: REACT_NATIVE_ENV
};

export default _.merge(
  all,
  require('./shared'),
  currentEnv,
);
