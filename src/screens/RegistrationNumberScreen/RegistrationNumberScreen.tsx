import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, SafeAreaView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {TextInput, Button} from 'react-native-paper';
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
  useCameraFormat,
  runAsync,
} from 'react-native-vision-camera';
import {scanOCR} from '@ismaelmoreiraa/vision-camera-ocr';

import {useSharedValue, Worklets} from 'react-native-worklets-core';

import {cameraPermissions} from '../../common/utilities/permissions';
import {colors} from '../../common/styles';
import LogoTopBar from '../../components/LogoTopBar';
import Gradient from '../../components/Gradient';
import {styles} from './styles';

const RegistrationNumberScreen: React.FC = () => {
  const {t} = useTranslation();
  const device = useCameraDevice('back');

  const [hasPermissions, setHasPermission] = useState(false);
  const [frameProcessorActive, setFrameProcessorActive] = useState(true);
  const [frameData, setFrameData] = useState('');
  const [registerNumber, setRegisterNumber] = useState<{
    value: string;
    tempValues: string[];
  }>({
    value: '',
    tempValues: [],
  });

  const setFrameDataJS = Worklets.createRunInJsFn(setFrameData);
  const setFrameProcessorActiveJS = Worklets.createRunInJsFn(
    setFrameProcessorActive,
  );

  const checkCameraPermission = async () => {
    try {
      const result = await cameraPermissions();
      setHasPermission(result);
    } catch {
      console.log('Camera permissions denied'); //TODO, error handling
    }
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  useEffect(() => {
    if (registerNumber.value === '') {
      setFrameProcessorActiveJS(true);
    }
  }, [registerNumber]);

  useEffect(() => {
    setFrameProcessorActiveJS(false);
    if (registerNumber.tempValues.includes(frameData)) {
      setRegisterNumber({...registerNumber, value: frameData});
    } else {
      setRegisterNumber({
        ...registerNumber,
        tempValues: [...registerNumber.tempValues, frameData],
      });
    }
  }, [frameData]);

  const format = useCameraFormat(device, [{videoResolution: 'max'}, {fps: 5}]);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const data = scanOCR(frame);
    if (data.result) {
      const vehiclePlate = data.result.blocks.find(
        item =>
          /[A-Z]/.test(item.text) &&
          /\d/.test(item.text) &&
          item.text.length > 3 &&
          item.text.length < 9,
      )?.text;
      vehiclePlate && setFrameDataJS(vehiclePlate);
    }
  }, []);

  return (
    <Gradient>
      <SafeAreaView style={styles.container}>
        <LogoTopBar
          leftButton={{
            icon: 'arrow-back',
            action: () => console.log('painettu arrow back'),
          }}
        />
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Text style={styles.text}>{t('identificationInfo')}</Text>
          <TextInput
            label={t('registrationNumber')}
            value={registerNumber.value}
            textColor={colors.orange}
            onChangeText={value => {
              setRegisterNumber({...registerNumber, value});
            }}
            mode="outlined"
            right={
              <TextInput.Icon
                icon="keyboard-outline"
                size={30}
                color={colors.orange}
                style={styles.icon}
              />
            }
            theme={{
              colors: {onSurfaceVariant: colors.orange},
            }}
            outlineColor={colors.orange}
            activeOutlineColor={colors.orange}
            style={styles.textInput}
          />

          <View
            style={{
              backgroundColor: colors.white,
              height: 230,
              marginVertical: '15%',
            }}>
            {device && hasPermissions && (
              <Camera
                style={styles.camera}
                device={device}
                isActive={frameProcessorActive}
                frameProcessor={frameProcessor}
                format={format}
                fps={5}
                pixelFormat={'yuv'}
                onError={err => console.log('err', err)}
              />
            )}
          </View>

          <View style={styles.bottomContainer}>
            <Button
              onPress={() => console.log('todo')}
              style={styles.button}
              contentStyle={styles.innerButton}>
              <View />
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Gradient>
  );
};

export default RegistrationNumberScreen;
