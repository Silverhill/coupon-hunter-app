import Scenes from './src/Scenes';
import Storybook from './storybook';
import { Constants  } from 'expo';

let currentEnv = Scenes;
if(Constants.manifest.env.REACT_NATIVE_ENV === 'storybook') {
  currentEnv = Storybook;
}

export default currentEnv;