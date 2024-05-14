import {StyleSheet} from 'react-native';

import {colors} from '../../common/styles';

const styles = StyleSheet.create({
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  spinner: {
    paddingVertical: 20,
  },
  spinnerText: {
    color: colors.orange,
  },
});

export default styles;
