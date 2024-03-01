import {StyleSheet, Platform} from 'react-native';

import {colors} from '../../common/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 25,
    paddingVertical: 15,
    justifyContent: 'flex-start',
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 25,
  },
  textInput: {
    height: 60,
    backgroundColor: colors.transparent,
    fontSize: 18,
  },
  icon: {
    paddingTop: 7,
  }
});
