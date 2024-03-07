import React from 'react';
import BootSplash from 'react-native-bootsplash';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import 'react-native-reanimated';

import LoginScreen from './src/screens/loginScreen';
import {PaperProvider} from 'react-native-paper';

import {SCREENS} from './src/common/constants';
import NewReportScreen from './src/screens/NewReportScreen';
import ReviewerScreen from './src/screens/reviewerScreen';
import SummaryScreen from './src/screens/summaryScreen';
import {colors} from './src/common/styles';
import store from './src/store/configureStore';
import './src/locales/index';
import InspectorScreen from './src/screens/inspectorScreen';
import MUIIcons from 'react-native-vector-icons/MaterialIcons';

// Higher order component for injecting paper provider, and later redux
const componentHOC = (Component, ...props) => {
  return class App extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <PaperProvider
            settings={{
              icon: props => <MUIIcons {...props} />,
            }}>
            <Component
              {...{
                ...this.props,
                ...props,
              }}
            />
          </PaperProvider>
        </Provider>
      );
    }
  };
};

Navigation.registerComponent(SCREENS.LOGIN, () => componentHOC(LoginScreen));
Navigation.registerComponent(SCREENS.NEW_REPORT_SCREEN, () =>
  componentHOC(NewReportScreen),
);
Navigation.registerComponent(SCREENS.REVIEWER, () =>
  componentHOC(ReviewerScreen),
);
Navigation.registerComponent(SCREENS.SUMMARY, () =>
  componentHOC(SummaryScreen),
);
Navigation.registerComponent(SCREENS.INSPECTOR, () =>
  componentHOC(InspectorScreen),
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
                name: SCREENS.INSPECTOR,
              },
            },
          ],
        },
      },
    });
  });
};

export default App;
