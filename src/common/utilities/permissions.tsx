import {Platform, Linking} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export const cameraPermissions = async () => {
  const checkResult = await check(
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
  );
  if (checkResult === RESULTS.BLOCKED || checkResult === RESULTS.LIMITED) {
    Linking.openSettings();
  } else {
    const result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );
    return result === RESULTS.GRANTED;
  }
  return false;
};
