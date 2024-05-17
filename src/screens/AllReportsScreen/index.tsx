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

const backButtonHandler = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: SCREENS.INSPECTOR,
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
            <Text style={styles.text}>{t('inspectionOrders')}</Text>
            <InformationBox
              title="ABC-123"
              state="Jonossa" //Currently no state in the backend
              inspectionType="Laaja kuntotarkastus"
              orderDate="1.2.2022"></InformationBox>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <DropdownNotification />
    </Gradient>
  );
};
export default AllReportsScreen;
