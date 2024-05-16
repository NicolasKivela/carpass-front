import React from 'react';
import BootSplash from 'react-native-bootsplash';
import MUIIcons from 'react-native-vector-icons/MaterialIcons';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {PaperProvider} from 'react-native-paper';
import 'react-native-reanimated';

import {SCREENS} from './src/common/constants';
import {colors} from './src/common/styles';
import {
  LoginScreen,
  NewReportScreen,
  ReviewerScreen,
  SummaryScreen,
  InspectorScreen,
  AllReportsScreen,
} from './src/screens/index';
import store from './src/store/configureStore';
import './src/locales/index';
import {NewOrderScreen} from "./src/screens";
import Toast from "react-native-toast-message";

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
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </PaperProvider>
        </Provider>
      );
    }
  };
};

Navigation.registerComponent(SCREENS.INSPECTOR, () =>
  componentHOC(InspectorScreen),
);
Navigation.registerComponent(SCREENS.DEALERSHIP, () =>
  componentHOC(NewReportScreen),
);
Navigation.registerComponent(SCREENS.LOGIN, () => componentHOC(LoginScreen));
Navigation.registerComponent(SCREENS.NEW_REPORT, () =>
  componentHOC(NewReportScreen),
);
Navigation.registerComponent(SCREENS.NEW_ORDER, () =>
    componentHOC(NewOrderScreen),
);
Navigation.registerComponent(SCREENS.REVIEWER, () =>
  componentHOC(ReviewerScreen),
);
Navigation.registerComponent(SCREENS.SUMMARY, () =>
  componentHOC(SummaryScreen),
);
Navigation.registerComponent(SCREENS.ALLORDERS, () =>
  componentHOC(AllReportsScreen),
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
                name: SCREENS.LOGIN,
              },
            },
          ],
        },
      },
    });
  });
};

export default App;
