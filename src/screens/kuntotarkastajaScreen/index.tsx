import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainButton from '../../components/mainButton';
import SecondaryButton from '../../components/secondaryButton';
import StatisticModal from '../../components/modals/statisticModal';
import GuidanceModal from '../../components/modals/guidanceModal';
import styles from './styles';

const KuntotarkastajaScreen: React.FC = () => {
  const { t } = useTranslation();
  const [statisticVisible, setStatistic] = React.useState(false);
  const [guidanceVisible, setGuidance] = React.useState(false);

  const showStatistic = () => setStatistic(true);
  const hideStatistic = () => setStatistic(false);
  const showGuidance = () => setStatistic(true);
  const hideGuidance = () => setStatistic(false);


  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/trustcarlogo.png')}
          style={styles.imageStyles}
        />
        <StatisticModal onDismiss={hideStatistic} visible={statisticVisible} />
        <GuidanceModal onDismiss={hideGuidance} visible={guidanceVisible} />
        <MainButton
          title={t('Start inspection')}
          icon="checklist"
          onPress={() => showInspection()}
          style={styles.button}
        />
        <MainButton
          title={t('Orders')}
          icon="mail"
          onPress={() => showOrders()}
        />
          <SecondaryButton
          title={t('Statistics')}
          onPress={() => showStatistic()}
          icon="menu"
          style={styles.buttonContainer}
        />
          <SecondaryButton
          title={t('Guidance')}
          onPress={() => showGuidance()}
          icon="help"
          style={styles.buttonContainerOther}
        />
      </View>
    </SafeAreaProvider>
  );
};


export default KuntotarkastajaScreen;
