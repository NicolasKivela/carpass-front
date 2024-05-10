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

import {
  LogoTopBar,
  Gradient,
  FrameProcessorCamera,
  DropdownNotification,
  RadioButton,
} from '../../components/index';
import {colors} from '../../common/styles';
import {SCREENS} from '../../common/constants';
import {useAppDispatch} from '../../store/configureStore';
import {setCarData} from '../../store/actions/report';

import {styles} from './styles';

const NewOrderScreen: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  // refs for automatic focus
  const registrationNumberRef = useRef<any>(null);
  const vehicleIdentificationNumberRef = useRef<any>(null);
  const brandAndModelRef = useRef<any>(null);
  const modelYearRef = useRef<any>(null);
  const odometerReadingRef = useRef<any>(null);

  //TODO: change these to come from database
  const options1 = [t('fullInsp'), t('liteInsp'), t('partInsp')];
  const options2 = [
    'Kuntotarkastajat Oy',
    'Katsastuskonttori Ky',
    'Autotarkastus Oy',
  ];
  const options3 = ['petrol', 'gasoline', 'electric', 'hybrid'];

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
      case 'odometerReading':
        return odometerReadingRef;
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
        return odometerReadingRef;
      case 'odometerReading':
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
        odometerReading: null,
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

  const createNewOrder = () => {
    dispatch(
      setCarData({
        brand_and_model: otherData.brandAndModel,
        odometer_reading: otherData.odometerReading,
        production_number: otherData.vehicleIdentificationNumber,
        registration_number: registerNumber.value,
        engine_type: 'petrol', //TODO: need to add option that Radiobutton answers can be used for data
      }),
    );
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
              <RadioButton options={options1} />
            </View>
            <View style={styles.container}>
              <RadioButton options={options2} />
            </View>
            <View style={styles.container}>
              <RadioButton options={options3} />
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
                <Text>{'Proceed'}</Text>
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
export default NewOrderScreen;
