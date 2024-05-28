import React, {useEffect, useState, useRef, RefObject} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  BackHandler,
  TextInput as TextInputProp,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Button, TextInput} from 'react-native-paper';
import {Navigation} from 'react-native-navigation';
import {RadioButton} from '../../components/index';

import {
  LogoTopBar,
  Gradient,
  FrameProcessorCamera,
  DropdownNotification,
  // CarInspections,
} from '../../components/index';
import {colors} from '../../common/styles';
import {SCREENS, USER_TYPE} from '../../common/constants';
import {useAppDispatch, useAppSelector} from '../../store/configureStore';
import {createOrder} from '../../store/actions/orders.tsx';

import {styles} from './styles';
import {changePage} from '../../store/actions/routing.tsx';
import {fetchOrganizations} from '../../store/actions/organizations.tsx';
import {fetchReportSections} from '../../store/actions/reportSections.tsx';

const NewReportScreen: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const [reportType, setReportType] = useState<number | null>(null);
  const [inspectorOrg, setInspectorOrg] = useState<number | null>(null);
  const [engineType, setEngineType] = useState<number | null>(null);

  // refs for automatic focus
  const registrationNumberRef = useRef<any>(null);
  const vehicleIdentificationNumberRef = useRef<any>(null);
  const brandAndModelRef = useRef<any>(null);
  const modelYearRef = useRef<any>(null);
  //   const odometerReadingRef = useRef<any>(null);
  const informationRef = useRef<any>(null);

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
    information: null,
  });
  const [currentScreen, setCurrentScreen] = useState('');

  const optionsEngineType = [
    {id: 0, name: t('petrol')},
    {id: 1, name: t('diesel')},
    {id: 2, name: t('hybrid_diesel')},
    {id: 3, name: t('hybrid_petrol')},
    {id: 4, name: t('electric')},
  ];

  const optionsReportType = [
    {id: 0, name: t('fullInsp')},
    {id: 1, name: t('liteInsp')},
  ];

  const getEngineType = (id: number) => {
    switch (id) {
      case 0:
        return 'petrol';
      case 1:
        return 'diesel';
      case 2:
        return 'hybrid_diesel';
      case 3:
        return 'hybrid_petrol';
      case 4:
        return 'electric';
      default:
        return 'petrol';
    }
  };

  const getReportType = (id: number) => {
    switch (id) {
      case 0:
        return 'full';
      case 1:
        return 'narrow';
      default:
        return 'full';
    }
  };

  //   const reportSections = useAppSelector(state => state.reportSections);
  //   const user = useAppSelector(state => state.user);
  const organizations = useAppSelector(
    state => state.organizations.organizations,
  );

  const optionsInspectorOrgs = Array.isArray(organizations)
    ? organizations.filter(org => org.type === USER_TYPE.INSPECTION)
    : [];

  useEffect(() => {
    const listener = Navigation.events().registerComponentDidAppearListener(
      ({componentId, componentName}) => {
        console.log('cmp name', componentName);
        setCurrentScreen(componentName);
      },
    );
    return () => {
      listener.remove();
    };
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchOrganizations());
    dispatch(fetchReportSections());
  }, []);

  // useEffect(() => {
  //   if (organizations.length > 0) {
  //     setInspectorOrg(
  //       organizations.filter(org => org.type === USER_TYPE.INSPECTION)[0].id,
  //     );
  //     setEngineType(0);
  //     setReportType(0);
  //   }
  // }, [organizations]);

  useEffect(() => {
    console.log(reportType);
    if (
      registerNumber.value &&
      otherData.vehicleIdentificationNumber &&
      otherData.brandAndModel &&
      otherData.modelYear &&
      otherData.information &&
      reportType !== null &&
      inspectorOrg !== null &&
      engineType !== null
    ) {
      console.log('ready');
      setReadyToProceed(true);
    } else if (readyToProceed) {
      setReadyToProceed(false);
    }
  }, [otherData, registerNumber, reportType, inspectorOrg, engineType]);

  const getRightRef = (item: string) => {
    switch (item) {
      case 'registrationNumber':
        return registrationNumberRef;
      case 'vehicleIdentificationNumber':
        return vehicleIdentificationNumberRef;
      case 'brandAndModel':
        return brandAndModelRef;
      case 'modelYear':
        return modelYearRef;
      case 'information':
        return informationRef;
      default:
        return registrationNumberRef;
    }
  };

  const getRightRefToFocus = (item: string) => {
    switch (item) {
      case 'registrationNumber':
        return vehicleIdentificationNumberRef;
      case 'vehicleIdentificationNumber':
        return brandAndModelRef;
      case 'brandAndModel':
        return modelYearRef;
      case 'modelYear':
        return informationRef;
      case 'information':
        return;
    }
  };

  const backButtonHandler = () => {
    if (registerNumber.value) {
      setRegisterNumber({value: '', tempValues: []});
      setOtherData({
        vehicleIdentificationNumber: '',
        brandAndModel: '',
        modelYear: null,
        information: null,
      });
    } else {
      switch (currentScreen) {
        case SCREENS.NEW_REPORT:
        case SCREENS.DEALERSHIP:
        case SCREENS.NEW_ORDER:
          changePage(SCREENS.INSPECTOR);
          break;
        case SCREENS.MY_NEW_ORDER:
          changePage(SCREENS.CUSTOMER_SCREEN);
          break;
      }
    }

    return true;
  };

  const startInspectionHandler = () => {
    console.log(otherData);
    console.log(registerNumber);
    console.log(getReportType(reportType!));
    console.log(getEngineType(engineType!));
    console.log(inspectorOrg);
    dispatch(
      createOrder({
        brand_and_model: otherData.brandAndModel,
        car_production_number: otherData.vehicleIdentificationNumber,
        registration_number: registerNumber.value,
        engine_type: getEngineType(engineType!),
        report_type: getReportType(reportType!),
        additional_information:
          otherData.information === null ? undefined : otherData.information,
        inspection_organization_id: inspectorOrg!,
      }),
    );
    // dispatch(
    //   setCarData({
    //     brand_and_model: otherData.brandAndModel,
    //     odometer_reading: otherData.information,
    //     production_number: otherData.vehicleIdentificationNumber,
    //     registration_number: registerNumber.value,
    //     engine_type: 'petrol', //TODO: fix, when type input is added?
    //   }),
    // );
    // Navigation.setRoot({
    //   root: {
    //     stack: {
    //       children: [
    //         {
    //           component: {
    //             name: SCREENS.REVIEWER,
    //           },
    //         },
    //       ],
    //     },
    //   },
    // });
  };

  const inputOnSubmitHandler = (item: string) => {
    if (item !== 'odometerReading') {
      const ref = getRightRefToFocus(item);
      ref?.current && ref.current.focus();
    }
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
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Text style={styles.text}>{t('identificationInfo')}</Text>
            <NewReportTextInput
              innerRef={getRightRef('registrationNumber')}
              label={'registrationNumber'}
              value={registerNumber.value}
              setOnChange={(value: string) => {
                if (value.length === 0) {
                  setRegisterNumber({...registerNumber, tempValues: [], value});
                } else {
                  setRegisterNumber({...registerNumber, value});
                }
              }}
              onSubmitEditing={() => inputOnSubmitHandler('registrationNumber')}
              icon={registrationNumberIcon}
              setRegistrationNumberIcon={setRegistrationNumberIcon}
            />
            {registerNumber.value && currentScreen === SCREENS.MY_NEW_ORDER ? ( //renders new report form if in NEW_REPORT screen
              <View style={styles.container}>
                <Text style={styles.text}>{t('orderInspection')}</Text>
                <View style={styles.container}>
                  <RadioButton
                    options={optionsReportType}
                    selectedOption={reportType}
                    setSelectedOption={setReportType}
                  />
                </View>
                <View style={styles.container}>
                  <RadioButton
                    options={optionsInspectorOrgs}
                    selectedOption={inspectorOrg}
                    setSelectedOption={setInspectorOrg}
                  />
                </View>
                <View style={styles.container}>
                  <RadioButton
                    options={optionsEngineType}
                    selectedOption={engineType}
                    setSelectedOption={setEngineType}
                  />
                </View>
                {Object.keys(otherData).map(item => (
                  <NewReportTextInput
                    innerRef={getRightRef(item)}
                    key={item}
                    label={item}
                    value={otherData[item]}
                    setOnChange={(value: string) => {
                      setOtherData({...otherData, [item]: value});
                    }}
                    onSubmitEditing={() => inputOnSubmitHandler(item)}
                    icon={'keyboard'}
                  />
                ))}
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
                      {t('createOrder')}
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

            {/* {registerNumber.value && currentScreen === SCREENS.DEALERSHIP ? (
              <View style={styles.container}>
                <>{console.log('CarInspections starting')}</>
                <CarInspections />
              </View>
            ) : currentScreen === SCREENS.DEALERSHIP ? (
              <FrameProcessorCamera
                registerNumber={registerNumber}
                setRegisterNumber={setRegisterNumber}
              />
            ) : null} */}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <DropdownNotification />
    </Gradient>
  );
};

interface NewReportTextInputProps {
  innerRef: RefObject<TextInputProp>;
  label: string;
  value: string;
  setOnChange: (value: string) => void;
  onSubmitEditing: () => void;
  icon: string;
  setRegistrationNumberIcon?: React.Dispatch<React.SetStateAction<string>>;
}

const NewReportTextInput: React.FC<NewReportTextInputProps> = ({
  innerRef,
  label,
  value,
  setOnChange,
  onSubmitEditing,
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
      ref={innerRef}
      returnKeyType={label === 'odometerReading' ? 'done' : 'next'}
      label={t(label)}
      value={value}
      textColor={isActive ? colors.orange : colors.lightGrey}
      onChangeText={setOnChange}
      onSubmitEditing={onSubmitEditing}
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
