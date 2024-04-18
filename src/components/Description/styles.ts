import {StyleSheet} from 'react-native';

import {colors} from '../../common/styles';

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
});

export default styles;
