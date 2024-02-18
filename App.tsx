import React, {useEffect} from 'react';
import BootSplash from 'react-native-bootsplash';

import LoginScreen from './src/screens/loginScreen';
import ReviewerScreen from './src/screens/reviewerScreen';

const App = () => {
  useEffect(() => {
    const init = async () => {
      await BootSplash.hide({fade: true});
    };

    init();
  }, []);

  return <ReviewerScreen />;
};

export default App;
