import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import MainButton from '../../components/mainButton';
import SecondaryButton from '../../components/secondaryButton';
import StatisticModal from '../../components/modals/statisticModal';
import GuidanceModal from '../../components/modals/guidanceModal';
import styles from './styles';

const InspectorScreen: React.FC = () => {
  const {t} = useTranslation();

  const [statisticVisible, setStatistic] = useState(false);
  const [guidanceVisible, setGuidance] = useState(false);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/trustcarlogo.png')}
          style={styles.imageStyles}
        />
        <StatisticModal
          onDismiss={() => setStatistic(false)}
          visible={statisticVisible}
        />
        <GuidanceModal
          onDismiss={() => setGuidance(false)}
          visible={guidanceVisible}
        />
        <MainButton
          title={t('Start inspection')}
          icon="checklist"
          //Just a placeholder for getting into the next screen
          onPress={() => showInspection()}
          style={styles.button}
        />
        <MainButton
          title={t('Orders')}
          icon="mail"
          //Just a placeholder for getting into the next screen
          onPress={() => showOrders()}
          style={styles.button}
        />
        <SecondaryButton
          title={t('Statistics')}
          onPress={() => setStatistic(true)}
          icon="menu"
          style={styles.buttonContainer}
        />
        <SecondaryButton
          title={t('Guidance')}
          onPress={() => setGuidance(true)}
          icon="help"
          style={styles.buttonContainerOther}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default InspectorScreen;
