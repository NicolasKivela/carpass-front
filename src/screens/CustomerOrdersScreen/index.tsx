import React, {useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Navigation} from 'react-native-navigation';

import {
  LogoTopBar,
  Gradient,
  DropdownNotification,
  InformationBox,
} from '../../components/index';
import {useAppDispatch, useAppSelector} from '../../store/configureStore';
import {fetchOrders} from '../../store/actions/orders';
import {SCREENS} from '../../common/constants';

import {styles} from './styles';
import {Order} from '../../store/types/order';

const backButtonHandler = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: SCREENS.CUSTOMER_SCREEN,
            },
          },
        ],
      },
    },
  });

  return true;
};

const CustomerOrderScreen: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.order.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <Gradient>
      <SafeAreaView style={styles.container}>
        <LogoTopBar
          leftButton={{
            icon: 'arrow-back',
            action: backButtonHandler,
          }}
        />
        <KeyboardAvoidingView
          style={styles.innerContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Text style={styles.text}>{t('inspectionOrders')}</Text>
            {orders &&
              orders.length > 0 &&
              orders.map((item: Order) => {
                return (
                  <InformationBox
                    title={item.registration_number}
                    state={item.order_status}
                    inspectionType={item.report_type}
                    orderDate={item.created_at}
                    key={item.id}
                  />
                );
              })}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <DropdownNotification />
    </Gradient>
  );
};
export default CustomerOrderScreen;
