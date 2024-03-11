import {StyleSheet} from 'react-native';

import {colors} from '../common/styles';

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.darkGrey,
    paddingTop: 20,
    width: '85%',
    minHeight: '35%',
    maxHeight: '80%',
    alignSelf: 'center',
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  textStyle: {
    color: 'white',
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputStyle: {
    marginBottom: 10,
  },
  btnStyle: {
    marginTop: 10,
  },
});

export default styles;
