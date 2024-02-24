import React from 'react';
import BootSplash from 'react-native-bootsplash';
import {Navigation} from 'react-native-navigation';
import {PaperProvider} from 'react-native-paper';
import 'react-native-reanimated';

import LoginScreen from './src/screens/loginScreen';
import {SCREENS} from './src/common/constants';
import RegistrationNumberScreen from './src/screens/RegistrationNumberScreen';
import {colors} from './src/common/styles';
import './src/locales/index';

// Higher order component for injecting paper provider, and later redux
const componentHOC = (Component, ...props) => {
  return class App extends React.Component {
    render() {
      return (
        <PaperProvider>
          <Component
            {...{
              ...this.props,
              ...props,
            }}
          />
        </PaperProvider>
      );
    }
  };
};

Navigation.registerComponent(SCREENS.LOGIN, () => componentHOC(LoginScreen));
Navigation.registerComponent(SCREENS.REGISTRATION_NUMBER, () =>
  componentHOC(RegistrationNumberScreen),
);

const App = () => {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: {
        visible: false,
        animate: false,
        drawBehind: true,
        height: 0,
      },
      layout: {
        backgroundColor: colors.black,
      },
    });

    BootSplash.hide({fade: true});
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: SCREENS.REGISTRATION_NUMBER,
              },
            },
          ],
        },
      },
    });
  });
};

export default App;
