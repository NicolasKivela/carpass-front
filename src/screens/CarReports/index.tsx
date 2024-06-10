import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  TextInput as TextInputProp,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Navigation} from 'react-native-navigation';

import {useAppDispatch, useAppSelector} from '../../store/configureStore';
import {
  fetchReportByReg,
  setReportByRegInitialState,
} from '../../store/actions/report';
import {LogoTopBar, Gradient} from '../../components/index';
import {NewReportTextInput} from '../NewReportScreen';
import {SCREENS} from '../../common/constants';
import styles from './styles';

interface carReportProps {
  register_Number?: string;
}

const CarReports: React.FC<carReportProps> = ({register_Number}) => {
  console.log(register_Number);
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const reportsData = useAppSelector(state => state.reportbyreg.reports);

  const registrationNumberRef = useRef<any>(null);
  const [registrationNumberIcon, setRegistrationNumberIcon] =
    useState('photo-camera');
  const [regNumber, setRegNumber] = useState(register_Number || '');

  useEffect(() => {
    const listener = Navigation.events().registerComponentDidAppearListener(
      ({componentId, componentName, passProps}) => {
        console.log(componentName);
        console.log(passProps);
      },
    );
    return () => {
      listener.remove();
    };
  }, []);

  useEffect(() => {
    setRegNumber(register_Number || '');
    const delay = setTimeout(() => {
      dispatch(fetchReportByReg(regNumber));
    }, 1000);
    return () => {
      clearTimeout(delay);
    };
  }, []);

  const handleOpenPress = (
    registerNumber: string,
    id: number,
    date: string,
  ) => {
    setRegNumber(registerNumber);
    console.log('regNUmber in carreports', regNumber);
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: SCREENS.VIEW_REPORT_REG,
                passProps: {
                  register_number: regNumber,
                  report_id: id,
                  formatted_date: date,
                },
              },
            },
          ],
        },
      },
    });
  };
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
  };
  const dateFormatter = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    return day + '.' + month + '.' + year;
  };
  const updateRegisterNumber = (value: string) => {
    setRegNumber(value);
  };
  const inputOnSubmitHandler = (item: string) => {
    console.log(regNumber);
    dispatch(fetchReportByReg(regNumber));
    if (item !== 'odometerReading') {
      const ref = registrationNumberRef;
      ref?.current && ref.current.focus();
    }
  };
  return (
    <Gradient>
      <SafeAreaView style={styles.containerSafe}>
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
          <View style={styles.container}>
            <NewReportTextInput
              innerRef={registrationNumberRef}
              label={'registrationNumber'}
              disabled={false}
              value={regNumber}
              setOnChange={updateRegisterNumber}
              onSubmitEditing={() => inputOnSubmitHandler('registrationNumber')}
              icon={registrationNumberIcon}
              setRegistrationNumberIcon={setRegistrationNumberIcon}
            />
            <Text style={styles.header}>{t('carInspectionHistory')}</Text>
            {reportsData && reportsData.length > 0 ? (
              reportsData.map((report: any, index: number) => (
                <View key={index} style={styles.innerContainer2}>
                  <View style={styles.leftContainer}>
                    <Text style={styles.textstyle}>
                      {dateFormatter(report.updated_at)}
                    </Text>
                  </View>
                  <View style={styles.rigthContainer}>
                    <View
                      style={[
                        styles.circle,
                        report.warnings > 0 ? styles.yellowBackground : null,
                      ]}>
                      <Text>
                        {report.warnings > 0 ? report.warnings : null}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.circle,
                        report.disqualifications > 0
                          ? styles.redBackground
                          : null,
                      ]}>
                      <Text>
                        {report.disqualifications > 0
                          ? report.disqualifications
                          : null}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        handleOpenPress(
                          report.registration_number,
                          report.id,
                          dateFormatter(report.updated_at),
                        );
                      }}>
                      <Text style={styles.textbutton}>
                        {t('open').toLocaleUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.innerContainer2}>
                <View style={styles.leftContainer}>
                  <Text style={styles.textstyle}>
                    {t('noReviews').toLocaleUpperCase()}
                  </Text>
                </View>
                <View style={styles.rigthContainer}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.textbutton}>
                      {t('order').toLocaleUpperCase()}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <Text style={styles.header}>{t('summary')}</Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Gradient>
  );
};

export default CarReports;
