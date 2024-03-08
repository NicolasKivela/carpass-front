import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {
  MainButton,
  SecondaryButton,
  DropdownNotification,
} from '../../components/index';
import {LoginModal, SearchModal, TOSModal} from '../../modals/index';

import styles from './styles';

const LoginScreen: React.FC = () => {
  const {t} = useTranslation();

  const [loginVisible, setLogin] = useState(false);
  const [searchVisible, setSearch] = useState(false);
  const [TOSVisible, setTOS] = useState(false);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/trustcarlogo.png')}
          style={styles.imageStyles}
        />
        <LoginModal onDismiss={() => setLogin(false)} visible={loginVisible} />
        <SearchModal
          onDismiss={() => setSearch(false)}
          visible={searchVisible}
        />
        <TOSModal onDismiss={() => setTOS(false)} visible={TOSVisible} />
        <MainButton
          title={t('loginToApp')}
          icon="login"
          onPress={() => setLogin(true)}
          style={styles.button}
        />
        <MainButton
          title={t('search')}
          icon="search"
          onPress={() => setSearch(true)}
        />
        <View style={styles.buttonContainer}>
          <SecondaryButton
            title={t('tos')}
            onPress={() => setTOS(true)}
            icon="gpp-maybe"
          />
        </View>
      </View>
      <DropdownNotification />
    </SafeAreaProvider>
  );
};

export default LoginScreen;
