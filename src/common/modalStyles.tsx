import {StyleSheet} from 'react-native';
import {colors} from './styles';

const modalStyles = StyleSheet.create({
  modal: {
    backgroundColor: colors.darkGrey,
    flex: 0.45,
    //flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default modalStyles;
