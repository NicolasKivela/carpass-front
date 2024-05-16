import React, {useEffect, useState, useRef, RefObject} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput as TextInputProp,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Button, TextInput} from 'react-native-paper';
import {Navigation} from 'react-native-navigation';

import {
  LogoTopBar,
  Gradient,
  DropdownNotification,
  RadioButton,
} from '../../components/index';
import {colors} from '../../common/styles';
import {BASE_PATH, ENGINE_TYPE_API, PATHS, REPORT_TYPE_API, SCREENS, USER_TYPE} from '../../common/constants';
import {useAppDispatch, useAppSelector} from '../../store/configureStore';
import {fetchReportQuestions, setCarData} from '../../store/actions/report';

import {styles} from './styles';
import {changePage} from "../../store/actions/routing.tsx";
import {fetchOrganizations} from "../../store/actions/organizations.tsx";
import {fetchReportSections} from "../../store/actions/reportSections.tsx";
import {
  DelayTime,
  ErrorMessage,
  SuccessMessage,
  toastError,
  toastSuccess,
  toastWaiting,
  WaitMessage
} from "../../store/actions/toast.tsx";
import {MainButton, SecondaryButton} from "../../components";
import {ButtonRef} from "../../components/SecondaryButton";

const NewOrderScreen: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  // refs for automatic focus
  const registrationNumberRef = useRef<any>(null);
  const vehicleIdentificationNumberRef = useRef<any>(null);
  const brandAndModelRef = useRef<any>(null);
  const modelYearRef = useRef<any>(null);
  const informationRef = useRef<any>(null);

  //TODO: change these to come from database
  const [reportType, setReportType] = useState<number|null>(null);
  const [inspectorOrg, setInspectorOrg] = useState<number|null>(null);
  const [engineType, setEngineType] = useState<number|null>(null);
  const optionsReportType = [
    {id: 0, name: t('fullInsp')},
    {id: 1, name: t('liteInsp')},
    {id: 2, name: t('partInsp')}
  ];
  const reportSections = useAppSelector(state => state.reportSections.reportSections);
  const user = useAppSelector(state => state.user);
  const organizations = useAppSelector(state => state.organizations.organizations);
  const optionsInspectorOrgs = Array.isArray(organizations) ? organizations.filter(org => org.type === USER_TYPE.INSPECTION) : [];
  const optionsEngineType = [
    {id: 0, name: t('petrol')},
    {id: 1, name: t('diesel')},
    {id: 2, name: t('hybrid_diesel')},
    {id: 3, name: t('hybrid_petrol')},
    {id: 4, name: t('electric')},
  ];
  const submitRef = useRef<ButtonRef|null>(null);

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

  useEffect(() => {
    const listener = Navigation.events().registerComponentDidAppearListener(
      ({componentId, componentName}) => {
        console.log(componentName);
        setCurrentScreen(componentName);
      },
    );
    return () => {
      listener.remove();
    };
  }, []);

  useEffect(() => {
    dispatch(fetchOrganizations());
    dispatch(fetchReportSections())
  }, []);

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

  const backButtonHandler = async() => {
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
        case SCREENS.NEW_ORDER:
          await changePage(SCREENS.INSPECTOR);
          break;
        case SCREENS.DEALERSHIP:
          await changePage(SCREENS.DEALERSHIP);
          break;
      }
    }

    return true;
  };

  const createNewOrder = async() => {
    dispatch(
      setCarData({
        brand_and_model: otherData.brandAndModel,
        odometer_reading: otherData.information,
        production_number: otherData.vehicleIdentificationNumber,
        registration_number: registerNumber.value,
        engine_type: 'petrol', //TODO: need to add option that Radiobutton answers can be used for data
      }),
    );
    const body = JSON.stringify({
      "registration_number": registerNumber.value,
      "car_production_number": otherData.vehicleIdentificationNumber,
      "engine_type": ENGINE_TYPE_API[engineType],
      "brand_and_model": otherData.brandAndModel,
      "report_type": REPORT_TYPE_API[reportType],
      "additional_information": otherData.information ? otherData.information : '',
      "additional_information2": '',
      "inspection_organization_id": inspectorOrg,
      "sections": reportSections.map(section => section.id)
    });
    const path = BASE_PATH + PATHS.CREATE_ORDER;
    toastWaiting(WaitMessage.SENDING_ORDER, t);
    const response = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: body,
    });
    if (response.ok) {
      await toastSuccess(SuccessMessage.SENDING_ORDER, t, DelayTime.BRIEF);
      await changePage(SCREENS.INSPECTOR);
    } else {
      toastError(ErrorMessage.SENDING_ORDER, t)
    }
  };
  const inputOnSubmitHandler = (item: string) => {
    if (item !== 'information') {
      const ref = getRightRefToFocus(item);
      ref?.current && ref.current.focus();
    } else {
      submitRef.current?.click()
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
            <NewOrderTextInput
              innerRef={getRightRef('registrationNumber')}
              label={'registrationNumber'}
              value={registerNumber.value}
              setOnChange={(value: string) => {
                setRegisterNumber({...registerNumber, value});
              }}
              onSubmitEditing={() => inputOnSubmitHandler('registrationNumber')}
              icon={registrationNumberIcon}
              setRegistrationNumberIcon={setRegistrationNumberIcon}
            />
            <Text style={styles.text}>{t('orderInspection')}</Text>
            <View style={styles.container}>
              <RadioButton options={optionsReportType} selectedOption={reportType} setSelectedOption={setReportType} />
            </View>
            <View style={styles.container}>
              <RadioButton options={optionsInspectorOrgs} selectedOption={inspectorOrg} setSelectedOption={setInspectorOrg} />
            </View>
            <View style={styles.container}>
              <RadioButton options={optionsEngineType} selectedOption={engineType} setSelectedOption={setEngineType} />
            </View>
            {Object.keys(otherData).map(item => (
              <NewOrderTextInput
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
              <MainButton
                onPress={createNewOrder}
                style={styles.footerButton}
                title={t('placeOrder')}
                ref={submitRef}
              >
              </MainButton>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <DropdownNotification />
    </Gradient>
  );
};

interface NewOrderTextInputProps {
  innerRef: RefObject<TextInputProp>;
  label: string;
  value: string;
  setOnChange: (value: string) => void;
  onSubmitEditing: () => void;
  icon: string;
  setRegistrationNumberIcon?: React.Dispatch<React.SetStateAction<string>>;
}

const NewOrderTextInput: React.FC<NewOrderTextInputProps> = ({
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
      case 'information':
        return 'numeric';
      default:
        return 'default';
    }
  };

  return (
    <TextInput
      ref={innerRef}
      returnKeyType={label === 'information' ? 'done' : 'next'}
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
export default NewOrderScreen;
