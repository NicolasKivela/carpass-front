import {StyleSheet} from 'react-native';

import {colors} from '../../common/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carSectionText: {
    fontSize: 20,
    marginTop: 30,
    marginLeft: 10,
    color: colors.lightGrey,
  },
  carParts: {
    flex: 0.9,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 30,
    marginLeft: 40,
    gap: 5,
  },
  error: {
    fontSize: 16,
    color: colors.red,
  },
  rowSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  textContainer: {
    width: 150,
    marginRight: 10,
  },
  circleRow: {
    flexDirection: 'row',
    marginLeft: 135,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  yellowBackground: {
    backgroundColor: colors.yellow,
  },
  redBackground: {
    backgroundColor: colors.red,
  },
  webView: {

    flex: 1,
    minWidth: 250,
    minHeight: 350,
  },
  webViewContainer: {
    flex: 1,

  },
  warning: {
    fontSize: 16,
    color: colors.yellow,
  },
  modal: {
    backgroundColor: colors.darkGrey,
    flex: 0.5,
    minHeight: '95%',
    maxWidth: '95%',  
    borderWidth: 1,
    borderColor: 'white',
  },
});
