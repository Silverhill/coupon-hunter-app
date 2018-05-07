import Scenes from './src/Scenes';
import Storybook from './storybook';
import config from './config';

let currentEnv = Scenes;
if(config.env === 'storybook') currentEnv = Storybook;

export default currentEnv;