import {StyleSheet} from 'react-native';

import {colors} from '../../common/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carSectionText: {
    fontSize: 20,
    color: colors.lightGrey,
  },
  headerText: {
    fontSize: 30,
    color: colors.white,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  carParts: {
    width: '100%',
    justifyContent: 'center',
    gap: 5,
    //backgroundColor: colors.green,
  },
  error: {
    fontSize: 16,
    color: colors.red,
  },
  rowSection: {
    flex: 1,
    flexDirection: 'row',
    //backgroundColor: colors.red,
    marginTop: 20,
    margin: 10,
  },
  textContainer: {
    width: '100%',
    minWidth: '50%',
    justifyContent: 'center',
    //backgroundColor: colors.orange,
  },
  circleRow: {
    flexDirection: 'row',
    marginLeft: '20%',
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
    justifyContent: 'center',
    margin: 20,
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
