import React from 'react';
import {View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainButton from '../../components/mainButton';
import SecondaryButton from '../../components/secondaryButton';
import LoginModal from '../../components/modals/loginmodal';
import SearchModal from '../../components/modals/searchModal';
import TOSModal from '../../components/modals/TOSmodal';
import DropdownNotification from '../../components/dropdownNotification';

import styles from './styles';

const LoginScreen: React.FC = () => {
  const {t} = useTranslation();
  const [loginVisible, setLogin] = React.useState(false);
  const [searchVisible, setSearch] = React.useState(false);
  const [TOSVisible, setTOS] = React.useState(false);

  const showLogin = () => setLogin(true);
  const hideLogin = () => setLogin(false);
  const showSearch = () => setSearch(true);
  const hideSearch = () => setSearch(false);
  const showTOS = () => setTOS(true);
  const hideTOS = () => setTOS(false);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/trustcarlogo.png')}
          style={styles.imageStyles}
        />
        <LoginModal onDismiss={hideLogin} visible={loginVisible} />
        <SearchModal onDismiss={hideSearch} visible={searchVisible} />
        <TOSModal onDismiss={hideTOS} visible={TOSVisible} />
        <MainButton
          title={t('loginToApp')}
          icon="login"
          onPress={() => showLogin()}
          style={styles.button}
        />
        <MainButton
          title={t('search')}
          icon="search"
          onPress={() => showSearch()}
        />
        <View style={styles.buttonContainer}>
          <SecondaryButton
            title={t('tos')}
            onPress={() => showTOS()}
            icon="gpp-maybe"
          />
        </View>
      </View>
      <DropdownNotification />
    </SafeAreaProvider>
  );
};

export default LoginScreen;
