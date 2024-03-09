import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Navigation} from 'react-native-navigation';

import {MainButton, SecondaryButton} from '../../components/index';
import {StatisticModal, GuidanceModal} from '../../modals/index';
import {SCREENS} from '../../common/constants';

import styles from './styles';

const InspectorScreen: React.FC = () => {
  const {t} = useTranslation();

  const [statisticVisible, setStatistic] = useState(false);
  const [guidanceVisible, setGuidance] = useState(false);

  const startInspectionHandler = () => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: SCREENS.NEW_REPORT,
              },
            },
          ],
        },
      },
    });
  };

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
          title={t('startInspection')}
          icon="checklist"
          onPress={startInspectionHandler}
          style={styles.button}
        />
        <MainButton
          title={t('orders')}
          icon="mail"
          //Just a placeholder for getting into the next screen
          onPress={() => showOrders()}
          style={styles.button}
        />
        <SecondaryButton
          title={t('statistics')}
          onPress={() => setStatistic(true)}
          icon="menu"
          style={styles.buttonContainer}
        />
        <SecondaryButton
          title={t('guidance')}
          onPress={() => setGuidance(true)}
          icon="help"
          style={styles.buttonContainerOther}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default InspectorScreen;
