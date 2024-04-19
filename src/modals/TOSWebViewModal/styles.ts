import {StyleSheet} from 'react-native';

import {colors} from '../../common/styles';

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.darkGrey,
    flex:1,
    width: '90%',
    alignSelf: 'center',
    maxHeight: '95%',
    borderWidth: 1,
    borderColor: 'white',
  },
  webView: {
    flex: 1
  },
  button: {
    alignSelf: 'center'
  }
});

export default styles;