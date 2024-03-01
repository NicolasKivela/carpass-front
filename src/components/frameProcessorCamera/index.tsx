import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
  useCameraFormat,
} from 'react-native-vision-camera';
import {scanOCR} from '@ismaelmoreiraa/vision-camera-ocr';

import {Worklets} from 'react-native-worklets-core';

import {cameraPermissions} from '../../common/utilities/permissions';
import {styles} from './styles';
import {IconButton} from 'react-native-paper';
import {colors} from '../../common/styles';

interface Props {
  registerNumber: {
    value: string;
    tempValues: string[];
  };
  setRegisterNumber: React.Dispatch<
    React.SetStateAction<{value: string; tempValues: string[]}>
  >;
}

const FrameProcessorCamera: React.FC<Props> = ({
  registerNumber,
  setRegisterNumber,
}) => {
  const device = useCameraDevice('back');

  const [hasPermissions, setHasPermission] = useState(false);
  const [frameProcessorActive, setFrameProcessorActive] = useState(true);
  const [frameData, setFrameData] = useState('');

  const setFrameDataJS = Worklets.createRunInJsFn(setFrameData);
  const format = useCameraFormat(device, [{videoResolution: 'max'}, {fps: 5}]);

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
    if (registerNumber.tempValues.includes(frameData)) {
      setFrameProcessorActive(false);
      setRegisterNumber({...registerNumber, value: frameData});
    } else {
      setRegisterNumber({
        ...registerNumber,
        tempValues: [...registerNumber.tempValues, frameData],
      });
    }
  }, [frameData]);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const data = scanOCR(frame);
    const vehiclePlate = data?.result?.blocks.find(
      item =>
        /[A-Z]/.test(item.text) &&
        /\d/.test(item.text) &&
        !/[ `!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?~]/.test(item.text) &&
        item.text.length > 3 &&
        item.text.length < 9,
    )?.text;
    vehiclePlate && setFrameDataJS(vehiclePlate);
  }, []);

  return (
    <View style={styles.cameraContainer}>
      {device && hasPermissions && (
        <Camera
          style={styles.camera}
          device={device}
          isActive={frameProcessorActive}
          frameProcessor={frameProcessor}
          format={format}
          pixelFormat={'yuv'}
        />
      )}
      {!frameProcessorActive && (
        <IconButton
          icon="reload"
          iconColor={colors.orange}
          size={50}
          onPress={() => {
            setFrameProcessorActive(true);
            setRegisterNumber({value: '', tempValues: []});
          }}
          style={styles.button}
        />
      )}
    </View>
  );
};

export default FrameProcessorCamera;
