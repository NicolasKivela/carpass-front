import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainButton from '../../components/mainButton';
import SecondaryButton from '../../components/secondaryButton';
import styles from './styles';

const KuntotarkastajaScreen: React.FC = () => {
  const { t } = useTranslation();


  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/trustcarlogo.png')}
          style={styles.imageStyles}
        />
        <MainButton
          title={t('startInspection')}
          icon="login"
          onPress={() => showInspection()}
          style={styles.button}
        />
        <MainButton
          title={t('Orders')}
          icon="search"
          onPress={() => showOrders()}
        />
        <View style={styles.buttonContainer}>
          <SecondaryButton title={t('tos')} onPress={() => showTOS()} icon="gpp-maybe" />
        </View>
      </View>
    </SafeAreaProvider>
  );
};


export default KuntotarkastajaScreen;
