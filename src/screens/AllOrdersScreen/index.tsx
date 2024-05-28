import React, {useEffect, useState, useRef, RefObject} from 'react';
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
import {SCREENS} from '../../common/constants';

import {styles} from './styles';
import {useAppDispatch, useAppSelector} from '../../store/configureStore';
import {fetchOrders} from '../../store/actions/orders';
import {Card} from 'react-native-paper';
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

const AllReportsScreen: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const order = useAppSelector(state => state.order.orders);
  console.log('I was here', order);


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
            {
              // TODO: Need to fetch the data from backend
            }
            <Text style={styles.text}>{t('createdOrders')}</Text>
            {/* <InformationBox
              title="ABC-123"
              state="Jonossa" //Currently no state in the backend
              inspectionType="Laaja kuntotarkastus"
              orderDate="1.2.2022"
            /> */}
            {order.map((item: Order, index: number) => {
              return (
                <Card key={index} style={{marginBottom: 10}}>
                  <Card.Content>
                    <Text>{item.registration_number}</Text>
                    <Text>{item.brand_and_model}</Text>
                    <Text>{item.report_type}</Text>
                    <Text>{item.order_status}</Text>
                  </Card.Content>
                </Card>
              );
            })}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <DropdownNotification />
    </Gradient>
  );
};
export default AllReportsScreen;
