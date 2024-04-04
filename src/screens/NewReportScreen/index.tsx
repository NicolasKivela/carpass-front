import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  BackHandler,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Button, TextInput} from 'react-native-paper';
import {Navigation} from 'react-native-navigation';

import {
  LogoTopBar,
  Gradient,
  FrameProcessorCamera,
  DropdownNotification,
} from '../../components/index';
import {colors} from '../../common/styles';
import {SCREENS} from '../../common/constants';
import {useAppDispatch} from '../../store/configureStore';
import {setCarData} from '../../store/actions/report';

import {styles} from './styles';

const NewReportScreen: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const [readyToProceed, setReadyToProceed] = useState(false);
  const [registrationNumberIcon, setRegistrationNumberIcon] =
    useState('photo-camera');
  const [registerNumber, setRegisterNumber] = useState<{
    value: string;
    tempValues: string[];
  }>({
    value: '',
    tempValues: [],
  });
  const [otherData, setOtherData] = useState({
    vehicleIdentificationNumber: '',
    brandAndModel: '',
    modelYear: null,
    odometerReading: null,
  });

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, []);

  useEffect(() => {
    if (
      registerNumber.value &&
      otherData.vehicleIdentificationNumber &&
      otherData.brandAndModel &&
      otherData.modelYear &&
      otherData.odometerReading
    ) {
      setReadyToProceed(true);
    } else if (readyToProceed) {
      setReadyToProceed(false);
    }
  }, [otherData, registerNumber]);

  const backButtonHandler = () => {
    if (registerNumber.value) {
      setRegisterNumber({value: '', tempValues: []});
      setOtherData({
        vehicleIdentificationNumber: '',
        brandAndModel: '',
        modelYear: null,
        odometerReading: null,
      });
    } else {
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
    }
    return true;
  };

  const startInspectionHandler = () => {
    dispatch(
      setCarData({
        brand_and_model: otherData.brandAndModel,
        odometer_reading: otherData.odometerReading,
        production_number: otherData.vehicleIdentificationNumber,
        registration_number: registerNumber.value,
        engine_type: 'petrol', //TODO: fix, when type input is added?
      }),
    );
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: SCREENS.REVIEWER,
              },
            },
          ],
        },
      },
    });
  };

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
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          keyboardVerticalOffset={0}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Text style={styles.text}>{t('identificationInfo')}</Text>
            <NewReportTextInput
              label={'registrationNumber'}
              value={registerNumber.value}
              setOnChange={(value: string) => {
                setRegisterNumber({...registerNumber, value});
              }}
              icon={registrationNumberIcon}
              setRegistrationNumberIcon={setRegistrationNumberIcon}
            />
            {registerNumber.value ? (
              <View style={styles.container}>
                {Object.keys(otherData).map(item => {
                  return (
                    <NewReportTextInput
                      key={item}
                      label={item}
                      value={otherData[item]}
                      setOnChange={(value: string) => {
                        setOtherData({...otherData, [item]: value});
                      }}
                      icon={'keyboard'}
                    />
                  );
                })}
                <View style={styles.footerContainer}>
                  <Button
                    disabled={!readyToProceed}
                    onPress={startInspectionHandler}
                    textColor={colors.orange}
                    style={styles.footerButton}>
                    <Text
                      style={
                        readyToProceed
                          ? styles.footerTextDone
                          : styles.footerText
                      }>
                      {t('startInspection')}
                    </Text>
                  </Button>
                </View>
              </View>
            ) : (
              <FrameProcessorCamera
                registerNumber={registerNumber}
                setRegisterNumber={setRegisterNumber}
              />
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <DropdownNotification />
    </Gradient>
  );
};

interface NewReportTextInputProps {
  label: string;
  value: string;
  setOnChange: (value: string) => void;
  icon: string;
  setRegistrationNumberIcon?: React.Dispatch<React.SetStateAction<string>>;
}

const NewReportTextInput: React.FC<NewReportTextInputProps> = ({
  label,
  value,
  setOnChange,
  icon,
  setRegistrationNumberIcon,
}) => {
  const {t} = useTranslation();

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (
      isActive &&
      label === 'registrationNumber' &&
      setRegistrationNumberIcon
    ) {
      setRegistrationNumberIcon('keyboard');
    } else if (
      !isActive &&
      label === 'registrationNumber' &&
      setRegistrationNumberIcon &&
      !value
    ) {
      setRegistrationNumberIcon('photo-camera');
    }
  }, [isActive]);

  const keyboardTypeHandler = () => {
    switch (label) {
      case 'modelYear':
        return 'numeric';
      case 'odometerReading':
        return 'numeric';
      default:
        return 'default';
    }
  };

  return (
    <TextInput
      label={t(label)}
      value={value}
      textColor={isActive ? colors.orange : colors.lightGrey}
      onChangeText={setOnChange}
      mode="outlined"
      keyboardType={keyboardTypeHandler()}
      right={
        <TextInput.Icon
          icon={icon}
          size={30}
          color={isActive ? colors.orange : colors.lightGrey}
          style={styles.icon}
        />
      }
      theme={{
        colors: {onSurfaceVariant: isActive ? colors.orange : colors.lightGrey},
      }}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      outlineColor={isActive ? colors.orange : colors.lightGrey}
      activeOutlineColor={isActive ? colors.orange : colors.lightGrey}
      style={styles.textInput}
    />
  );
};

export default NewReportScreen;
