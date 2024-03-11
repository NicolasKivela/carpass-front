import {StyleSheet} from 'react-native';
import {colors} from '../../common/styles';

const styles = StyleSheet.create({
  textStyle: {
    width: '42%',
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
    marginRight: 27,
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
    marginRight: 27,
  },
  activeChip2: {
    borderWidth: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 27,
  },
  activeChip3: {
    borderWidth: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 27,
  },
  icon: {
    alignSelf: 'center',
  },
  trafficLightView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGrey,
  },
  chipView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 25,
    margin: 16,
    marginVertical: 10,
  },
  carPartText: {
    fontSize: 15,
    marginRight: 49,
    color: colors.midGrey,
  },
});
export default styles;
