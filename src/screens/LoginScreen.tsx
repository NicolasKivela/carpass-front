import React from 'react';
import { ScrollView, Text, StyleSheet, View, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '../common/constanst';
import { colors } from '../common/styles';
import { Button, PaperProvider, Modal, Portal, Icon } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LoginModal from '../components/Modals/LoginModal';
import SearchModal from '../components/Modals/SearchModal';
import TOSModal from '../components/Modals/TOSModal';

const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
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
      <PaperProvider>
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            
            source={require('../assets/images/logo.png')}
            style={{ width: 300, height: 250, tintColor: colors.orange, position:'absolute', top: 30,resizeMode: 'contain' }}
          />
          <LoginModal onDismiss={hideLogin} visible={loginVisible} />
          <SearchModal onDismiss={hideSearch} visible={searchVisible} />
          <TOSModal onDismiss={hideTOS} visible={TOSVisible} />
          <Button
            mode="outlined"
            buttonColor={colors.black}
            onPress={() => showLogin()}
            style={styles.button}
            icon={props => (
              <MaterialIcons
                {...props}
                name="login"
                size={20}
                color={colors.orange}
              />
            )}>
            <Text style={styles.text}>{t('login')}</Text>
          </Button>
          <Button
            mode="outlined"
            buttonColor={colors.black}
            onPress={() => showSearch()}
            style={styles.button}
            icon={props => (
              <MaterialIcons
                {...props}
                name="search"
                size={20}
                color={colors.orange}
              />
            )}>
            <Text style={styles.text}>{t('search')}</Text>
          </Button>
          <Button
            mode="text"
            style={{  position:'absolute', bottom:200 }}
            onPress={() => showTOS()}
            icon={props => (
              <MaterialIcons
                {...props}
                name="gpp-maybe"
                size={20}
                color={colors.midGrey}
              />
            )}>
            <Text style={{ fontSize: 18, color: colors.midGrey }}>
              käyttöehdot
            </Text>
          </Button>
        </ScrollView>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    color: colors.orange,
    fontSize: 18,
  },
  button: {
    borderColor: colors.orange,
    borderWidth: 3,
  },
  header: {
    fontSize: 25,
    color: colors.orange,
    marginTop: 10,
  },
});

export default LoginScreen;
