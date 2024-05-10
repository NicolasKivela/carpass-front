import {StyleSheet} from 'react-native';

import {colors} from '../../common/styles';
import { orange100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const styles = StyleSheet.create({
  view: {
    paddingTop: 5,
    paddingBottom: 5,
    width: '95%',
    maxHeight: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.transparent,
  },
  leftRight: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  numericInput: {
    width: '40%',
    marginHorizontal: 10,
  },
});

export default styles;
