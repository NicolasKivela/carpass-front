/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/MaterialIcons';
import App from './App';
import {name as appName} from './app.json';
import './src/locales/index';

export default function Main() {
  return (
    <PaperProvider settings={{
      icon: props => <AwesomeIcon {...props} />,
    }}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
