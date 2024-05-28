import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Navigation} from 'react-native-navigation';

import {useAppDispatch} from '../../store/configureStore';
import {MainButton, SecondaryButton} from '../../components/index';
import {StatisticModal, GuidanceModal} from '../../modals/index';
import {SCREENS, USER_TYPE} from '../../common/constants';
import {setReportInitialState} from '../../store/actions/report';

import styles from './styles';
import ProfileHanger from '../../components/ProfileHanger';
import {User} from '../../store/types/user.tsx';
import {useSelector} from 'react-redux';
import {changePage} from '../../store/actions/routing.tsx';

interface Props {}

const InspectorScreen: React.FC<Props> = ({}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const user = useSelector((state: {user: User}) => state.user);
  const userType = user.organization_type;
  console.log('USER TYPE', userType);
  //TODO: get usertype from backend when user logs in
  const [statisticVisible, setStatistic] = useState(false);
  const [guidanceVisible, setGuidance] = useState(false);

  useEffect(() => {
    dispatch(setReportInitialState());
  }, []);

  const startInspectionHandler = () => {
    changePage(SCREENS.NEW_REPORT);
  };
  const startCarDealerHandler = () => {
    changePage(SCREENS.DEALERSHIP);
  };
  const showOrders = () => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: SCREENS.ALLORDERS,
              },
            },
          ],
        },
      },
    });
  };
  const startNewOrderHandler = () => {
    changePage(SCREENS.MY_NEW_ORDER);
  };
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* <ProfileHanger user={user} /> */}
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
        {/* {userType === USER_TYPE.INSPECTION && ( */}
        <MainButton
          title={t('startInspection')}
          icon="checklist"
          onPress={startInspectionHandler}
          style={styles.button}
        />
        {/* )} */}
        {/* {userType === USER_TYPE.SELLER && (
          <>
            <MainButton
              title={t('newOrder')}
              icon="search"
              onPress={startNewOrderHandler}
              style={styles.button}
            />
            <MainButton
              title={t('carInspection')}
              icon="search"
              onPress={startCarDealerHandler}
              style={styles.button}
            />
          </>
        )} */}

        <MainButton
          title={t('orders')}
          icon="mail"
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
