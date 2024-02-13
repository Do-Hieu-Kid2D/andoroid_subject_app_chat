import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

// import App from './App';
// import {Login, MainScreen, Test, Register} from './screens/index';
import UITab from './navigation/UITab';
import App from './navigation/App';

AppRegistry.registerComponent(appName, () => App);
