import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Navigation} from 'react-native-navigation';

import {useAppDispatch} from '../../store/configureStore';
import {MainButton, SecondaryButton} from '../../components/index';
import {StatisticModal, GuidanceModal} from '../../modals/index';
import {SCREENS} from '../../common/constants';
import {setReportInitialState} from '../../store/actions/report';

import styles from './styles';

interface Props {
  userType: string; // Assuming userType is a string
}

const InspectorScreen: React.FC<Props> = ({userType}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  //TODO: get usertype from backend when user logs in
  userType = 'inspector';
  const [statisticVisible, setStatistic] = useState(false);
  const [guidanceVisible, setGuidance] = useState(false);

  useEffect(() => {
    dispatch(setReportInitialState());
  }, []);

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
  const startCarDealerHandler = () => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: SCREENS.DEALERSHIP,
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
          source={require('../../assets/images/carpasslogo.png')}
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
        {userType === 'inspector' && (
          <MainButton
            title={t('startInspection')}
            icon="checklist"
            onPress={startInspectionHandler}
            style={styles.button}
          />
        )}
        {userType === 'carDealer' && (
          <MainButton
            title={t('carInspection')}
            icon="search"
            onPress={startCarDealerHandler}
            style={styles.button}
          />
        )}
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
