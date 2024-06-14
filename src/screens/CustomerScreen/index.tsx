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

import styles from './styles.ts';
// import ProfileHanger from '../../components/ProfileHanger';
import {User} from '../../store/types/user.tsx';
import {useSelector} from 'react-redux';
import {changePage} from '../../store/actions/routing.tsx';
import ProfileHanger from '../../components/ProfileHanger';
import {Divider, Drawer, IconButton, Menu, Text} from 'react-native-paper';
import {colors} from '../../common/styles.tsx';
import {TouchableWithoutFeedback} from 'react-native';
import {removeUserData} from '../../store/actions/user.tsx';

interface Props {}

const InspectorScreen: React.FC<Props> = ({}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const user = useSelector((state: {user: User}) => state.user);

  //TODO: get usertype from backend when user logs in
  const [statisticVisible, setStatistic] = useState(false);
  const [guidanceVisible, setGuidance] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    dispatch(setReportInitialState());
  }, []);

  const startInspectionHandler = () => {
    changePage(SCREENS.NEW_REPORT);
  };
  const startCarDealerHandler = () => {
    changePage(SCREENS.DEALERSHIP);
  };
  const logOutHandler = () => {
    dispatch(removeUserData());
    changePage(SCREENS.LOGIN);
  };
  const showOrders = () => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: SCREENS.CUSTOMER_ORDERS,
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
      {/* <IconButton
        style={{position: 'absolute', top: 0, right: 0, zIndex: 1}}
        size={40}
        icon="menu"
        theme={{
          colors: {
            onSurfaceVariant: colors.orange,
          },
        }}
        onPress={() => setShowDrawer(!showDrawer)}
      /> */}
      <View style={styles.container}>
        <View style={styles.menu}>
          <Menu
            visible={showDrawer}
            onDismiss={() => {
              setShowDrawer(false);
            }}
            // style={{backgroundColor: colors.darkGrey}}
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
            <Menu.Item style={styles.menuItem}titleStyle={styles.text} onPress={() => {}} title={user.user_name} />
            <Menu.Item style={styles.menuItem}titleStyle={styles.text} onPress={() => {}} title={user.organization_type} />
            <Divider />
            <Menu.Item style={styles.menuItem}titleStyle={styles.text} onPress={logOutHandler} title={'logout'} />
          </Menu>
        </View>
        {/* <ProfileHanger user={user} /> */}
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
        {/* <MainButton
            title={t('startInspection')}
            icon="checklist"
            onPress={startInspectionHandler}
            style={styles.button}
          /> */}
        {/* )} */}
        {/* {userType === USER_TYPE.SELLER && ( */}
        <>
          <MainButton
            title={t('newOrder')}
            icon="search"
            onPress={startNewOrderHandler}
            style={styles.button}
          />
          {/* <MainButton
            title={t('carInspection')}
            icon="search"
            onPress={startCarDealerHandler}
            style={styles.button}
          /> */}
        </>
        {/* )} */}

        <MainButton
          title={t('orders')}
          icon="mail"
          onPress={() => showOrders()}
          style={styles.button}
        />
        <View style={styles.buttonContainer}>
          <SecondaryButton
            title={t('statistics')}
            onPress={() => {
              setStatistic(true);
            }}
            icon="menu"
            // style={styles.buttonContainer}
          />
          <SecondaryButton
            title={t('guidance')}
            onPress={() => {
              console.log('guidance');
              setGuidance(true);
            }}
            icon="help"
            // style={styles.buttonContainerOther}
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default InspectorScreen;
