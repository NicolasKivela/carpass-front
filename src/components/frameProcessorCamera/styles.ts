import {StyleSheet, Platform} from 'react-native';

import {colors} from '../../common/styles';

export const styles = StyleSheet.create({
  cameraContainer: {
    position: 'relative',
    backgroundColor: colors.veryLightGrey,
    height: 270,
    width: '100%',
    marginVertical: '15%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  button: {
    flex: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    backgroundColor: colors.transparent
  },
});
