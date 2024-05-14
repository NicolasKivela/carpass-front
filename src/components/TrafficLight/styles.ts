import {StyleSheet} from 'react-native';

import {colors} from '../../common/styles';

const styles = StyleSheet.create({
  textStyle: {
    flex: 1,
  },
  chipDefault: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
  },
  chipDefaultPad: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
  },
  chipRed: {
    backgroundColor: colors.red,
  },
  chipYellow: {
    backgroundColor: colors.yellow,
  },
  chipGreen: {
    backgroundColor: colors.green,
  },
  icon: {
    alignSelf: 'center',
  },
  trafficLightView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  chipView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  carPartTextPad: {
    fontSize: 18,
    color: colors.white,
  },
  carPartText: {
    fontSize: 16,
    color: colors.white,
  },
  touchablePadding: {
    paddingHorizontal: 6,
    paddingVertical: 5,
  },
});
export default styles;
