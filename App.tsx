import React, {useEffect} from 'react';
import BootSplash from 'react-native-bootsplash';

import LoginScreen from './src/screens/LoginScreen';

const App = () => {
  useEffect(() => {
    const init = async () => {
      await BootSplash.hide({fade: true});
    };

    init();
  }, []);

  return <LoginScreen />;
};

export default App;
