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
import {User} from '../../store/types/user.tsx';
import {useSelector} from 'react-redux';
import {changePage} from '../../store/actions/routing.tsx';
import {Divider, IconButton, Menu} from 'react-native-paper';
import { colors } from '../../common/styles.tsx';
import { removeUserData } from '../../store/actions/user.tsx';

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

  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    dispatch(setReportInitialState());
  }, []);

  const logOutHandler = () => {
    dispatch(removeUserData());
    changePage(SCREENS.LOGIN);
  };

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
                name: SCREENS.INSPECTION_ORDERS,
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
        <View style={{position: 'absolute', top: 0, right: 0}}>
          <Menu
            visible={showDrawer}
            onDismiss={() => {
              setShowDrawer(false);
            }}
            anchor={
              <IconButton
                size={40}
                icon="menu"
                theme={{
                  colors: {
                    onSurfaceVariant: colors.orange,
                  },
                }}
                onPress={() => setShowDrawer(true)}
              />
            }
            contentStyle={styles.menuContent}
            >
            <Menu.Item style={styles.menuItem} titleStyle={styles.text}onPress={() => {}} title={user.user_name} />
            <Menu.Item style={styles.menuItem} titleStyle={styles.text}onPress={() => {}} title={user.organization_type} />
            <Divider />
            <Menu.Item style={styles.menuItem} titleStyle={styles.text}onPress={logOutHandler} title={'logout'} />
          </Menu>
        </View>
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
          title={t('carInspection')}
          icon="mail"
          onPress={showOrders}
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
