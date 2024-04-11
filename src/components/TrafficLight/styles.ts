import {StyleSheet} from 'react-native';

import {colors} from '../../common/styles';

const styles = StyleSheet.create({
  textStyle: {
    flex: 1,
  },
  chip: {
    borderColor: colors.betweenGrey,
    borderWidth: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.betweenGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeChip1: {
    borderColor: colors.black,
    borderWidth: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeChip2: {
    borderWidth: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeChip3: {
    borderWidth: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
  trafficLightView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkerGrey,
  },
  chipView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  carPartText: {
    fontSize: 16,
    color: colors.white,
  },
});
export default styles;
