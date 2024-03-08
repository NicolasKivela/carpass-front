import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
  useCameraFormat,
} from 'react-native-vision-camera';
import {scanOCR} from '@ismaelmoreiraa/vision-camera-ocr';
import {IconButton} from 'react-native-paper';
import {Worklets} from 'react-native-worklets-core';

import {useAppDispatch} from '../../store/configureStore';
import {cameraPermissions} from '../../common/utilities/permissions';
import {colors} from '../../common/styles';
import {setError} from '../../store/actions/error';

import {styles} from './styles';

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
  const dispatch = useAppDispatch();

  const [hasPermissions, setHasPermission] = useState(false);
  const [frameProcessorActive, setFrameProcessorActive] = useState(true);
  const [frameData, setFrameData] = useState('');

  const setFrameDataJS = Worklets.createRunInJsFn(setFrameData);
  const format = useCameraFormat(device, [{videoResolution: 'max'}, {fps: 5}]);

  const checkCameraPermission = async () => {
    try {
      const result = await cameraPermissions();
      setHasPermission(result);
      if (!result) {
        throw new Error();
      }
    } catch {
      dispatch(
        setError({
          type: 'Error',
          title: 'errors.cameraTitle',
          message: 'errors.cameraMessage',
        }),
      );
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
          onError={e => console.log(e)}
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
