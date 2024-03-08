import {StyleSheet} from 'react-native';

import {colors} from '../../common/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  innerContainer: {
    flex: 1,
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
    width: '100%',
    height: 60,
    backgroundColor: colors.black,
    fontSize: 18,
    marginBottom: 20,
  },
  icon: {
    paddingTop: 7,
  },
  footerContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  footerButton: {
    marginHorizontal: '15%',
  },
  footerText: {
    textTransform: 'uppercase',
    fontSize: 16,
    color: colors.lightGrey,
  },
  footerTextDone: {
    textTransform: 'uppercase',
    fontSize: 16,
    color: colors.orange,
  },
});
