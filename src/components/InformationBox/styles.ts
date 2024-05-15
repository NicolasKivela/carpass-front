import {StyleSheet} from 'react-native';

import {colors} from '../../common/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topRow: {
    marginBottom: 20,
  },
  bottomRow: {
    marginTop: 'auto',
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  topLeft: {},
  topRight: {},
  bottomLeft: {
    fontSize: 14,
  },
  bottomRight: {
    fontSize: 14,
  },
  tabletText: {
    fontSize: 24,
  },
});

export default styles;
