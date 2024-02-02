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
  },
  bottomContainer: {
    position: 'absolute',
    width: '100%',
    bottom: Platform.OS === 'ios' ? 35 : 20,
    right: 25,
    alignItems: 'center',
  },
  button: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.veryLightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 5,
    borderColor: colors.lightGrey,
  },
});
