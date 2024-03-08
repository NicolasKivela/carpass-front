import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainButton from '../../components/MainButton';
import SecondaryButton from '../../components/SecondaryButton';
import StatisticModal from '../../components/modals/statisticModal';
import GuidanceModal from '../../components/modals/guidanceModal';
import styles from './styles';

const InspectorScreen: React.FC = () => {
  const {t} = useTranslation();
  const [statisticVisible, setStatistic] = useState(false);
  const [guidanceVisible, setGuidance] = useState(false);

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
          title={t('startInspection')}
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
          onPress={() => showGuidance()}
          icon="help"
          style={styles.buttonContainerOther}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default InspectorScreen;
