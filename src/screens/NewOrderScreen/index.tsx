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
import {BASE_PATH, PATHS, SCREENS} from '../../common/constants';
import {useAppDispatch, useAppSelector} from '../../store/configureStore';
import {fetchReportQuestions, setCarData} from '../../store/actions/report';

import {styles} from './styles';
import {changePage} from "../../store/actions/routing.tsx";
import {RadioButtonRef} from "../../components/RadioButton";
import {EngineType, ReportType} from "../../store/types/report.tsx";
import {insertWebAnimation} from "react-native-reanimated/lib/typescript/reanimated2/layoutReanimation/web/domUtils";
import {fetchOrganizations} from "../../store/actions/organizations.tsx";

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
  const [reportType, setReportType] = useState<string|null>(null);
  const [inspectorOrg, setInspectorOrg] = useState<string|null>(null);
  const [engineType, setEngineType] = useState<string|null>(null);
  const optionsReportType = [t('fullInsp'), t('liteInsp'), t('partInsp')];
  const optionsInspectorOrgs = [
    'Kuntotarkastajat Oy',
    'Katsastuskonttori Ky',
    'Autotarkastus Oy',
  ];
  const optionsEngineType = [
    t('petrol'),
    t('diesel'),
    t('hybrid_diesel'),
    t('hybrid_petrol'),
    t('electric'),
  ];

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
  }, []);
  const organizations = useAppSelector(state => state);


  console.log(555, organizations);
  console.log(443, {
    "registration_number": registerNumber.value,
    "car_production_number": otherData.vehicleIdentificationNumber,
    "engine_type": engineType,
    "brand_and_model": otherData.brandAndModel,
    "report_type": reportType,
    "additional_information": otherData.information,
    "additional_information2": '',
    "inspection_organization_id": inspectorOrg,
    "sections": ["?"]
  });

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
      if (currentScreen === SCREENS.NEW_ORDER) {
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

      if (currentScreen === SCREENS.DEALERSHIP) {
        Navigation.setRoot({
          root: {
            stack: {
              children: [
                {
                  component: {
                    name: SCREENS.DEALERSHIP,
                  },
                },
              ],
            },
          },
        });
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
    await changePage(SCREENS.DEALERSHIP);
    const response = await fetch(BASE_PATH + PATHS.CREATE_ORDER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "registration_number": registerNumber.value,
        "car_production_number": otherData.vehicleIdentificationNumber,
        "engine_type": engineType,
        "brand_and_model": otherData.brandAndModel,
        "report_type": reportType,
        "additional_information": otherData.information,
        "additional_information2": '',
        "inspection_organization_id": inspectorOrg,
        "sections": ["?"]
      }),
    });
  };

  const inputOnSubmitHandler = (item: string) => {
    if (item !== 'information') {
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
              <Button
                onPress={createNewOrder}
                textColor={colors.orange}
                style={styles.footerButton}>
                <Text>{t('placeOrder')}</Text>
              </Button>
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
